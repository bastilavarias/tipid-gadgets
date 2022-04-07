import apiService from '@/services/api';
import { REGISTER } from '@/store/types/authentication';

const authenticationModule = {
    actions: {
        async [REGISTER](_, payload) {
            try {
                const response = await apiService.post(
                    '/authentication/register',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default authenticationModule;
