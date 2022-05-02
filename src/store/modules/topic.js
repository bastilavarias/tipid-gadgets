import {
    BOOKMARK_TOPIC,
    CHECK_TOPIC_BOOKMARK,
    CHECK_TOPIC_LIKE,
    COUNT_TOPIC_COMMENT,
    COUNT_TOPIC_LIKE,
    COUNT_TOPIC_VIEW,
    DELETE_DRAFT_TOPIC,
    GET_DRAFT_TOPICS,
    GET_TOPIC,
    GET_TOPIC_BOOKMARKS,
    GET_TOPIC_COMMENTS,
    GET_TOPICS,
    LIKE_TOPIC,
    POST_TOPIC_COMMENT,
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
            { page, perPage, sectionID, sortBy, orderBy, search, userID }
        ) {
            try {
                const route = `${apiService.baseURL()}/topic`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                if (sectionID) params.set('section_id', sectionID);
                if (userID) params.set('user_id', userID);
                const response = await apiService.get(`/topic?${params}`, {
                    useCache: true,
                });
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

        async [POST_TOPIC_COMMENT](_, payload) {
            try {
                const response = await apiService.post(
                    '/topic/comments',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_TOPIC_COMMENTS](
            _,
            { page, perPage, topicID, sortBy, orderBy }
        ) {
            try {
                const route = `${apiService.baseURL()}/topic/comments/${topicID}`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                const response = await apiService.get(
                    `/topic/comments/${topicID}?${params}`,
                    {
                        useCache: true,
                    }
                );
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [COUNT_TOPIC_COMMENT](_, topicID) {
            try {
                const response = await apiService.get(
                    `/topic/comments/count/${topicID}`
                );
                return response.data.data;
            } catch (error) {
                return 0;
            }
        },

        async [GET_TOPIC_BOOKMARKS](
            _,
            { page, perPage, sortBy, orderBy, userID }
        ) {
            try {
                const route = `${apiService.baseURL()}/topic/bookmarks`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (userID) params.set('user_id', userID);
                const response = await apiService.get(
                    `/topic/bookmarks?${params}`,
                    {
                        useCache: true,
                    }
                );
                return response.data.data;
            } catch (error) {
                return [];
            }
        },
    },
};

export default topicModule;
