import apiService from '@/services/api';
import { CommonPaginationPayloadInformation } from '@/types/common';

export const CREATE_PRODUCT = 'product/create';
export const UPDATE_PRODUCT = 'product/update';
export const GET_PRODUCTS = 'product/get-list';
export const GET_PRODUCT = 'product/get';
export const VIEW_PRODUCT = 'product/view';
export const PRODUCT_CHECK_LIKE = 'product/check-like';
export const LIKE_PRODUCT = 'product/like';
export const PRODUCT_COUNT_LIKE = 'product/count-like';
export const PRODUCT_CHECK_BOOKMARK = 'product/check-bookmark';
export const BOOKMARK_PRODUCT = 'product/bookmark';
export const PRODUCT_COUNT_BOOKMARKS = 'product/count-bookmark';
export const GET_PRODUCT_USER_BOOKMARKS = 'product/get-bookmarks';
export const DELETE_PRODUCT = 'product/delete';
interface GetProductsPayload extends CommonPaginationPayloadInformation {
    categoryID: number | null;
    conditionID: number | null;
    warrantyID: number | null;
    minimumPrice: number | null;
    maximumPrice: number | null;
    userID: number | null;
}

interface GetUserProductBookmarks extends CommonPaginationPayloadInformation {
    userID: number | null;
}

const productModule = {
    actions: {
        async [CREATE_PRODUCT](_: object, payload: object) {
            try {
                const response = await apiService.post('/item', payload);
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

        async [UPDATE_PRODUCT](_: object, payload: { id: number }) {
            try {
                // @ts-ignore
                payload._method = 'PUT';
                const response = await apiService.post(
                    `/item/${payload.id}`,
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

        async [GET_PRODUCTS](_: object, payload: GetProductsPayload) {
            try {
                const route = `${apiService.baseURL()}/item`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const {
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
                    userID,
                } = payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                if (filterBy) params.set('filter_by', filterBy);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                if (categoryID) params.set('category_id', String(categoryID));
                if (conditionID)
                    params.set('condition_id', String(conditionID));
                if (warrantyID) params.set('warranty_id', String(warrantyID));
                if (minimumPrice)
                    params.set('minimum_price', String(minimumPrice));
                if (maximumPrice)
                    params.set('maximum_price', String(maximumPrice));
                if (userID) params.set('user_id', String(userID));
                const response = await apiService.get(`/item?${params}`, {
                    useCache: true,
                });
                const products = response.data;
                return apiService.formatResult(true, products);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [GET_PRODUCT](_: object, slug: string) {
            try {
                const response = await apiService.get(`/item/${slug}`);
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },

        async [VIEW_PRODUCT](_: object, payload: object) {
            try {
                const response = await apiService.post('/item/views', payload);
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

        async [PRODUCT_CHECK_LIKE](_: object, productID: number) {
            try {
                const response = await apiService.get(
                    `/item/likes/check/${productID}`
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

        async [LIKE_PRODUCT](_: object, payload: object) {
            try {
                const response = await apiService.post('/item/likes', payload);
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

        async [PRODUCT_COUNT_LIKE](_: object, productID: number) {
            try {
                const response = await apiService.get(
                    `/item/likes/count/${productID}`
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

        async [PRODUCT_CHECK_BOOKMARK](_: object, productID: number) {
            try {
                const response = await apiService.get(
                    `/item/bookmarks/check/${productID}`
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

        async [BOOKMARK_PRODUCT](_: object, payload: object) {
            try {
                const response = await apiService.post(
                    '/item/bookmarks',
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

        async [GET_PRODUCT_USER_BOOKMARKS](
            _: object,
            payload: GetUserProductBookmarks
        ) {
            try {
                const route = `${apiService.baseURL()}/item/bookmarks`;
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
                    `/item/bookmarks?${params}`,
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

        async [DELETE_PRODUCT](_: object, productID: number) {
            try {
                const response = await apiService.delete(`/item/${productID}`);
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },
    },
};

export default productModule;
