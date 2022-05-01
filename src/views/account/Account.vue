<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >My Account</v-card-title
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
                    <!--                    <v-list-item-action>-->
                    <!--                        <v-btn icon>-->
                    <!--                            <v-icon>mdi-email-edit</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                    </v-list-item-action>-->
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
const tabs = [
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

export default {
    data() {
        return {
            tab: null,
        };
    },

    computed: {
        tabs() {
            return tabs;
        },

        user() {
            return this.$store.state.authentication.user || null;
        },
    },
};
</script>
