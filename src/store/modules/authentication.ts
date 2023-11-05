import apiService from '@/services/api';
import tokenService from '@/services/token';
import { UserInformation } from '@/types/user';

export const AUTHENTICATION_REGISTER = 'authentication/register';
export const AUTHENTICATION_LOGIN = 'authentication/login';
const SET_AUTHENTICATION = 'authentication/set';
export const AUTHENTICATE_SELF = 'authenticate/self';
export const PURGE_AUTHENTICATION = 'authenticate/purge';
export const SET_USER_AUTHENTICATE = 'authenticate/set-user';
export const AUTHENTICATION_CHANGE_PASSWORD = 'authentication/change-password';

export interface AuthenticationState {
    isAuthenticated: boolean;
    token: string | null;
    user: UserInformation | null;
}

const authenticationModule = {
    state: {
        isAuthenticated: false,
        token: null,
        user: null,
    },

    mutations: {
        [SET_AUTHENTICATION](
            state: AuthenticationState,
            payload: { access_token: string; user: UserInformation }
        ) {
            state.isAuthenticated = true;
            state.user = Object.assign({}, payload.user);
            state.token = payload.access_token;
            window.localStorage.setItem('user', JSON.stringify(payload.user));
            tokenService.save('access_token', payload.access_token);
            apiService.setHeader(payload.access_token);
        },

        [PURGE_AUTHENTICATION](state: AuthenticationState) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            window.localStorage.removeItem('user');
            tokenService.remove('access_token');
        },

        [SET_USER_AUTHENTICATE](
            state: AuthenticationState,
            payload: UserInformation
        ) {
            state.user = Object.assign({}, payload);
        },
    },

    actions: {
        async [AUTHENTICATION_REGISTER](_: object, payload: object) {
            try {
                const response = await apiService.post(
                    '/authentication/register',
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

        async [AUTHENTICATION_LOGIN]({ commit }: any, payload: object) {
            try {
                const response = await apiService.post(
                    '/authentication/login',
                    payload
                );
                const data = response.data.data;
                commit(SET_AUTHENTICATION, data);
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [AUTHENTICATE_SELF]({ commit }: any) {
            try {
                const token = tokenService.get('access_token');
                const user =
                    JSON.parse(<string>window.localStorage.getItem('user')) ||
                    null;
                if (!token && !user) throw 'Invalid';
                const authPayload = {
                    access_token: token,
                    user,
                };
                commit(SET_AUTHENTICATION, authPayload);
                return true;
            } catch (error) {
                commit(PURGE_AUTHENTICATION);
                return false;
            }
        },

        async [AUTHENTICATION_CHANGE_PASSWORD](
            { commit }: any,
            payload: object
        ) {
            try {
                const response = await apiService.put(
                    '/authentication/password',
                    payload
                );
                const data = response.data.data;
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

export default authenticationModule;
