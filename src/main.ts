import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import '@/app.scss';
import apiService from '@/services/api';
import InfiniteLoading from 'vue-infinite-loading';

Vue.config.productionTip = false;
apiService.init();

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(InfiniteLoading);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
