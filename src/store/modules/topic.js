import {
    BOOKMARK_TOPIC,
    CHECK_TOPIC_BOOKMARK,
    CHECK_TOPIC_LIKE,
    COUNT_TOPIC_LIKE,
    COUNT_TOPIC_VIEW,
    DELETE_DRAFT_TOPIC,
    GET_DRAFT_TOPICS,
    GET_TOPIC,
    GET_TOPIC_IMAGES,
    GET_TOPICS,
    LIKE_TOPIC,
    SAVE_DRAFT_TOPIC,
    SAVE_POST_TOPIC,
    VIEW_TOPIC,
} from '@/store/types/topic';
import apiService from '@/services/api';

const topicModule = {
    actions: {
        async [SAVE_POST_TOPIC](_, payload) {
            try {
                const response = await apiService.post('/topic', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [SAVE_DRAFT_TOPIC](_, payload) {
            try {
                const response = await apiService.post(
                    '/topic/drafts',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_DRAFT_TOPICS]() {
            try {
                const response = await apiService.get('/topic/drafts');
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [DELETE_DRAFT_TOPIC](_, id) {
            try {
                const response = await apiService.delete(`/topic/drafts/${id}`);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_TOPICS](
            _,
            { page, perPage, filterBy, sortBy, orderBy, search }
        ) {
            try {
                const route = `${apiService.baseURL()}/topic`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (filterBy) params.set('filter_by', filterBy);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                const response = await apiService.get(`/topic?${params}`);
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [GET_TOPIC_IMAGES](_, topicID) {
            try {
                const response = await apiService.get(
                    `/topic/${topicID}/images`
                );
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [GET_TOPIC](_, slug) {
            try {
                const response = await apiService.get(`/topic/${slug}`);
                return response.data.data;
            } catch (error) {
                return null;
            }
        },

        async [VIEW_TOPIC](_, payload) {
            try {
                const response = await apiService.post('/topic/views', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [BOOKMARK_TOPIC](_, payload) {
            try {
                const response = await apiService.post(
                    '/topic/bookmarks',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [CHECK_TOPIC_BOOKMARK](_, topicID) {
            try {
                const response = await apiService.get(
                    `/topic/bookmarks/check/${topicID}`
                );
                return response.data.data;
            } catch (error) {
                return false;
            }
        },

        async [LIKE_TOPIC](_, payload) {
            try {
                const response = await apiService.post('/topic/likes', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [CHECK_TOPIC_LIKE](_, topicID) {
            try {
                const response = await apiService.get(
                    `/topic/likes/check/${topicID}`
                );
                return response.data.data;
            } catch (error) {
                return false;
            }
        },

        async [COUNT_TOPIC_LIKE](_, topicID) {
            try {
                const response = await apiService.get(
                    `/topic/likes/count/${topicID}`
                );
                return response.data.data;
            } catch (error) {
                return 0;
            }
        },

        async [COUNT_TOPIC_VIEW](_, topicID) {
            try {
                const response = await apiService.get(
                    `/topic/views/count/${topicID}`
                );
                return response.data.data;
            } catch (error) {
                return 0;
            }
        },
    },
};

export default topicModule;
