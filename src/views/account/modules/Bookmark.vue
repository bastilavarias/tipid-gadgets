<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Saved Items</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="(item, index) in item.items">
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
                                    :index="index"
                                ></item-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="!item.loading && item.items.length === 0"
                    >
                        <span class="caption font-italic">No saved items.</span>
                    </div>
                    <v-row dense v-if="item.loading">
                        <template v-for="i in item.perPage">
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
                            @click="getItems"
                            v-if="item.shouldShowNext && !item.loading"
                            >Next</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Bookmarked Topics</div>
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
                                    :index="index"
                                ></topic-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="!topic.loading && topic.items.length === 0"
                    >
                        <span class="caption font-italic"
                            >No saved topics.</span
                        >
                    </div>
                    <v-row dense v-if="topic.loading">
                        <template v-for="i in 20">
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
import { GET_ITEM_BOOKMARKS, GET_ITEMS } from '@/store/types/item';
import { GET_TOPIC_BOOKMARKS, GET_TOPICS } from '@/store/types/topic';
import { GET_USER_BY_USERNAME } from '@/store/types/user';
export default {
    components: { TopicPreview, ItemPreview },

    data() {
        return {
            item: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
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
        async getItems() {
            const { page, perPage, sortBy, orderBy } = this.item;
            const payload = {
                page,
                perPage,
                sortBy,
                orderBy,
                userID: this.userID,
            };
            this.item.loading = true;
            let bookmarks = await this.$store.dispatch(
                GET_ITEM_BOOKMARKS,
                payload
            );
            bookmarks = bookmarks.map((bookmark) => bookmark.item);
            if (bookmarks.length === perPage) {
                this.item.items = [...this.item.items, ...bookmarks];
                this.item.loading = false;
                this.item.page += 1;
                return;
            }
            this.item.items = [...this.item.items, ...bookmarks];
            this.item.shouldShowNext = false;
            this.item.loading = false;
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
            let bookmarks = await this.$store.dispatch(
                GET_TOPIC_BOOKMARKS,
                payload
            );
            bookmarks = bookmarks.map((bookmark) => bookmark.topic);
            if (bookmarks.length === perPage) {
                this.topic.items = [...this.topic.items, ...bookmarks];
                this.topic.loading = false;
                this.topic.page += 1;
                return;
            }
            this.topic.items = [...this.topic.items, ...bookmarks];
            this.topic.shouldShowNext = false;
            this.topic.loading = false;
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

        await this.getItems();
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
