<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { GET_REVIEWS } from '@/store/modules/review';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import UserReviewCardItem from '@/components/UserReviewCardItem.vue';

@Component({
    components: { UserReviewCardItem, BaseContentCard },
})
export default class UserRatingView extends Vue {
    review = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        filterBy: 'items_for_sale',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    shouldBootPage = false;

    get user(): UserInformation | null {
        return authenticationModule.state.user;
    }

    get shouldShowPaginationComponent() {
        return this.shouldBootPage && this.review.items.length > 0;
    }

    get hasData() {
        return !this.review.loading && this.review.items.length > 0;
    }

    @Watch('review.page')
    async onChangeReviewPage() {
        await this.getReviews();
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
        await this.getReviews();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <div>
        <base-content-card title="My Ratings" v-if="shouldBootPage">
            <b-row class="mb-3" v-if="hasData">
                <b-col cols="12">
                    <template v-for="(review, index) in review.items">
                        <b-col cols="12" class="pt-3" :key="index">
                            <user-review-card-item
                                :review="review"
                            ></user-review-card-item>
                        </b-col>
                    </template>
                </b-col>
            </b-row>
            <div class="text-center py-4" v-else>
                <span class="text-black-50">No data.</span>
            </div>

            <div
                class="d-flex justify-content-center"
                v-if="shouldShowPaginationComponent"
            >
                <b-pagination
                    :total-rows="review.total"
                    :per-page="review.perPage"
                    v-model="review.page"
                ></b-pagination>
            </div>
        </base-content-card>
    </div>
</template>
