import apiService from '@/services/api';
import { CommonPaginationPayloadInformation } from '@/types/common';

export const WRITE_USER_REVIEW = 'review/write';
export const CHECK_USER_REVIEW_VALIDITY = 'review/check-validity';
export const GET_REVIEWS = 'review/get-reviews';

interface GetReviewsPayload extends CommonPaginationPayloadInformation {
    userID: number;
}

const reviewModule = {
    actions: {
        async [WRITE_USER_REVIEW](_: object, payload: object) {
            try {
                const response = await apiService.post(`/user/review`, payload);
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

        async [CHECK_USER_REVIEW_VALIDITY](
            _: object,
            payload: { userID: number; transactionID: number }
        ) {
            try {
                const response = await apiService.get(
                    `/user/review/${payload.userID}/${payload.transactionID}/check`,
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

        async [GET_REVIEWS](_: object, payload: GetReviewsPayload) {
            try {
                const route = `${apiService.baseURL()}/user/reviews`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const {
                    page,
                    perPage,
                    sortBy,
                    orderBy,
                    search,
                    filterBy,
                    userID,
                } = payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (filterBy) params.set('filter_by', filterBy);
                if (search) params.set('search', search);
                if (userID) params.set('user_id', String(userID));
                const response = await apiService.get(
                    `/user/reviews?${params}`,
                    {
                        useCache: true,
                    }
                );
                const reviews = response.data;
                return apiService.formatResult(true, reviews);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },
    },
};

export default reviewModule;
