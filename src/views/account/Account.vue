<template>
    <v-row v-if="componentFlag">
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >{{ isOwnAccount ? 'My Account' : 'User' }}</v-card-title
                >

                <v-list-item :two-line="!!user.email" class="mb-5">
                    <v-list-item-avatar v-if="user.avatar">
                        <v-img :src="user.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title
                            class="title font-weight-bold secondary--text"
                            >{{ user.username }}</v-list-item-title
                        >
                        <v-list-item-subtitle
                            class="font-weight-bold primary--text"
                            >{{ user.email }}</v-list-item-subtitle
                        >
                    </v-list-item-content>
                    <v-list-item-action
                        v-if="user && !isOwnAccount && isAuthenticated"
                    >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="primary"
                                    @click="follow"
                                    :outlined="!isFollowed"
                                    rounded
                                    small
                                    depressed
                                >
                                    {{ isFollowed ? 'Following' : 'Follow' }}
                                </v-btn>
                            </template>
                            <span>{{
                                isFollowed
                                    ? `Unfollow ${user.username}`
                                    : `Follow ${user.username}`
                            }}</span>
                        </v-tooltip>
                    </v-list-item-action>
                </v-list-item>

                <v-tabs color="primary" hide-slider v-model="tab">
                    <template v-for="(tab, index) in tabs">
                        <v-tab
                            class="text-capitalize"
                            :to="tab.to"
                            :exact="tab.exact"
                            :key="index"
                            >{{ tab.text }}</v-tab
                        >
                    </template>
                </v-tabs>

                <v-card-text>
                    <v-tabs-items v-model="tab">
                        <router-view></router-view>
                    </v-tabs-items>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {
    CHECK_USER_FOLLOW,
    FOLLOW_USER,
    GET_USER_BY_USERNAME,
} from '@/store/types/user';
import utilityMixin from '@/mixins/utility';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';

const accountTabs = [
    {
        text: 'Information',
        to: { name: 'my-account/information' },
        exact: true,
    },

    {
        text: 'Posts', // Items for Sale,  Want to Buys, and Topics
        to: { name: 'my-account/post' },
        exact: true,
    },

    {
        text: 'Bookmarks', // Items and Topics
        to: { name: 'my-account/bookmark' },
        exact: true,
    },

    {
        text: 'Reviews', // Items and Topics
        to: { name: 'my-account/reviews' },
        exact: true,
    },
];

const userTabs = [
    {
        text: 'Information',
        to: { name: 'user/information' },
        exact: true,
    },

    {
        text: 'Posts', // Items for Sale,  Want to Buys, and Topics
        to: { name: 'user/post' },
        exact: true,
    },

    {
        text: 'Bookmarks', // Items and Topics
        to: { name: 'user/bookmark' },
        exact: true,
    },

    {
        text: 'Reviews', // Items and Topics
        to: { name: 'user/reviews' },
        exact: true,
    },
];

export default {
    mixins: [utilityMixin],

    data() {
        return {
            componentFlag: false,
            tab: null,
            user: null,

            isFollowed: false,
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        isOwnAccount() {
            const myAccountRoutes = [
                'my-account/information',
                'my-account/post',
                'my-account/bookmark',
                'my-account/reviews',
            ];
            return (
                this.isAuthenticated &&
                myAccountRoutes.includes(this.$route.name)
            );
        },

        tabs() {
            if (this.isOwnAccount) return accountTabs;
            return userTabs;
        },
    },

    watch: {
        async isOwnAccount() {
            await this.loadData();
        },
    },

    methods: {
        async getUser() {
            const username = this.$route.params.username;
            return await this.$store.dispatch(GET_USER_BY_USERNAME, username);
        },

        async setUserInformation() {
            if (this.isOwnAccount) {
                this.user = this.$store.state.authentication.user || null;
            } else {
                this.user = await this.getUser();
            }
            if (!this.user) return this.$router.go(-1);
        },

        async checkFollow() {
            this.isFollowed = await this.$store.dispatch(
                CHECK_USER_FOLLOW,
                this.user.id
            );
        },

        async loadData() {
            await this.setUserInformation();
            if (this.user && !this.isOwnAccount && this.isAuthenticated)
                await this.checkFollow();
            this.componentFlag = true;
            this.$nextTick(() => {
                this.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
            });
        },

        async follow() {
            const payload = { user_id: this.user.id };
            const { code, message } = await this.$store.dispatch(
                FOLLOW_USER,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.isFollowed = !this.isFollowed;
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
            }
        },
    },

    async created() {
        await this.loadData();
    },
};
</script>
