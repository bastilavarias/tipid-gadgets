import Vue from 'vue';
import Vuex from 'vuex';
import authenticationModule from '@/store/modules/authentication';
import referenceModule from '@/store/modules/reference';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        reference: referenceModule,
        authentication: authenticationModule,
    },
});
