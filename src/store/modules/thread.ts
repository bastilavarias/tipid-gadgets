import apiService from '@/services/api';
import { CommonPaginationPayloadInformation } from '@/types/common';

export const CREATE_THREAD = 'thread/create';
export const UPDATE_THREAD = 'thread/update';
export const GET_THREADS = 'thread/get-list';
export const GET_THREAD = 'thread/get';
export const THREAD_CREATE_COMMENT = 'thread/create-comment';
export const GET_THREAD_COMMENTS = 'thread/get-comments';
export const THREAD_CHECK_LIKE = 'thread/check-like';
export const LIKE_THREAD = 'thread/like';
export const THREAD_COUNT_LIKE = 'thread/count-like';
export const THREAD_CHECK_BOOKMARK = 'thread/check-bookmark';
export const BOOKMARK_THREAD = 'thread/bookmark';
export const THREAD_COUNT_BOOKMARK = 'thread/count-bookmark';
export const GET_THREAD_USER_BOOKMARKS = 'thread/get-bookmarks';
export const DELETE_THREAD = 'thread/delete';
export const VIEW_THREAD = 'thread/view';

interface GetThreadsPayload extends CommonPaginationPayloadInformation {
    sectionID: number | null;
    userID: number | null;
}

interface GetThreadCommentPayload extends CommonPaginationPayloadInformation {
    threadID: number;
}

interface GetUserThreadBookmarks extends CommonPaginationPayloadInformation {
    userID: number | null;
}

const threadModule = {
    actions: {
        async [CREATE_THREAD](_: object, payload: object) {
            try {
                const response = await apiService.post('/topic', payload);
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [UPDATE_THREAD](_: object, payload: { id: number }) {
            // @ts-ignore
            payload._method = 'PUT';
            try {
                const response = await apiService.post(
                    `/topic/${payload.id}`,
                    payload
                );
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [GET_THREADS](_: object, payload: GetThreadsPayload) {
            try {
                const route = `${apiService.baseURL()}/topic`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const {
                    page,
                    perPage,
                    sortBy,
                    sectionID,
                    orderBy,
                    search,
                    userID,
                } = payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                if (sectionID) params.set('section_id', String(sectionID));
                if (userID) params.set('user_id', String(userID));
                const response = await apiService.get(`/topic?${params}`, {
                    useCache: true,
                });
                const topics = response.data;
                return apiService.formatResult(true, topics);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [GET_THREAD](_: object, slug: string) {
            try {
                const response = await apiService.get(`/topic/${slug}`);
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },

        async [VIEW_THREAD](_: object, payload: object) {
            try {
                const response = await apiService.post('/topic/views', payload);
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [THREAD_CREATE_COMMENT](_: object, payload: object) {
            try {
                const response = await apiService.post(
                    '/topic/comments',
                    payload
                );
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [GET_THREAD_COMMENTS](
            _: object,
            payload: GetThreadCommentPayload
        ) {
            try {
                const route = `${apiService.baseURL()}/topic/comments`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const { page, perPage, sortBy, orderBy, search } = payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                const response = await apiService.get(
                    `/topic/comments/${payload.threadID}?${params}`
                );
                const topics = response.data;
                return apiService.formatResult(true, topics);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [THREAD_CHECK_LIKE](_: object, threadID: number) {
            try {
                const response = await apiService.get(
                    `/topic/likes/check/${threadID}`
                );
                const data = response.data.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [LIKE_THREAD](_: object, payload: object) {
            try {
                const response = await apiService.post('/topic/likes', payload);
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [THREAD_COUNT_LIKE](_: object, threadID: number) {
            try {
                const response = await apiService.get(
                    `/topic/likes/count/${threadID}`
                );
                const data = response.data.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [THREAD_CHECK_BOOKMARK](_: object, threadID: number) {
            try {
                const response = await apiService.get(
                    `/topic/bookmarks/check/${threadID}`
                );
                const data = response.data.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [BOOKMARK_THREAD](_: object, payload: object) {
            try {
                const response = await apiService.post(
                    '/topic/bookmarks',
                    payload
                );
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [GET_THREAD_USER_BOOKMARKS](
            _: object,
            payload: GetUserThreadBookmarks
        ) {
            try {
                const route = `${apiService.baseURL()}/topic/bookmarks`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const { page, perPage, sortBy, orderBy, search, userID } =
                    payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                if (userID) params.set('user_id', String(userID));
                const response = await apiService.get(
                    `/topic/bookmarks?${params}`,
                    {
                        useCache: true,
                    }
                );
                const products = response.data;
                return apiService.formatResult(true, products);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [DELETE_THREAD](_: object, threadID: number) {
            try {
                const response = await apiService.delete(`/topic/${threadID}`);
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },
    },
};

export default threadModule;
