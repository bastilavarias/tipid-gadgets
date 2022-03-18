import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/Main'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/Home'),
            },

            {
                path: 'item-editor/:operation',
                name: 'item-editor',
                component: () => import('@/views/ItemEditor'),
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
