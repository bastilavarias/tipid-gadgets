import apiService from '@/services/api';
import {
    GET_ITEM_CATEGORIES,
    GET_ITEM_CONDITIONS,
    GET_ITEM_SECTIONS,
    GET_ITEM_WARRANTIES,
    GET_LOCATIONS,
    GET_TOPIC_SECTIONS,
} from '@/store/types/reference';

const referenceModule = {
    actions: {
        async [GET_LOCATIONS]() {
            try {
                let locations =
                    JSON.parse(window.localStorage.getItem('locations')) || [];
                if (locations.length > 0) return locations;
                const response = await apiService.get('/reference/locations');
                locations = response.data.data;
                window.localStorage.setItem(
                    'locations',
                    JSON.stringify(locations)
                );
                return locations;
            } catch (error) {
                return [];
            }
        },

        async [GET_ITEM_SECTIONS]() {
            try {
                let itemSections =
                    JSON.parse(window.localStorage.getItem('item_sections')) ||
                    [];
                if (itemSections.length > 0) return itemSections;
                const response = await apiService.get(
                    '/reference/item/sections'
                );
                itemSections = response.data.data;
                window.localStorage.setItem(
                    'item_sections',
                    JSON.stringify(itemSections)
                );
                return itemSections;
            } catch (error) {
                return [];
            }
        },

        async [GET_ITEM_CATEGORIES]() {
            try {
                let itemCategories =
                    JSON.parse(
                        window.localStorage.getItem('item_categories')
                    ) || [];
                if (itemCategories.length > 0) return itemCategories;
                const response = await apiService.get(
                    '/reference/item/categories'
                );
                itemCategories = response.data.data;
                window.localStorage.setItem(
                    'item_categories',
                    JSON.stringify(itemCategories)
                );
                return itemCategories;
            } catch (error) {
                return [];
            }
        },

        async [GET_ITEM_CONDITIONS]() {
            try {
                let itemConditions =
                    JSON.parse(
                        window.localStorage.getItem('item_conditions')
                    ) || [];
                if (itemConditions.length > 0) return itemConditions;
                const response = await apiService.get(
                    '/reference/item/conditions'
                );
                itemConditions = response.data.data;
                window.localStorage.setItem(
                    'item_conditions',
                    JSON.stringify(itemConditions)
                );
                return itemConditions;
            } catch (error) {
                return [];
            }
        },

        async [GET_ITEM_WARRANTIES]() {
            try {
                let itemWarranties =
                    JSON.parse(
                        window.localStorage.getItem('item_warranties')
                    ) || [];
                if (itemWarranties.length > 0) return itemWarranties;
                const response = await apiService.get(
                    '/reference/item/warranties'
                );
                itemWarranties = response.data.data;
                window.localStorage.setItem(
                    'item_warranties',
                    JSON.stringify(itemWarranties)
                );
                return itemWarranties;
            } catch (error) {
                return [];
            }
        },

        async [GET_TOPIC_SECTIONS]() {
            try {
                let topicSections =
                    JSON.parse(window.localStorage.getItem('topic_sections')) ||
                    [];
                if (topicSections.length > 0) return topicSections;
                const response = await apiService.get(
                    '/reference/topic/sections'
                );
                topicSections = response.data.data;
                window.localStorage.setItem(
                    'topic_sections',
                    JSON.stringify(topicSections)
                );
                return topicSections;
            } catch (error) {
                return [];
            }
        },
    },
};

export default referenceModule;
