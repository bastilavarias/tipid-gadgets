import apiService from '@/services/api';

export const TRANSACTION_RECEIVE_ITEM = 'transaction/receive-item';

type TransactionReceiveItemPayload = {
    room_id: number;
    item_id: number;
    _method: string;
};

const transactionModule = {
    actions: {
        async [TRANSACTION_RECEIVE_ITEM](
            _: object,
            payload: TransactionReceiveItemPayload
        ) {
            try {
                payload._method = 'PUT';
                const response = await apiService.post(
                    '/transaction/receive',
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
    },
};

export default transactionModule;
