<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import UserListItem from '@/components/UserListItem.vue';
import ProductListItem from '@/components/ProductListItem.vue';
import { GET_PRODUCTS } from '@/store/modules/product';
import { GET_REVIEWS } from '@/store/modules/review';
import UserReviewCardItem from '@/components/UserReviewCardItem.vue';
import { UserInformation } from '@/types/user';

@Component({
    components: {
        UserReviewCardItem,
        ProductListItem,
        UserListItem,
        BaseContentCard,
    },
})
export default class UserPublicProfileLayout extends Vue {
    @Prop(Object) readonly user: UserInformation | undefined; // It came from Public Profile Layout
    shouldBootPage = false;
    itemForSale = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'items_for_sale',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    wantToBuy = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'want_to_buys',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    review = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'items_for_sale',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };

    get username() {
        return this.$route.params.username;
    }

    get shouldShowItemForSalePaginationComponent() {
        return this.shouldBootPage && this.itemForSale.items.length > 0;
    }

    get shouldShowWantToBuyPaginationComponent() {
        return this.shouldBootPage && this.wantToBuy.items.length > 0;
    }

    get shouldShowReviewPaginationComponent() {
        return this.shouldBootPage && this.review.items.length > 0;
    }

    get hasReviewsData() {
        return !this.review.loading && this.review.items.length > 0;
    }

    get hasItemsForSaleData() {
        return !this.itemForSale.loading && this.itemForSale.items.length > 0;
    }

    get hasWantToBuysData() {
        return !this.wantToBuy.loading && this.wantToBuy.items.length > 0;
    }

    @Watch('itemForSale.page')
    async onChangeItemForSalePage() {
        await this.getItemsForSale();
    }

    @Watch('wantToBuy.page')
    async onChangeWantToBuyPage() {
        await this.getWantToBuys();
    }

    @Watch('review.page')
    async onChangeReviewPage() {
        await this.getReviews();
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

    async getReviews() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.review;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.review.loading = true;
        const result = await this.$store.dispatch(GET_REVIEWS, payload);
        this.review.items = result.data.data;
        this.review.total = result.data.pagination.total;
        this.review.loading = false;
    }

    async created() {
        if (!this.username) {
            await this.$router.go(-1);
        }
        await this.getItemsForSale();
        await this.getWantToBuys();
        await this.getReviews();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <div>
        <b-row v-if="shouldBootPage">
            <b-col cols="12" class="mb-3">
                <base-content-card title="Reviews">
                    <b-list-group class="mb-3" v-if="hasReviewsData">
                        <template v-for="(review, index) in review.items">
                            <b-col cols="12" class="pt-3" :key="index">
                                <user-review-card-item
                                    :review="review"
                                ></user-review-card-item>
                            </b-col>
                        </template>
                    </b-list-group>

                    <div class="text-center py-4" v-else>
                        <span class="text-black-50">No data.</span>
                    </div>

                    <div
                        class="d-flex justify-content-center"
                        v-if="shouldShowReviewPaginationComponent"
                    >
                        <b-pagination
                            :total-rows="review.total"
                            :per-page="review.perPage"
                            v-model="review.page"
                        ></b-pagination>
                    </div>
                </base-content-card>
            </b-col>

            <b-col cols="12" class="mb-3">
                <base-content-card title="Items for Sale">
                    <b-list-group class="mb-3" v-if="hasItemsForSaleData">
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

            <b-col cols="12">
                <base-content-card
                    title="Want to Buys
"
                >
                    <b-list-group class="mb-3" v-if="hasWantToBuysData">
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
        </b-row>
    </div>
</template>
