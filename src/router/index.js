import Vue from 'vue';
import VueRouter from 'vue-router';
import { AUTHENTICATE_SELF } from '@/store/types/authentication';
import store from '@/store';

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
                path: 'search',
                name: 'search',
                component: () => import('@/views/Search'),
            },

            {
                path: 'item/:slug',
                name: 'view-item',
                component: () => import('@/views/item/View'),
            },

            {
                path: 'item-editor/:operation',
                name: 'item-editor',
                component: () => import('@/views/item/Editor'),
                meta: {
                    requiresAuth: true,
                },
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
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: ':slug',
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
                path: 'user/:username',
                component: () => import('@/layouts/Mirror'),
                children: [
                    {
                        path: '',
                        component: () => import('@/views/account/Account'),
                        children: [
                            {
                                path: '',
                                name: 'user/information',
                                component: () =>
                                    import(
                                        '@/views/account/modules/Information'
                                    ),
                            },

                            {
                                path: 'posts',
                                name: 'user/post',
                                component: () =>
                                    import('@/views/account/modules/Post'),
                            },

                            {
                                path: 'bookmarks',
                                name: 'user/bookmark',
                                component: () =>
                                    import('@/views/account/modules/Bookmark'),
                            },

                            {
                                path: 'ratings',
                                name: 'user/rating',
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
                meta: {
                    requiresAuth: true,
                },
            },

            {
                path: '/oauth2/code/github',
                name: 'github-callback',
                component: () => import('@/views/GithubCallback'),
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch(AUTHENTICATE_SELF);
    const { isAuthenticated } = store.state.authentication;
    const isProtectedRoute = to.matched.some(
        (record) => record.meta.requiresAuth
    );
    const unProtectedRoutes = ['login', 'register'];

    if (isProtectedRoute && !isAuthenticated) return next({ name: 'login' });
    if (unProtectedRoutes.includes(to.name) && isAuthenticated)
        return next({ name: 'home' });

    next();
});

export default router;
