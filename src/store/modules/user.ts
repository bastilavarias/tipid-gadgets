import apiService from '@/services/api';
import { UserInformation } from '@/types/user';
import { CommonPaginationPayloadInformation } from '@/types/common';

export const UPDATE_USER = 'user/update';
export const GET_USERS = 'user/get-list';
export const GET_USER = 'user/get';
export const CHECK_USER_FOLLOWING_STATUS = 'user/check-following-status';
export const FOLLOW_USER = 'user/follow';
export const GET_USER_FOLLOW = 'user/get-follow';

interface GetUserFollow extends CommonPaginationPayloadInformation {
    userID: number;
}

const userModule = {
    actions: {
        async [UPDATE_USER](_: object, payload: UserInformation) {
            try {
                const response = await apiService.put(`/user`, payload);
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

        async [GET_USERS](
            _: object,
            payload: CommonPaginationPayloadInformation
        ) {
            try {
                const route = `${apiService.baseURL()}/user`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const { page, perPage, filterBy, sortBy, orderBy, search } =
                    payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (filterBy) params.set('filter_by', filterBy);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                const response = await apiService.get(`/user?${params}`, {
                    useCache: true,
                });
                const users = response.data;
                return apiService.formatResult(true, users);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [GET_USER](_: object, username: string) {
            try {
                const response = await apiService.get(
                    `/user/username/${username}`
                );
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },

        async [CHECK_USER_FOLLOWING_STATUS](_: object, userID: string) {
            try {
                const response = await apiService.get(
                    `/user/follow/check/${userID}`
                );
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },

        async [FOLLOW_USER](_: object, payload: object) {
            try {
                const response = await apiService.post(`/user/follow`, payload);
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

        async [GET_USER_FOLLOW](_: object, payload: GetUserFollow) {
            try {
                const route = `${apiService.baseURL()}/user/follow`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const { page, perPage, filterBy, sortBy, orderBy, userID } =
                    payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (filterBy) params.set('filter_by', filterBy);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (userID) params.set('user_id', String(userID));
                const response = await apiService.get(
                    `/user/follow?${params}`,
                    {
                        useCache: true,
                    }
                );
                const users = response.data;
                return apiService.formatResult(true, users);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },
    },
};

export default userModule;
