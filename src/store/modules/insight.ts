import apiService from '@/services/api';

export const GET_POST_INSIGHT = 'insight/get-post';

type GetPostInsightPayload = {
    id: number;
    type: string;
};

const insightModule = {
    actions: {
        async [GET_POST_INSIGHT](_: object, payload: GetPostInsightPayload) {
            try {
                const { id, type } = payload;
                const url =
                    type === 'product'
                        ? `/insight/items/${id}`
                        : `/insight/topics/${id}`;
                const response = await apiService.get(url);
                return apiService.formatResult(true, response.data.data);
            } catch (error) {
                return apiService.formatResult(false, null);
            }
        },
    },
};

export default insightModule;
