<template>
    <v-card flat>
        <v-card-title class="secondary caption font-weight-medium white--text">
            New Items for Sale
        </v-card-title>

        <v-card outlined tile>
            <v-card-text style="max-height: 22rem; overflow: auto">
                <div
                    class="fill-height d-flex justify-center align-center"
                    v-if="
                        !itemForSale.loading && itemForSale.items.length === 0
                    "
                >
                    <span class="caption font-italic"
                        >No new items for sale.</span
                    >
                </div>

                <v-row dense v-else>
                    <template v-for="(item, index) in itemForSale.items">
                        <v-col cols="12" :key="index">
                            <router-link
                                :to="{
                                    name: 'view-item',
                                    params: { slug: item.slug },
                                }"
                            >
                                <span
                                    class="subtitle-2 primary--text text-decoration-underline pointer"
                                    >{{ item.name }}</span
                                >
                            </router-link>
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script>
import { GET_ITEMS } from '@/store/types/item';

export default {
    name: 'main-layout-new-item-sale-card',

    data() {
        return {
            itemForSale: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                filterBy: 'items_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
            },
        };
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
    },

    async created() {
        await this.getItemsForSale();
    },
};
</script>
