import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';

const systemModule = {
    state: {
        snackbar: {
            open: false,
            message: null,
            color: false,
        },
    },

    mutations: {
        [CONFIGURE_SYSTEM_SNACKBAR]: (state, configs) => {
            state.snackbar = Object.assign({}, configs);
        },
    },
};

export default systemModule;
