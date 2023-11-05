import Vue from 'vue';
import Vuex from 'vuex';
import referenceModule from '@/store/modules/reference';
import authenticationModule from '@/store/modules/authentication';
import productModule from '@/store/modules/product';
import threadModule from '@/store/modules/thread';
import userModule from '@/store/modules/user';
import messageModule from '@/store/modules/message';
import transactionModule from '@/store/modules/transaction';
import reviewModule from '@/store/modules/review';
import insightModule from '@/store/modules/insight';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        reference: referenceModule,
        authentication: authenticationModule,
        product: productModule,
        thread: threadModule,
        user: userModule,
        message: messageModule,
        transaction: transactionModule,
        review: reviewModule,
        insight: insightModule,
    },
});
