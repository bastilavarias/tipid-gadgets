import Vue from 'vue';
import vueAxios from 'vue-axios';
import axios from 'axios';

const apiService = {
    init() {
        Vue.use(vueAxios, axios);
        Vue.axios.defaults.baseURL = `${process.env.VUE_APP_BACK_END_URL}/api`;
    },

    setHeader(token) {
        Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    async get(route, body) {
        return await Vue.axios.get(route, body);
    },

    async post(route, body) {
        return await Vue.axios.post(route, body);
    },

    async put(route, body) {
        return await Vue.axios.put(route, body);
    },

    async delete(route, body) {
        return await Vue.axios.delete(route, body);
    },

    baseURL() {
        return `${process.env.VUE_APP_BACK_END_URL}/api`;
    },
};

export default apiService;
