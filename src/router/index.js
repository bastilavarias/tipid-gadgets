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
                path: 'login',
                name: 'login',
                component: () => import('@/views/Login'),
            },

            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/Register'),
            },

            {
                path: 'view-item',
                name: 'view-item',
                component: () => import('@/views/item/View'),
            },

            {
                path: 'item-editor/:operation',
                name: 'item-editor',
                component: () => import('@/views/item/Editor'),
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

                    {
                        path: 'view-topic',
                        name: 'view-topic',
                        component: () => import('@/views/forum/View'),
                    },
                ],
            },

            {
                path: 'my-account',
                component: () => import('@/layouts/Mirror'),
                children: [
                    {
                        path: '',
                        name: 'my-account',
                        component: () => import('@/views/account/Account'),
                        children: [
                            {
                                path: '',
                                name: 'my-account/information',
                                component: () =>
                                    import(
                                        '@/views/account/modules/Information'
                                    ),
                            },

                            {
                                path: 'posts',
                                name: 'my-account/post',
                                component: () =>
                                    import('@/views/account/modules/Post'),
                            },

                            {
                                path: 'bookmarks',
                                name: 'my-account/bookmark',
                                component: () =>
                                    import('@/views/account/modules/Bookmark'),
                            },

                            {
                                path: 'ratings',
                                name: 'my-account/rating',
                                component: () =>
                                    import('@/views/account/modules/Rating'),
                            },
                        ],
                    },
                ],
            },

            {
                path: 'messages',
                name: 'message',
                component: () => import('@/views/Message'),
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
