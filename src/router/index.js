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
                component: () => import('@/views/item/Editor'),
            },

            {
                path: 'forums',
                component: () => import('@/layouts/Mirror'),
                children: [
                    {
                        path: '',
                        name: 'forum',
                        component: () => import('@/views/forum/Forum'),
                    },

                    {
                        path: 'topic-editor/:operation',
                        name: 'forum/topic-editor',
                        component: () => import('@/views/forum/Editor'),
                    },
                ],
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
