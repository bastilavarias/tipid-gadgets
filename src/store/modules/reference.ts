import apiService from '@/services/api';
import utilityMixin from '@/mixins/utility';

export const REFERENCE_GET_LOCATIONS = 'reference/get-locations';
export const REFERENCE_GET_ITEM_SECTIONS = 'reference/get-item-sections';
export const REFERENCE_GET_ITEM_CATEGORIES = 'reference/get-item-categories';
export const REFERENCE_GET_ITEM_CONDITIONS = 'reference/get-item-conditions';
export const REFERENCE_GET_ITEM_WARRANTIES = 'reference/get-item-warranties';
export const REFERENCE_GET_THREAD_SECTIONS = 'reference/get-thread-sections';
export const REFERENCE_GET_SEARCH_TYPES = 'reference/get-search-types';

const referenceModule = {
    actions: {
        async [REFERENCE_GET_LOCATIONS]() {
            try {
                const response = await apiService.get('/reference/locations');
                const locations = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        locations,
                        'name',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [REFERENCE_GET_ITEM_SECTIONS]() {
            try {
                const response = await apiService.get(
                    '/reference/item/sections'
                );
                const locations = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        locations,
                        'id',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [REFERENCE_GET_ITEM_CATEGORIES]() {
            try {
                const response = await apiService.get(
                    '/reference/item/categories'
                );
                const locations = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        locations,
                        'id',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [REFERENCE_GET_ITEM_CONDITIONS]() {
            try {
                const response = await apiService.get(
                    '/reference/item/conditions'
                );
                const locations = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        locations,
                        'id',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [REFERENCE_GET_ITEM_WARRANTIES]() {
            try {
                const response = await apiService.get(
                    '/reference/item/warranties'
                );
                const locations = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        locations,
                        'id',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [REFERENCE_GET_THREAD_SECTIONS]() {
            try {
                const response = await apiService.get(
                    '/reference/topic/sections'
                );
                const locations = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        locations,
                        'id',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [REFERENCE_GET_SEARCH_TYPES]() {
            try {
                const response = await apiService.get(
                    '/reference/search-types'
                );
                const types = response.data.data;
                return apiService.formatResult(
                    true,
                    utilityMixin.toBootstrapSelectCompatibleData(
                        types,
                        'slug',
                        'name'
                    )
                );
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },
    },
};

export default referenceModule;
