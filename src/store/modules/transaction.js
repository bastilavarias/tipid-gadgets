import apiService from '@/services/api';
import { TRANSACTION_RECEIVE } from '@/store/types/transaction';

const transactionModule = {
    actions: {
        async [TRANSACTION_RECEIVE](_, payload) {
            try {
                payload._method = 'PUT';
                const response = await apiService.post(
                    '/transaction/receive',
                    payload
                );
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default transactionModule;
