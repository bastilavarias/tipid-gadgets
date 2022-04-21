import {
    BOOKMARK_ITEM,
    CHECK_ITEM_BOOKMARK,
    DELETE_DRAFT_ITEM,
    GET_DRAFT_ITEMS,
    GET_ITEM,
    GET_ITEM_IMAGES,
    GET_ITEMS,
    SAVE_DRAFT_ITEM,
    SAVE_POST_ITEM,
    VIEW_ITEM,
} from '@/store/types/item';
import apiService from '@/services/api';

const itemModule = {
    actions: {
        async [SAVE_POST_ITEM](_, payload) {
            try {
                const response = await apiService.post('/item', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [SAVE_DRAFT_ITEM](_, payload) {
            try {
                const response = await apiService.post('/item/drafts', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_DRAFT_ITEMS]() {
            try {
                const response = await apiService.get('/item/drafts');
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [DELETE_DRAFT_ITEM](_, id) {
            try {
                const response = await apiService.delete(`/item/drafts/${id}`);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_ITEMS](
            _,
            { page, perPage, filterBy, sortBy, orderBy, search }
        ) {
            try {
                const route = `${apiService.baseURL()}/item`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (filterBy) params.set('filter_by', filterBy);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                const response = await apiService.get(`/item?${params}`);
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [GET_ITEM_IMAGES](_, itemID) {
            try {
                const response = await apiService.get(`/item/${itemID}/images`);
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [GET_ITEM](_, slug) {
            try {
                const response = await apiService.get(`/item/${slug}`);
                return response.data.data;
            } catch (error) {
                return null;
            }
        },

        async [VIEW_ITEM](_, payload) {
            try {
                const response = await apiService.post('/item/views', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [BOOKMARK_ITEM](_, payload) {
            try {
                const response = await apiService.post(
                    '/item/bookmarks',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [CHECK_ITEM_BOOKMARK](_, itemID) {
            try {
                const response = await apiService.get(
                    `/item/bookmarks/check/${itemID}`
                );
                return response.data.data;
            } catch (error) {
                return false;
            }
        },
    },
};

export default itemModule;
