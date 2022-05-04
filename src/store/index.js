import Vue from 'vue';
import Vuex from 'vuex';
import authenticationModule from '@/store/modules/authentication';
import referenceModule from '@/store/modules/reference';
import systemModule from '@/store/modules/system';
import itemModule from '@/store/modules/item';
import insightModule from '@/store/modules/insight';
import topicModule from '@/store/modules/topic';
import userModule from '@/store/modules/user';
import messageModule from '@/store/modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        system: systemModule,
        reference: referenceModule,
        authentication: authenticationModule,
        item: itemModule,
        insight: insightModule,
        topic: topicModule,
        user: userModule,
        message: messageModule,
    },
});
