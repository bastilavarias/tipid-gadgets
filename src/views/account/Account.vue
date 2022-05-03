<template>
    <v-row v-if="user">
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >{{ isOwnAccount ? 'My Account' : 'User' }}</v-card-title
                >

                <v-list-item two-line class="mb-5">
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
                    <v-list-item-action v-if="isOwnAccount">
                        <v-btn icon>
                            <v-icon>mdi-email-edit</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action v-else>
                        <v-btn icon color="primary">
                            <v-icon>mdi-message-text</v-icon>
                        </v-btn>
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
import { GET_USER_BY_USERNAME } from '@/store/types/user';

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
        text: 'Ratings', // Items and Topics
        to: { name: 'my-account/rating' },
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
        text: 'Ratings', // Items and Topics
        to: { name: 'user/rating' },
        exact: true,
    },
];

export default {
    data() {
        return {
            tab: null,
            user: null,
        };
    },

    computed: {
        isOwnAccount() {
            const name = 'my-account/information';
            return this.$route.name === name;
        },

        tabs() {
            if (this.isOwnAccount) return accountTabs;
            return userTabs;
        },
    },

    methods: {
        async getUser() {
            const username = this.$route.params.username;
            return await this.$store.dispatch(GET_USER_BY_USERNAME, username);
        },
    },

    async created() {
        let user;
        if (this.isOwnAccount) {
            user = this.$store.state.authentication.user || null;
        } else {
            user = await this.getUser();
        }
        if (!user) return this.$router.go(-1);
        this.user = Object.assign({}, user);
    },
};
</script>
