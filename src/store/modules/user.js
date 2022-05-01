import { GET_USERS, UPDATE_USER } from '@/store/types/user';
import apiService from '@/services/api';

const userModule = {
    actions: {
        async [GET_USERS](
            _,
            { page, perPage, location, sortBy, orderBy, search }
        ) {
            try {
                const route = `${apiService.baseURL()}/user`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                if (page) params.set('page', page);
                if (perPage) params.set('per_page', perPage);
                if (sortBy) params.set('sort_by', sortBy);
                if (orderBy) params.set('order_by', orderBy);
                if (search) params.set('search', search);
                if (location) params.set('section_id', location);
                const response = await apiService.get(`/user?${params}`, {
                    useCache: true,
                });
                return response.data.data;
            } catch (error) {
                return [];
            }
        },

        async [UPDATE_USER](_, payload) {
            try {
                payload._method = 'PUT';
                const response = await apiService.post('/user', payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default userModule;
