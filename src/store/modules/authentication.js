import apiService from '@/services/api';
import {
    AUTHENTICATE_SELF,
    CHANGE_PASSWORD,
    GITHUB_AUTHENTICATION,
    LOGIN,
    PURGE_AUTHENTICATION,
    REGISTER,
    SET_AUTHENTICATION,
    SET_USER_INFORMATION,
} from '@/store/types/authentication';
import tokenService from '@/services/token';

const authenticationModule = {
    state: {
        isAuthenticated: !!tokenService.get('access_token') || false,
        user: JSON.parse(window.localStorage.getItem('user')) || null,
    },

    mutations: {
        [SET_AUTHENTICATION](state, payload) {
            state.isAuthenticated = true;
            state.user = Object.assign({}, payload.user);
            window.localStorage.setItem('user', JSON.stringify(payload.user));
            tokenService.save('access_token', payload.token);
            apiService.setHeader(payload.token);
        },

        [PURGE_AUTHENTICATION](state) {
            state.isAuthenticated = false;
            state.user = Object.assign({}, {});
            window.localStorage.removeItem('user');
            tokenService.remove('access_token');
        },

        [SET_USER_INFORMATION](state, payload) {
            state.user = Object.assign({}, payload);
            window.localStorage.setItem('user', JSON.stringify(payload));
        },
    },

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

        async [GITHUB_AUTHENTICATION]({ commit }, payload) {
            try {
                const response = await apiService.post(
                    '/authentication/oauth2/github',
                    payload
                );
                if (response.data.code === 200) {
                    const { access_token, user } = response.data.data;
                    const authPayload = {
                        token: access_token,
                        user,
                    };
                    commit(SET_AUTHENTICATION, authPayload);
                    return response.data;
                }
            } catch (error) {
                return error.response.data;
            }
        },

        async [AUTHENTICATE_SELF]({ commit }) {
            try {
                // const response = await apiService.get("/self");
                // apiService.setHeader(tokenService.get("access_token"));
                const token = tokenService.get('access_token');
                const user =
                    JSON.parse(window.localStorage.getItem('user')) || null;
                if (!token && !user) throw 'Invalid';
                const authPayload = {
                    token,
                    user,
                };
                commit(SET_AUTHENTICATION, authPayload);
                return true;
            } catch (error) {
                commit(PURGE_AUTHENTICATION);
                return false;
            }
        },

        async [LOGIN]({ commit }, payload) {
            try {
                const response = await apiService.post(
                    '/authentication/login',
                    payload
                );
                if (response.data.code === 200) {
                    const { access_token, user } = response.data.data;
                    const authPayload = {
                        token: access_token,
                        user,
                    };
                    commit(SET_AUTHENTICATION, authPayload);
                    return response.data;
                }
            } catch (error) {
                return error.response.data;
            }
        },

        async [CHANGE_PASSWORD]({ commit }, payload) {
            try {
                payload._method = 'PUT';
                const response = await apiService.post(
                    '/authentication/password',
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
