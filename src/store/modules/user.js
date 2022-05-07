import {
    CHECK_REVIEWER_VALIDITY,
    GET_USER_REVIEWS,
    GET_USER_BY_USERNAME,
    GET_USERS,
    UPDATE_USER,
    WRITE_USER_REVIEW,
    CHECK_USER_FOLLOW,
    FOLLOW_USER,
} from '@/store/types/user';
import apiService from '@/services/api';

const userModule = {
    actions: {
        async [GET_USERS](
            _,
            { page, perPage, location, sortBy, orderBy, search }
        ) {
            try {
                const route = `${apiService.baseURL()}/user`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                if (location) params.set('section_id', location);
                const response = await apiService.get(`/user?${params}`, {
                    useCache: true,
                });
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [UPDATE_USER](_, payload) {
            try {
                payload._method = 'PUT';
                const response = await apiService.post('/user', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_USER_BY_USERNAME](_, username) {
            try {
                const response = await apiService.get(
                    `/user/username/${username}`,
                    {
                        useCache: true,
                    }
                );
                return response.data.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [CHECK_REVIEWER_VALIDITY](_, payload) {
            try {
                const response = await apiService.get(
                    `user/review/${payload.userID}/${payload.transactionID}/check`
                );
                return response.data.data;
            } catch (error) {
                return false;
            }
        },

        async [WRITE_USER_REVIEW](_, payload) {
            try {
                const response = await apiService.post('/user/review', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_USER_REVIEWS](_, { page, perPage, userID }) {
            try {
                const route = `${apiService.baseURL()}/user/reviews`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (userID) params.set('user_id', userID);
                const response = await apiService.get(
                    `/user/reviews?${params}`,
                    {
                        useCache: true,
                    }
                );
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [CHECK_USER_FOLLOW](_, userID) {
            try {
                const response = await apiService.get(
                    `/user/follow/check/${userID}`
                );
                return response.data.data;
            } catch (error) {
                return false;
            }
        },

        async [FOLLOW_USER](_, payload) {
            try {
                const response = await apiService.post('/user/follow', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default userModule;
