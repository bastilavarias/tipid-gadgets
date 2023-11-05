<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductListItem from '@/components/ProductListItem.vue';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { GET_PRODUCTS } from '@/store/modules/product';
@Component({
    components: { BaseContentCard, ProductListItem },
})
export default class HomeView extends Vue {
    itemForSale = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        filterBy: 'items_for_sale',
        sortBy: 'created_at',
        orderBy: 'desc',
    };

    wantToBuy = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        filterBy: 'want_to_buys',
        sortBy: 'created_at',
        orderBy: 'desc',
    };

    get hasItemsForSale() {
        return !this.itemForSale.loading && this.itemForSale.items.length > 0;
    }

    get hasWantToBuys() {
        return !this.wantToBuy.loading && this.wantToBuy.items.length > 0;
    }

    async getItemsForSale() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.itemForSale;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
        };
        this.itemForSale.loading = true;
        const result = await this.$store.dispatch(GET_PRODUCTS, payload);
        this.itemForSale.items = result.data.data;
        this.itemForSale.loading = false;
    }

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
        const result = await this.$store.dispatch(GET_PRODUCTS, payload);
        this.wantToBuy.items = result.data.data;
        this.wantToBuy.loading = false;
    }

    async created() {
        await this.getItemsForSale();
        await this.getWantToBuys();
    }
}
</script>

<template>
    <section>
        <b-row>
            <b-col cols="12" class="mb-3">
                <base-content-card title="New Items for Sale">
                    <b-list-group v-if="hasItemsForSale">
                        <template v-for="(product, index) in itemForSale.items">
                            <product-list-item
                                :inherited-index="index"
                                :product="product"
                                :key="index"
                            ></product-list-item>
                        </template>
                    </b-list-group>

                    <div class="text-center py-4" v-else>
                        <span class="text-black-50">No data.</span>
                    </div>
                </base-content-card>
            </b-col>

            <b-col cols="12">
                <base-content-card
                    title="New Want to Buys
"
                >
                    <b-list-group v-if="hasWantToBuys">
                        <template v-for="(product, index) in wantToBuy.items">
                            <product-list-item
                                :inherited-index="index"
                                :product="product"
                                :key="index"
                            ></product-list-item>
                        </template>
                    </b-list-group>
                    <div class="text-center py-4" v-else>
                        <span class="text-black-50">No data.</span>
                    </div>
                </base-content-card>
            </b-col>
        </b-row>
    </section>
</template>
