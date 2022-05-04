import { GET_USER_ROOMS, INQUIRE_MESSAGE } from '@/store/types/message';
import apiService from '@/services/api';

const messageModule = {
    actions: {
        async [INQUIRE_MESSAGE](_, payload) {
            try {
                const response = await apiService.post(
                    '/message/inquire',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_USER_ROOMS](_) {
            try {
                const response = await apiService.get(`/message/room/user`);
                return response.data.data;
            } catch (error) {
                return [];
            }
        },
    },
};

export default messageModule;
