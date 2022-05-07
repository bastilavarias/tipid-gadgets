<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <v-row dense v-if="review.loading">
                        <template v-for="i in 10">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>

                    <v-row dense>
                        <template v-for="(review, index) in review.items">
                            <v-col cols="12" :key="index">
                                <rating-preview
                                    :rating="review.rating"
                                    :reviewer="review.reviewer"
                                    :item="review.transaction.item"
                                    :content="review.content"
                                    :createdAt="review.created_at"
                                ></rating-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import RatingPreview from '@/components/custom/preview/Rating';
import utilityMixin from '@/mixins/utility';
import { GET_USER_REVIEWS, GET_USER_BY_USERNAME } from '@/store/types/user';

export default {
    components: { RatingPreview },

    mixins: [utilityMixin],

    data() {
        return {
            review: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                sortBy: 'created_at',
                orderBy: 'desc',
            },

            user: null,
        };
    },

    computed: {
        isOwnAccount() {
            const myAccountRoutes = [
                'my-account/information',
                'my-account/post',
                'my-account/bookmark',
                'my-account/reviews',
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
        async getReviews() {
            const { page, perPage, sortBy, orderBy } = this.review;
            const payload = {
                page,
                perPage,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.review.loading = true;
            this.review.items = await this.$store.dispatch(
                GET_USER_REVIEWS,
                payload
            );
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

        await this.getReviews();
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
