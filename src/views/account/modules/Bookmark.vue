<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Saved Items</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense v-if="item.loading">
                        <template v-for="i in 10">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>

                    <v-row dense v-else>
                        <template v-for="(item, index) in item.items">
                            <v-col cols="12" :key="index">
                                <item-preview
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
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Bookmarked Topics</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense v-if="topic.loading">
                        <template v-for="i in 20">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>
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
                                    :index="index"
                                ></topic-preview>
                            </v-col>
                        </template>
                    </v-row>
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
export default {
    components: { TopicPreview, ItemPreview },

    data() {
        return {
            item: {
                loading: false,
                items: [],
                page: 1,
                perPage: 20,
                sortBy: 'created_at',
                orderBy: 'desc',
            },

            topic: {
                loading: false,
                items: [],
                page: 1,
                perPage: 20,
                filterBy: 'item_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
            },
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        userID() {
            if (!this.isAuthenticated) return this.$route.params.userID;
            return this.$store.state.authentication.user.id;
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
            const bookmarks = await this.$store.dispatch(
                GET_ITEM_BOOKMARKS,
                payload
            );
            this.item.items = bookmarks.map((bookmark) => bookmark.item);
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
            const bookmarks = await this.$store.dispatch(
                GET_TOPIC_BOOKMARKS,
                payload
            );
            this.topic.items = bookmarks.map((bookmark) => bookmark.topic);
            this.topic.loading = false;
        },
    },

    async created() {
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
