import Vue from 'vue';
import Vuex from 'vuex';
import authenticationModule from '@/store/modules/authentication';
import referenceModule from '@/store/modules/reference';
import systemModule from '@/store/modules/system';
import itemModule from '@/store/modules/item';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        system: systemModule,
        reference: referenceModule,
        authentication: authenticationModule,
        item: itemModule,
    },
});
