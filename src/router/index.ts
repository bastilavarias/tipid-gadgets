import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import {
    AUTHENTICATE_SELF,
    AuthenticationState,
} from '@/store/modules/authentication';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home View',
                component: () => import('@/views/HomeView.vue'),
                meta: {
                    requiresAuth: false,
                },
            },

            {
                path: 'login',
                name: 'Login View',
                component: () => import('@/views/LoginView.vue'),
                meta: {
                    requiresAuth: false,
                },
            },

            {
                path: 'register',
                name: 'Registration View',
                component: () => import('@/views/RegisterView.vue'),
                meta: {
                    requiresAuth: false,
                },
            },

            {
                path: 'forum',
                name: 'Forum View',
                component: () => import('@/views/ForumView.vue'),
                meta: {
                    requiresAuth: false,
                },
            },

            {
                path: 'search',
                name: 'Search View',
                component: () => import('@/views/SearchView.vue'),
                meta: {
                    requiresAuth: false,
                },
            },

            {
                path: 'product',
                component: () => import('@/layouts/MirrorLayout.vue'),
                children: [
                    {
                        path: 'action',
                        name: 'Product Action View',
                        component: () =>
                            import('@/views/ProductActionView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: ':productSlug',
                        name: 'Product View',
                        component: () => import('@/views/ProductView.vue'),
                        meta: {
                            requiresAuth: false,
                        },
                    },
                ],
            },

            {
                path: 'thread',
                component: () => import('@/layouts/MirrorLayout.vue'),
                children: [
                    {
                        path: 'action',
                        name: 'Thread Action View',
                        component: () => import('@/views/ThreadActionView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: ':threadSlug',
                        name: 'Thread View',
                        component: () => import('@/views/ThreadView.vue'),
                        meta: {
                            requiresAuth: false,
                        },
                    },
                ],
            },

            {
                path: 'profile',
                component: () => import('@/layouts/MirrorLayout.vue'),
                children: [
                    {
                        path: '',
                        name: 'User Profile View',
                        component: () => import('@/views/UserProfileView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: 'rating',
                        name: 'User Rating View',
                        component: () => import('@/views/UserRatingView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: 'post',
                        name: 'User Post View',
                        component: () => import('@/views/UserPostView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: 'bookmark',
                        name: 'User Bookmark View',
                        component: () => import('@/views/UserBookmarkView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: 'message',
                        name: 'User Message View',
                        component: () => import('@/views/UserMessageView.vue'),
                        meta: {
                            requiresAuth: true,
                        },
                    },
                ],
            },

            {
                path: 'user/:username',
                component: () =>
                    import('@/layouts/UserPublicProfileLayout.vue'),
                children: [
                    {
                        path: '',
                        name: 'User Public Profile View',
                        component: () =>
                            import('@/views/UserPublicProfilePostView.vue'),
                    },
                    {
                        path: 'follow',
                        name: 'User Public Profile Follow View',
                        component: () =>
                            import('@/views/UserPublicProfileFollowView.vue'),
                    },
                ],
            },

            {
                path: 'site',
                component: () => import('@/layouts/MirrorLayout.vue'),
                children: [
                    {
                        path: 'post',
                        component: () => import('@/views/SitePostTipView.vue'),
                    },
                ],
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch(AUTHENTICATE_SELF);
    // @ts-ignore
    const authState: AuthenticationState = store.state.authentication;
    const { isAuthenticated } = authState;
    const isProtectedRoute = to.matched.some(
        (record) => record.meta.requiresAuth
    );
    if (isProtectedRoute && !isAuthenticated) {
        return next({ name: 'Login View' });
    }
    if (
        isAuthenticated &&
        ['Login View', 'Registration View'].includes(<string>to.name)
    ) {
        return next({ name: 'Home View' });
    }

    next();
});

export default router;
