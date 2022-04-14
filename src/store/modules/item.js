import {
    DELETE_DRAFT_ITEM,
    GET_DRAFT_ITEMS,
    SAVE_DRAFT_ITEM,
    SAVE_POST_ITEM,
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
    },
};

export default itemModule;
