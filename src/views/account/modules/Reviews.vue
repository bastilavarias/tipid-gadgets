<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <v-row>
                        <template v-for="(_review, index) in review.items">
                            <v-col cols="12" :key="index">
                                <rating-preview
                                    :rating="_review.rating"
                                    :reviewer="_review.reviewer"
                                    :item="_review.transaction.item"
                                    :content="_review.content"
                                    :createdAt="_review.created_at"
                                ></rating-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <v-row dense v-if="review.loading">
                        <template v-for="i in review.perPage">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>
                    <base-infinite-scroll
                        :action="getReviews"
                        :identifier="infiniteId"
                    ></base-infinite-scroll>
                </v-col>
            </v-row>
            <div
                class="fill-height d-flex justify-center align-center"
                v-if="!review.loading && review.items.length === 0"
            >
                <span class="caption font-italic">No reviews.</span>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import RatingPreview from '@/components/custom/preview/Rating';
import utilityMixin from '@/mixins/utility';
import { GET_USER_REVIEWS, GET_USER_BY_USERNAME } from '@/store/types/user';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';

export default {
    components: { BaseInfiniteScroll, RatingPreview },

    mixins: [utilityMixin],

    data() {
        return {
            review: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                sortBy: 'created_at',
                orderBy: 'desc',
            },

            user: null,
            infiniteId: +new Date(),
        };
    },

    computed: {
        isOwnAccount() {
            const myAccountRoutes = [
                'my-account/information',
                'my-account/post',
                'my-account/bookmark',
                'my-account/reviews',
                'my-account/follow',
            ];
            return myAccountRoutes.includes(this.$route.name);
        },

        userID() {
            if (this.isOwnAccount)
                return this.$store.state.authentication.user.id;
            return this.user.id;
        },
    },

    methods: {
        async getReviews($state) {
            const { page, perPage, sortBy, orderBy } = this.review;
            const payload = {
                page,
                perPage,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.review.loading = true;
            const reviews = await this.$store.dispatch(
                GET_USER_REVIEWS,
                payload
            );
            if (reviews.length === perPage) {
                this.review.page += 1;
                this.review.loading = false;
                this.review.items = [...this.review.items, ...reviews];
                $state.loaded();
                return;
            }
            this.review.items = [...this.review.items, ...reviews];
            this.review.loading = false;
        },

        async getUser() {
            const username = this.$route.params.username;
            return await this.$store.dispatch(GET_USER_BY_USERNAME, username);
        },
    },

    async created() {
        let user;
        if (this.isOwnAccount) {
            user = this.$store.state.authentication.user || null;
        } else {
            user = await this.getUser();
        }
        if (!user) return this.$router.go(-1);
        this.user = Object.assign({}, user);
    },

    beforeRouteEnter(to, from, next) {
        next(async (vm) => {
            if (!from.name) {
                await vm.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
            }
            next();
        });
    },
};
</script>
