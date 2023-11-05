import axios from 'axios';
import {
    setupCache,
    buildMemoryStorage,
    defaultKeyGenerator,
    defaultHeaderInterpreter,
} from 'axios-cache-interceptor';

const axiosCache = setupCache(axios.create(), {
    storage: buildMemoryStorage(),
    generateKey: defaultKeyGenerator,
    headerInterpreter: defaultHeaderInterpreter,
    // debug: true,
});

const cacheConfig = {
    ttl: 1000 * 60 * 5,
    interpretHeader: false,
    methods: ['get'],
    cachePredicate: {
        statusCheck: (status: number) => status >= 200 && status < 400,
    },
    update: {},
    etag: false,
    modifiedSince: false,
    staleIfError: false,
};

const shouldCache = (body: any) => {
    const keys = Object.keys(body);
    if (!keys || keys.length === 0) return false;
    if (keys.includes('useCache') && body['useCache']) return true;
};

const apiService = {
    init() {
        axiosCache.defaults.baseURL = `${process.env.VUE_APP_BACK_END_URL}/api`;
    },

    setHeader(token: string) {
        axiosCache.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    async get(route: string, body = {}) {
        const cache = shouldCache(body) ? Object.assign({}, cacheConfig) : {};
        return await axiosCache.get(route, { cache });
    },

    async post(route: string, body: object) {
        return await axiosCache.post(route, body);
    },

    async put(route: string, body: object) {
        return await axiosCache.put(route, body);
    },

    async delete(route: string) {
        return await axiosCache.delete(route);
    },

    baseURL() {
        return `${process.env.VUE_APP_BACK_END_URL}/api`;
    },

    formatResult(
        success: boolean,
        data: object | null,
        error?: string
    ): { success: boolean; data: object | null; error?: string | null } {
        return {
            success,
            data: success ? data : null,
            error: success ? null : error,
        };
    },
};

export default apiService;
