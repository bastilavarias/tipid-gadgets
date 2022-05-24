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
                path: 'catalog/:sectionSlug/:categorySlug',
                name: 'catalog-browser',
                component: () => import('@/views/CatalogBrowser'),
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
                                meta: {
                                    requiresAuth: true,
                                },
                            },

                            {
                                path: 'posts',
                                name: 'my-account/post',
                                component: () =>
                                    import('@/views/account/modules/Post'),
                                meta: {
                                    requiresAuth: true,
                                },
                            },

                            {
                                path: 'bookmarks',
                                name: 'my-account/bookmark',
                                component: () =>
                                    import('@/views/account/modules/Bookmark'),
                                meta: {
                                    requiresAuth: true,
                                },
                            },

                            {
                                path: 'reviews',
                                name: 'my-account/reviews',
                                component: () =>
                                    import('@/views/account/modules/Reviews'),
                                meta: {
                                    requiresAuth: true,
                                },
                            },

                            {
                                path: 'follow',
                                name: 'my-account/follow',
                                component: () =>
                                    import('@/views/account/modules/Follow'),
                                meta: {
                                    requiresAuth: true,
                                },
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
                        component: () => import('@/views/account/User'),
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
                                path: 'reviews',
                                name: 'user/reviews',
                                component: () =>
                                    import('@/views/account/modules/Reviews'),
                            },

                            {
                                path: 'follow',
                                name: 'user/follow',
                                component: () =>
                                    import('@/views/account/modules/Follow'),
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
