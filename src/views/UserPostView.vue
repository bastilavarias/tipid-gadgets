<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { GET_PRODUCTS } from '@/store/modules/product';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import ProductListItem from '@/components/ProductListItem.vue';
import { GET_THREADS } from '@/store/modules/thread';
import ThreadListItem from '@/components/ThreadListItem.vue';

@Component({
    components: { ThreadListItem, ProductListItem, BaseContentCard },
})
export default class UserItemFavoriteView extends Vue {
    itemForSale = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        filterBy: 'items_for_sale',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    wantToBuy = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        filterBy: 'want_to_buys',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    thread = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    shouldBootPage = false;

    get user(): UserInformation | null {
        return authenticationModule.state.user;
    }

    get shouldShowItemForSalePaginationComponent() {
        return this.shouldBootPage && this.itemForSale.items.length > 0;
    }

    get shouldShowWantToBuyPaginationComponent() {
        return this.shouldBootPage && this.wantToBuy.items.length > 0;
    }

    get shouldShowThreadPaginationComponent() {
        return this.shouldBootPage && this.thread.items.length > 0;
    }

    get hasItemsForSaleData() {
        return !this.itemForSale.loading && this.itemForSale.items.length > 0;
    }

    get hasWantToBuysData() {
        return !this.wantToBuy.loading && this.wantToBuy.items.length > 0;
    }

    get hasThreadData() {
        return !this.thread.loading && this.thread.items.length > 0;
    }

    @Watch('itemForSale.page')
    async onChangeItemForSalePage() {
        await this.getItemsForSale();
    }

    @Watch('wantToBuy.page')
    async onChangeWantToBuyPage() {
        await this.getWantToBuys();
    }

    @Watch('thread.page')
    async onChangeThreadPage() {
        await this.getThreadTopics();
    }

    async getItemsForSale() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.itemForSale;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.itemForSale.loading = true;
        const result = await this.$store.dispatch(GET_PRODUCTS, payload);
        this.itemForSale.items = result.data.data;
        this.itemForSale.total = result.data.pagination.total;
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
            userID: this.user?.id,
        };
        this.wantToBuy.loading = true;
        const result = await this.$store.dispatch(GET_PRODUCTS, payload);
        this.wantToBuy.items = result.data.data;
        this.wantToBuy.total = result.data.pagination.total;
        this.wantToBuy.loading = false;
    }

    async getThreadTopics() {
        const { page, perPage, sortBy, orderBy } = this.thread;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.thread.loading = true;
        const result = await this.$store.dispatch(GET_THREADS, payload);
        this.thread.items = result.data.data;
        this.thread.total = result.data.pagination.total;
        this.thread.loading = false;
    }

    removeFromItems(type: string, id: number) {
        if (type === 'items_for_sale') {
            this.itemForSale.items = this.itemForSale.items.filter(
                // @ts-ignore
                (product) => product.id !== id
            );
        } else if (type === 'want_to_buys') {
            this.wantToBuy.items = this.wantToBuy.items.filter(
                // @ts-ignore
                (product) => product.id !== id
            );
        } else if (type === 'thread') {
            this.thread.items = this.thread.items.filter(
                // @ts-ignore
                (thread) => thread.id !== id
            );
        }
    }

    async created() {
        await this.getItemsForSale();
        await this.getWantToBuys();
        await this.getThreadTopics();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <b-row v-if="shouldBootPage">
        <b-col cols="12" class="mb-3">
            <base-content-card title="My Items for Sale">
                <b-list-group class="mb-3" v-if="hasItemsForSaleData">
                    <template v-for="(product, index) in itemForSale.items">
                        <product-list-item
                            :inherited-index="index"
                            :product="product"
                            allow-author-actions
                            @onRefresh="
                                removeFromItems('items_for_sale', product.id)
                            "
                            :key="index"
                        ></product-list-item>
                    </template>
                </b-list-group>

                <div class="text-center py-4" v-else>
                    <span class="text-black-50">No data.</span>
                </div>

                <div
                    class="d-flex justify-content-center"
                    v-if="shouldShowItemForSalePaginationComponent"
                >
                    <b-pagination
                        :total-rows="itemForSale.total"
                        :per-page="itemForSale.perPage"
                        v-model="itemForSale.page"
                    ></b-pagination>
                </div>
            </base-content-card>
        </b-col>
        <b-col cols="12" class="mb-3">
            <base-content-card title="My Want to Buys">
                <b-list-group class="mb-3" v-if="hasWantToBuysData">
                    <template v-for="(product, index) in wantToBuy.items">
                        <product-list-item
                            :inherited-index="index"
                            :product="product"
                            allow-author-actions
                            @onRefresh="
                                removeFromItems('want_to_buys', product.id)
                            "
                            :key="index"
                        ></product-list-item>
                    </template>
                </b-list-group>

                <div class="text-center py-4" v-else>
                    <span class="text-black-50">No data.</span>
                </div>

                <div
                    class="d-flex justify-content-center"
                    v-if="shouldShowWantToBuyPaginationComponent"
                >
                    <b-pagination
                        :total-rows="wantToBuy.total"
                        :per-page="wantToBuy.perPage"
                        v-model="wantToBuy.page"
                    ></b-pagination>
                </div>
            </base-content-card>
        </b-col>
        <b-col cols="12">
            <base-content-card title="My Forum Topics">
                <b-list-group class="mb-3" v-if="hasThreadData">
                    <template v-for="(thread, index) in thread.items">
                        <thread-list-item
                            :inherited-index="index"
                            :thread="thread"
                            allow-author-actions
                            @onRefresh="removeFromItems('thread', thread.id)"
                            :key="index"
                        ></thread-list-item>
                    </template>
                </b-list-group>

                <div class="text-center py-4" v-else>
                    <span class="text-black-50">No data.</span>
                </div>

                <div
                    class="d-flex justify-content-center"
                    v-if="shouldShowThreadPaginationComponent"
                >
                    <b-pagination
                        :total-rows="thread.total"
                        :per-page="thread.perPage"
                        v-model="thread.page"
                    ></b-pagination>
                </div>
            </base-content-card>
        </b-col>
    </b-row>
</template>
