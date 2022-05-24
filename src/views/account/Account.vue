<template>
    <v-row v-if="shouldBootComponent">
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >My Account</v-card-title
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
import utilityMixin from '@/mixins/utility';

const tabs = [
    {
        text: 'Information',
        to: { name: 'my-account/information' },
        exact: true,
    },

    {
        text: 'Posts',
        to: { name: 'my-account/post' },
        exact: true,
    },

    {
        text: 'Bookmarks',
        to: { name: 'my-account/bookmark' },
        exact: true,
    },

    {
        text: 'Reviews',
        to: { name: 'my-account/reviews' },
        exact: true,
    },

    {
        text: 'Following/Followers',
        to: { name: 'my-account/follow' },
        exact: true,
    },
];

export default {
    mixins: [utilityMixin],

    data() {
        return {
            shouldBootComponent: false,
            tab: null,
            user: null,
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        tabs() {
            return tabs;
        },
    },

    methods: {
        async setUserInformation() {
            this.user = this.$store.state.authentication.user || null;
            if (!this.user) return this.$router.go(-1);
        },

        async loadData() {
            await this.setUserInformation();
            this.shouldBootComponent = true;
            this.$nextTick(() => {
                this.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
            });
        },
    },

    async created() {
        await this.loadData();
    },
};
</script>
