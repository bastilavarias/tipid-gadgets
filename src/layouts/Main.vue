<template>
    <v-app class="c-app">
        <v-app-bar app class="secondary" flat>
            <v-container>
                <div class="d-flex justify-space-between align-center">
                    <v-toolbar-title>
                        <v-img
                            :src="require('@/assets/tipidgadgets_logo.png')"
                            width="15rem"
                            height="auto"
                        ></v-img>
                    </v-toolbar-title>

                    <v-menu offset-y v-if="isAuthenticated">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text dark v-bind="attrs" v-on="on">
                                <v-avatar class="mr-1" size="25">
                                    <v-img
                                        :src="
                                            user.avatar
                                                ? user.avatar
                                                : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                                        "
                                    ></v-img>
                                </v-avatar>
                                <v-icon>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="logout">Logout</v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-container>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-card color="white" flat>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="3">
                                <v-row>
                                    <v-col cols="12">
                                        <main-layout-main-navigation></main-layout-main-navigation>
                                    </v-col>

                                    <v-col cols="12" v-if="isAuthenticated">
                                        <main-layout-user-navigation></main-layout-user-navigation>
                                    </v-col>

                                    <v-col cols="12" v-if="isAuthenticated">
                                        <main-layout-following-card></main-layout-following-card>
                                    </v-col>

                                    <v-col cols="12">
                                        <main-layout-search-card></main-layout-search-card>
                                    </v-col>

                                    <v-col cols="12">
                                        <main-layout-catalog-browser-card></main-layout-catalog-browser-card>
                                    </v-col>

                                    <v-col cols="12">
                                        <main-layout-updated-forum-card></main-layout-updated-forum-card>
                                    </v-col>

                                    <v-col cols="12">
                                        <main-layout-new-item-sale-card></main-layout-new-item-sale-card>
                                    </v-col>

                                    <v-col cols="12">
                                        <main-layout-new-item-buy-card></main-layout-new-item-buy-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="9">
                                <router-view></router-view>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>

        <system-snackbar></system-snackbar>
    </v-app>
</template>

<script>
import MainLayoutMainNavigation from '@/components/parts/main-layout/MainNavigation';
import MainLayoutUserNavigation from '@/components/parts/main-layout/UserNavigation';
import MainLayoutFollowingCard from '@/components/parts/main-layout/FollowingCard';
import MainLayoutSearchCard from '@/components/parts/main-layout/SearchCard';
import MainLayoutCatalogBrowserCard from '@/components/parts/main-layout/CatalogBrowserCard';
import MainLayoutUpdatedForumCard from '@/components/parts/main-layout/UpdatedForumCard';
import MainLayoutNewItemSaleCard from '@/components/parts/main-layout/NewItemSaleCard';
import MainLayoutNewItemBuyCard from '@/components/parts/main-layout/NewItemcBuyCard';
import SystemSnackbar from '@/components/system/Snackbar';
import { PURGE_AUTHENTICATION } from '@/store/types/authentication';
import broadcastService from '@/services/broadcast';
export default {
    name: 'main-layout',

    components: {
        SystemSnackbar,
        MainLayoutNewItemBuyCard,
        MainLayoutNewItemSaleCard,
        MainLayoutUpdatedForumCard,
        MainLayoutCatalogBrowserCard,
        MainLayoutSearchCard,
        MainLayoutFollowingCard,
        MainLayoutUserNavigation,
        MainLayoutMainNavigation,
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        user() {
            return this.$store.state.authentication.user || null;
        },
    },

    methods: {
        logout() {
            this.$store.commit(PURGE_AUTHENTICATION);
        },
    },

    created() {
        if (this.isAuthenticated) broadcastService.initialize();
    },
};
</script>

<style lang="scss">
.c-app {
    background-color: #303030 !important;
}
</style>
