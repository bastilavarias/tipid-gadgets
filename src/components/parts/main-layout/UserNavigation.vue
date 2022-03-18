<template>
    <v-card outlined>
        <v-list dense v-model="list">
            <v-list-item-group>
                <template v-for="(navigation, index) in navigations">
                    <v-list-item
                        class="primary--text pl-1"
                        :to="navigation.to"
                        :exact="navigation.exact"
                        :key="index"
                        ><v-icon class="mr-1" color="primary"
                            >mdi-chevron-right</v-icon
                        >{{ navigation.text }}</v-list-item
                    >
                </template>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
const navigations = [
    {
        text: 'My Account', // Should under Ratings, Items and Favorites, Forum Bookmarks
        to: { name: 'my-account/information' },
        exact: false,
    },
    {
        text: 'Messages',
        exact: true,
    },
    {
        text: 'Sign Out',
        exact: true,
    },
];

export default {
    name: 'main-layout-user-navigation',

    data() {
        return {
            list: 0,
        };
    },

    computed: {
        navigations() {
            return navigations;
        },
    },
};
</script>
