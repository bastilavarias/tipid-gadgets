<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Followers</div>
                </v-col>

                <v-col cols="12">
                    <v-row dense>
                        <template v-for="(follower, index) in follower.items">
                            <v-col cols="12" :key="index">
                                <user-preview
                                    :userID="follower.id"
                                    :name="follower.name"
                                    :username="follower.username"
                                    :location="follower.location"
                                    :avatar="follower.avatar"
                                ></user-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="!follower.loading && follower.items.length === 0"
                    >
                        <span class="caption font-italic">No followers.</span>
                    </div>
                    <v-row dense v-if="follower.loading">
                        <template v-for="i in follower.perPage">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>
                    <div class="d-flex justify-space-between mt-5">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            class="text-capitalize"
                            depressed
                            @click="getFollowers"
                            v-if="follower.shouldShowNext && !follower.loading"
                            >Next</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Following</div>
                </v-col>

                <v-col cols="12">
                    <v-row dense>
                        <template v-for="(following, index) in following.items">
                            <v-col cols="12" :key="index">
                                <user-preview
                                    :userID="following.id"
                                    :name="following.name"
                                    :username="following.username"
                                    :location="following.location"
                                    :avatar="following.avatar"
                                ></user-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="
                            !following.loading && following.items.length === 0
                        "
                    >
                        <span class="caption font-italic">No following.</span>
                    </div>
                    <v-row dense v-if="following.loading">
                        <template v-for="i in following.perPage">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>
                    <div class="d-flex justify-space-between mt-5">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            class="text-capitalize"
                            depressed
                            @click="getFollowing"
                            v-if="
                                following.shouldShowNext && !following.loading
                            "
                            >Next</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { GET_USER_BY_USERNAME, GET_USER_FOLLOWS } from '@/store/types/user';
import UserPreview from '@/components/custom/preview/User';

export default {
    components: { UserPreview },
    data() {
        return {
            follower: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                filterBy: 'follower',
                shouldShowNext: true,
            },

            following: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                filterBy: 'following',
                shouldShowNext: true,
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
        async getUser() {
            const username = this.$route.params.username;
            return await this.$store.dispatch(GET_USER_BY_USERNAME, username);
        },

        async getFollowers() {
            const { page, perPage, filterBy, sortBy, orderBy } = this.follower;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.follower.loading = true;
            let followers = await this.$store.dispatch(
                GET_USER_FOLLOWS,
                payload
            );
            followers = followers.map((follower) => follower.follower);
            if (followers.length === perPage) {
                this.follower.items = [...this.follower.items, ...followers];
                this.follower.loading = false;
                this.follower.page += 1;
                return;
            }
            this.follower.items = [...this.follower.items, ...followers];
            this.follower.shouldShowNext = false;
            this.follower.loading = false;
        },

        async getFollowing() {
            const { page, perPage, filterBy, sortBy, orderBy } = this.following;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.following.loading = true;
            let following = await this.$store.dispatch(
                GET_USER_FOLLOWS,
                payload
            );
            following = following.map((_following) => _following.user);
            if (following.length === perPage) {
                this.following.items = [...this.following.items, ...following];
                this.following.loading = false;
                this.following.page += 1;
                return;
            }
            this.following.items = [...this.following.items, ...following];
            this.following.shouldShowNext = false;
            this.following.loading = false;
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

        await this.getFollowers();
        await this.getFollowing();
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
