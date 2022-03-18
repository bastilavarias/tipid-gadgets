<template>
    <v-app class="c-app">
        <v-app-bar app class="secondary" flat>
            <v-container>
                <v-toolbar-title>
                    <v-img
                        :src="require('@/assets/tipidgadgets_logo.png')"
                        width="15rem"
                        height="auto"
                    ></v-img>
                </v-toolbar-title>
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

                                    <v-col cols="12">
                                        <main-layout-user-navigation></main-layout-user-navigation>
                                    </v-col>

                                    <v-col cols="12">
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
export default {
    name: 'main-layout',

    components: {
        MainLayoutNewItemBuyCard,
        MainLayoutNewItemSaleCard,
        MainLayoutUpdatedForumCard,
        MainLayoutCatalogBrowserCard,
        MainLayoutSearchCard,
        MainLayoutFollowingCard,
        MainLayoutUserNavigation,
        MainLayoutMainNavigation,
    },
};
</script>

<style lang="scss">
.c-app {
    background-color: #303030 !important;
}
</style>
