<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title>
                    <span class="secondary--text font-weight-bold align-center">
                        New Items for Sale
                    </span>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom v-if="isClassicMode">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="mode = 'card'"
                            >
                                <v-icon>mdi-card-multiple</v-icon>
                            </v-btn>
                        </template>
                        <span>Switch to Card Mode</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="isCardMode">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="mode = 'classic'"
                            >
                                <v-icon>mdi-view-list</v-icon>
                            </v-btn>
                        </template>
                        <span>Switch to Classic Mode</span>
                    </v-tooltip>
                </v-card-title>

                <v-card-text>
                    <template v-if="isClassicMode">
                        <v-row dense v-if="itemForSale.loading">
                            <template v-for="i in 10">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <v-row dense v-else>
                            <template
                                v-for="(item, index) in itemForSale.items"
                            >
                                <v-col cols="12" :key="index">
                                    <item-preview
                                        :itemID="item.id"
                                        :name="item.name"
                                        :price="item.price"
                                        :category="item.category"
                                        :user="item.user"
                                        component="list-item"
                                        :slug="item.slug"
                                        :index="index"
                                    ></item-preview>
                                </v-col>
                            </template>
                        </v-row>
                    </template>
                    <template v-if="isCardMode">
                        <v-row dense v-if="itemForSale.loading">
                            <template v-for="i in 10">
                                <v-col cols="12" md="6" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line, image"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <masonry :cols="2" :gutter="15">
                            <div
                                v-for="(item, index) in itemForSale.items"
                                :key="index"
                            >
                                <item-preview
                                    :itemID="item.id"
                                    :name="item.name"
                                    :price="item.price"
                                    :category="item.category"
                                    :user="item.user"
                                    component="card"
                                    style="margin-bottom: 15px"
                                    :slug="item.slug"
                                    :index="index"
                                ></item-preview>
                            </div>
                        </masonry>
                    </template>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card flat>
                <v-card-title class="secondary--text font-weight-bold"
                    >New Want to Buys</v-card-title
                >

                <v-card-text>
                    <template v-if="isClassicMode">
                        <v-row dense v-if="wantToBuy.loading">
                            <template v-for="i in 10">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <v-row dense v-else>
                            <template v-for="(item, index) in wantToBuy.items">
                                <v-col cols="12" :key="index">
                                    <item-preview
                                        :itemID="item.id"
                                        :name="item.name"
                                        :price="item.price"
                                        :category="item.category"
                                        :user="item.user"
                                        component="list-item"
                                        :slug="item.slug"
                                        :index="index"
                                    ></item-preview>
                                </v-col>
                            </template>
                        </v-row>
                    </template>
                    <template v-if="isCardMode">
                        <v-row dense v-if="wantToBuy.loading">
                            <template v-for="i in 10">
                                <v-col cols="12" md="6" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line, image"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <masonry :cols="2" :gutter="15">
                            <div
                                v-for="(item, index) in wantToBuy.items"
                                :key="index"
                            >
                                <item-preview
                                    :itemID="item.id"
                                    :name="item.name"
                                    :price="item.price"
                                    :category="item.category"
                                    :user="item.user"
                                    component="card"
                                    style="margin-bottom: 15px"
                                    :slug="item.slug"
                                    :index="index"
                                ></item-preview>
                            </div>
                        </masonry>
                    </template>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ItemPreview from '@/components/custom/preview/Item';
import { GET_ITEMS } from '@/store/types/item';

export default {
    name: 'Home',

    components: { ItemPreview },

    data() {
        return {
            itemForSale: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                filterBy: 'item_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
            },

            wantToBuy: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                filterBy: 'want_to_buy',
                sortBy: 'created_at',
                orderBy: 'desc',
            },

            mode: 'classic',
        };
    },

    computed: {
        isClassicMode() {
            return this.mode === 'classic';
        },

        isCardMode() {
            return this.mode === 'card';
        },
    },

    methods: {
        async getItemsForSale() {
            const { page, perPage, filterBy, sortBy, orderBy } =
                this.itemForSale;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
            };
            this.itemForSale.loading = true;
            this.itemForSale.items = await this.$store.dispatch(
                GET_ITEMS,
                payload
            );
            this.itemForSale.loading = false;
        },

        async getWantToBuys() {
            const { page, perPage, filterBy, sortBy, orderBy } = this.wantToBuy;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
            };
            this.wantToBuy.loading = true;
            this.wantToBuy.items = await this.$store.dispatch(
                GET_ITEMS,
                payload
            );
            this.wantToBuy.loading = false;
        },
    },

    async created() {
        await this.getItemsForSale();
        await this.getWantToBuys();
    },
};
</script>
