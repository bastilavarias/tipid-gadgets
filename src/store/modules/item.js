import {
    BOOKMARK_ITEM,
    CHECK_ITEM_BOOKMARK,
    CHECK_ITEM_LIKE,
    COUNT_ITEM_LIKE,
    COUNT_ITEM_VIEW,
    DELETE_DRAFT_ITEM,
    GET_DRAFT_ITEMS,
    GET_ITEM,
    GET_ITEM_IMAGES,
    GET_ITEMS,
    LIKE_ITEM,
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
            {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
                search,
                categoryID,
                conditionID,
                warrantyID,
                minimumPrice,
                maximumPrice,
            }
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
                if (categoryID) params.set('category_id', categoryID);
                if (conditionID) params.set('condition_id', conditionID);
                if (warrantyID) params.set('warranty_id', warrantyID);
                if (minimumPrice) params.set('minimum_price', minimumPrice);
                if (maximumPrice) params.set('maximum_price', maximumPrice);
                const response = await apiService.get(`/item?${params}`, {
                    useCache: true,
                });
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

        async [LIKE_ITEM](_, payload) {
            try {
                const response = await apiService.post('/item/likes', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [CHECK_ITEM_LIKE](_, itemID) {
            try {
                const response = await apiService.get(
                    `/item/likes/check/${itemID}`
                );
                return response.data.data;
            } catch (error) {
                return false;
            }
        },

        async [COUNT_ITEM_LIKE](_, itemID) {
            try {
                const response = await apiService.get(
                    `/item/likes/count/${itemID}`
                );
                return response.data.data;
            } catch (error) {
                return 0;
            }
        },

        async [COUNT_ITEM_VIEW](_, itemID) {
            try {
                const response = await apiService.get(
                    `/item/views/count/${itemID}`
                );
                return response.data.data;
            } catch (error) {
                return 0;
            }
        },
    },
};

export default itemModule;
