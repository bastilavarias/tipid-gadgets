import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import apiService from '@/services/api';

Vue.config.productionTip = false;
apiService.init();
Vue.use(CKEditor);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
