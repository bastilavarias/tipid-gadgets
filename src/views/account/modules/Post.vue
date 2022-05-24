<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Items for Sale</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="(item, index) in itemForSale.items">
                            <v-col cols="12" :key="index">
                                <item-preview
                                    :section="item.section"
                                    :itemID="item.id"
                                    :name="item.name"
                                    :price="item.price"
                                    :category="item.category"
                                    :user="item.user"
                                    component="list-item"
                                    :slug="item.slug"
                                    :has-operations="
                                        isAuthenticated &&
                                        isOwnAccount &&
                                        userID === item.user.id
                                    "
                                    @onDelete="removeItemForSale"
                                    :index="index"
                                ></item-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="
                            !itemForSale.loading &&
                            itemForSale.items.length === 0
                        "
                    >
                        <span class="caption font-italic"
                            >No items for sale.</span
                        >
                    </div>
                    <v-row dense v-if="itemForSale.loading">
                        <template v-for="i in 10">
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
                            @click="getItemsForSale"
                            v-if="
                                itemForSale.shouldShowNext &&
                                !itemForSale.loading
                            "
                            >Next</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Want to Buys</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="(item, index) in wantToBuy.items">
                            <v-col cols="12" :key="index">
                                <item-preview
                                    :section="item.section"
                                    :itemID="item.id"
                                    :name="item.name"
                                    :price="item.price"
                                    :category="item.category"
                                    :user="item.user"
                                    component="list-item"
                                    :slug="item.slug"
                                    :has-operations="
                                        isAuthenticated &&
                                        isOwnAccount &&
                                        userID === item.user.id
                                    "
                                    @onDelete="removeWantToBuy"
                                    :index="index"
                                ></item-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="
                            !wantToBuy.loading && wantToBuy.items.length === 0
                        "
                    >
                        <span class="caption font-italic"
                            >No want to buys.</span
                        >
                    </div>
                    <v-row dense v-if="wantToBuy.loading">
                        <template v-for="i in wantToBuy.perPage">
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
                            @click="getWantToBuys"
                            v-if="
                                wantToBuy.shouldShowNext && !wantToBuy.loading
                            "
                            >Next</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Forum Topics</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="(topic, index) in topic.items">
                            <v-col cols="12" :key="index">
                                <topic-preview
                                    :topicID="topic.id"
                                    :name="topic.name"
                                    :section="topic.section"
                                    :user="topic.user"
                                    :created-at="topic.created_at"
                                    :slug="topic.slug"
                                    :updated-at="topic.updated_at"
                                    :comments-count="topic.comments_count"
                                    :has-operations="
                                        isAuthenticated &&
                                        isOwnAccount &&
                                        userID === topic.user.id
                                    "
                                    @onDelete="removeTopic"
                                    :index="index"
                                ></topic-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="!topic.loading && topic.items.length === 0"
                    >
                        <span class="caption font-italic">No topics.</span>
                    </div>
                    <v-row dense v-if="topic.loading">
                        <template v-for="i in topic.perPage">
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
                            @click="getTopics"
                            v-if="topic.shouldShowNext && !topic.loading"
                            >Next</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import ItemPreview from '@/components/custom/preview/Item';
import TopicPreview from '@/components/custom/preview/Topic';
import { GET_ITEMS } from '@/store/types/item';
import { GET_TOPICS } from '@/store/types/topic';
import { GET_USER_BY_USERNAME } from '@/store/types/user';
import { GET_LOCATIONS } from '@/store/types/reference';
export default {
    components: { TopicPreview, ItemPreview },

    data() {
        return {
            itemForSale: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                filterBy: 'items_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
                shouldShowNext: true,
            },

            wantToBuy: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                filterBy: 'want_to_buys',
                sortBy: 'created_at',
                orderBy: 'desc',
                shouldShowNext: true,
            },

            topic: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                filterBy: 'item_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
                shouldShowNext: true,
            },

            mode: 'classic',

            user: null,
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

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
        async getItemsForSale() {
            const { page, perPage, filterBy, sortBy, orderBy } =
                this.itemForSale;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.itemForSale.loading = true;
            const items = await this.$store.dispatch(GET_ITEMS, payload);
            if (items.length === perPage) {
                this.itemForSale.items = [...this.itemForSale.items, ...items];
                this.itemForSale.loading = false;
                this.itemForSale.page += 1;
                return;
            }
            this.itemForSale.items = [...this.itemForSale.items, ...items];
            this.itemForSale.shouldShowNext = false;
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
                userID: this.userID,
            };
            this.wantToBuy.loading = true;
            const items = await this.$store.dispatch(GET_ITEMS, payload);
            if (items.length === perPage) {
                this.wantToBuy.items = [...this.wantToBuy.items, ...items];
                this.wantToBuy.loading = false;
                this.wantToBuy.page += 1;
                return;
            }
            this.wantToBuy.items = [...this.wantToBuy.items, ...items];
            this.wantToBuy.shouldShowNext = false;
            this.wantToBuy.loading = false;
        },

        async getTopics() {
            const { page, perPage, filterBy, sortBy, orderBy } = this.topic;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.topic.loading = true;
            const topics = await this.$store.dispatch(GET_TOPICS, payload);
            if (topics.length === perPage) {
                this.topic.items = [...this.topic.items, ...topics];
                this.topic.loading = false;
                this.topic.page += 1;
                return;
            }
            this.topic.items = [...this.topic.items, ...topics];
            this.topic.shouldShowNext = false;
            this.topic.loading = false;
        },

        async getUser() {
            const username = this.$route.params.username;
            return await this.$store.dispatch(GET_USER_BY_USERNAME, username);
        },

        removeItemForSale(itemID) {
            this.itemForSale.items = this.itemForSale.items.filter(
                (item) => item.id !== itemID
            );
        },

        removeWantToBuy(itemID) {
            this.wantToBuy.items = this.wantToBuy.items.filter(
                (item) => item.id !== itemID
            );
        },

        removeTopic(topicID) {
            this.topic.items = this.topic.items.filter(
                (topic) => topic.id !== topicID
            );
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

        await this.getItemsForSale();
        await this.getWantToBuys();
        await this.getTopics();
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
