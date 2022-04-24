import { GET_ITEM_INSIGHT, GET_TOPIC_INSIGHT } from '@/store/types/insight';
import apiService from '@/services/api';

const insightModule = {
    actions: {
        async [GET_ITEM_INSIGHT](_, itemID) {
            try {
                const response = await apiService.get(
                    `/insight/items/${itemID}`
                );
                return response.data.data;
            } catch (error) {
                return {
                    reach: 0,
                    unique_viewers: 0,
                    likes: 0,
                    bookmarks: 0,
                };
            }
        },

        async [GET_TOPIC_INSIGHT](_, topicID) {
            try {
                const response = await apiService.get(
                    `/insight/topics/${topicID}`
                );
                return response.data.data;
            } catch (error) {
                return {
                    reach: 0,
                    unique_viewers: 0,
                    likes: 0,
                    bookmarks: 0,
                };
            }
        },
    },
};

export default insightModule;
