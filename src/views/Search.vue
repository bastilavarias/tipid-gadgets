<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title>
                    <span class="secondary--text font-weight-bold align-center"
                        >Search TipidGadgets</span
                    >
                    <v-spacer></v-spacer>
                    <v-btn icon @click="isOptionDialogOpen = true">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-subtitle>
                    <div class="primary--text">
                        <span class="font-weight-bold">{{ title }} </span>
                        <span>
                            <span v-if="query">
                                <span class="font-weight-bold">:</span
                                >{{ ` ${options.keywords} ` }}
                                <span v-if="mode.forumTopics && topicSection"
                                    >-</span
                                >
                            </span>
                            <span v-if="mode.forumTopics && topicSection">
                                <span class="font-weight-bold" v-if="!query"
                                    >: </span
                                >{{ topicSection.name }}</span
                            >
                        </span>
                    </div>
                </v-card-subtitle>

                <v-card-text>
                    <template v-if="mode.itemsForSale">
                        <v-row dense>
                            <template
                                v-for="(item, index) in itemForSale.items"
                            >
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
                            <template v-for="i in itemForSale.perPage">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>

                        <base-infinite-scroll
                            :action="getItemsForSale"
                            :identifier="infiniteId"
                        ></base-infinite-scroll>
                    </template>

                    <template v-if="mode.wantToBuys">
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
                                        :index="index"
                                    ></item-preview>
                                </v-col>
                            </template>
                        </v-row>
                        <div
                            class="fill-height d-flex justify-center align-center"
                            v-if="
                                !wantToBuy.loading &&
                                wantToBuy.items.length === 0
                            "
                        >
                            <span class="caption font-italic"
                                >No want to buys.</span
                            >
                        </div>
                        <v-row dense v-if="wantToBuy.loading">
                            <template v-for="i in wantToBuy.perPage">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <base-infinite-scroll
                            :action="getWantToBuys"
                            :identifier="infiniteId"
                        ></base-infinite-scroll>
                    </template>

                    <template v-if="mode.forumTopics">
                        <v-row dense>
                            <template
                                v-for="(topic, index) in forumTopic.items"
                            >
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
                            v-if="
                                !forumTopic.loading &&
                                forumTopic.items.length === 0
                            "
                        >
                            <span class="caption font-italic"
                                >No forum topics.</span
                            >
                        </div>
                        <v-row dense v-if="forumTopic.loading">
                            <template v-for="i in forumTopic.perPage">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <base-infinite-scroll
                            :action="getForumTopics"
                            :identifier="infiniteId"
                        ></base-infinite-scroll>
                    </template>

                    <template v-if="mode.members">
                        <v-row dense>
                            <template v-for="(user, index) in member.items">
                                <v-col cols="12" :key="index">
                                    <user-preview
                                        :userID="user.id"
                                        :name="user.name"
                                        :username="user.username"
                                        :location="user.location"
                                        :avatar="user.avatar"
                                    ></user-preview>
                                </v-col>
                            </template>
                        </v-row>
                        <div
                            class="fill-height d-flex justify-center align-center"
                            v-if="!member.loading && member.items.length === 0"
                        >
                            <span class="caption font-italic">No members.</span>
                        </div>
                        <v-row dense v-if="member.loading">
                            <template v-for="i in member.perPage">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <base-infinite-scroll
                            :action="getMembers"
                            :identifier="infiniteId"
                        ></base-infinite-scroll>
                    </template>
                </v-card-text>
            </v-card>
        </v-col>

        <search-option-dialog
            :is-open.sync="isOptionDialogOpen"
            :options="options"
            @search="setSearchOptions"
        ></search-option-dialog>
    </v-row>
</template>

<script>
import SearchOptionDialog from '@/components/custom/search/OptionDialog';
import { GET_ITEMS } from '@/store/types/item';
import ItemPreview from '@/components/custom/preview/Item';
import { GET_SEARCH_TYPES, GET_TOPIC_SECTIONS } from '@/store/types/reference';
import { GET_TOPICS } from '@/store/types/topic';
import TopicPreview from '@/components/custom/preview/Topic';
import { GET_USERS } from '@/store/types/user';
import UserPreview from '@/components/custom/preview/User';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';

export default {
    components: {
        BaseInfiniteScroll,
        UserPreview,
        TopicPreview,
        ItemPreview,
        SearchOptionDialog,
    },

    data() {
        return {
            isOptionDialogOpen: false,
            types: [],
            options: {
                type: null,
                keywords: null,
                sectionID: null,
                categoryID: null,
                conditionID: null,
                warrantyID: null,
                minimumPrice: null,
                maximumPrice: null,
                location: null,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            itemForSale: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                filterBy: 'item_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            wantToBuy: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                filterBy: 'want_to_buy',
                sortBy: 'created_at',
            },
            forumTopic: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            member: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            sections: [], // topic sections
            infiniteId: +new Date(),
        };
    },

    computed: {
        type() {
            return this.$route.query.type || null;
        },

        query() {
            return this.$route.query.query || null;
        },

        title() {
            const type = this.type;
            const types = this.types;
            if (type && types.length > 0) {
                return types.find((_type) => _type.slug === type).name || null;
            }
            return null;
        },

        mode() {
            const type = this.type;
            return {
                itemsForSale: type === 'items_for_sale',
                wantToBuys: type === 'want_to_buys',
                forumTopics: type === 'forum_topics',
                members: type === 'members',
            };
        },

        topicSection() {
            const sectionID = parseInt(this.options.sectionID) || null;
            if (!sectionID) return null;
            return this.sections.find((section) => section.id === sectionID);
        },
    },

    watch: {
        '$route.query': {
            async handler(val) {
                if (val) {
                    Object.keys(val).forEach((key) => {
                        if (val[key] === null) {
                            delete val[key];
                        }
                    });
                    this.options = Object.assign(
                        {},
                        {
                            ...val,
                            keywords: val.query,
                        }
                    );

                    const { type } = this.options;
                    let dataName;
                    if (type === 'items_for_sale') dataName = 'itemForSale';
                    if (type === 'want_to_buys') dataName = 'wantToBuy';
                    if (type === 'forum_topics') dataName = 'forumTopic';
                    if (type === 'members') dataName = 'member';

                    this[dataName].page = 1;
                    this[dataName].items = [];
                    this.infiniteId += 1;
                }
            },
            deep: true,
        },
    },

    methods: {
        async getItemsForSale($state) {
            const {
                type,
                keywords,
                categoryID,
                conditionID,
                warrantyID,
                minimumPrice,
                maximumPrice,
                sortBy,
                orderBy,
            } = this.options;
            const { page, perPage } = this.itemForSale;
            const payload = {
                page,
                perPage,
                filterBy: type,
                sortBy,
                orderBy: orderBy,
                search: keywords,
                categoryID,
                conditionID,
                warrantyID,
                minimumPrice,
                maximumPrice,
            };
            this.itemForSale.loading = true;
            const items = await this.$store.dispatch(GET_ITEMS, payload);
            if (items.length === perPage) {
                this.itemForSale.page += 1;
                this.itemForSale.loading = false;
                this.itemForSale.items = [...this.itemForSale.items, ...items];
                $state.loaded();
                return;
            }
            this.itemForSale.items = [...this.itemForSale.items, ...items];
            this.itemForSale.loading = false;
            $state.complete();
        },

        async getWantToBuys($state) {
            const {
                type,
                keywords,
                categoryID,
                conditionID,
                warrantyID,
                minimumPrice,
                maximumPrice,
                sortBy,
                orderBy,
            } = this.options;
            const { page, perPage } = this.wantToBuy;
            const payload = {
                page,
                perPage,
                filterBy: type,
                sortBy,
                orderBy: orderBy,
                search: keywords,
                categoryID,
                conditionID,
                warrantyID,
                minimumPrice,
                maximumPrice,
            };
            this.wantToBuy.loading = true;
            const items = await this.$store.dispatch(GET_ITEMS, payload);
            if (items.length === perPage) {
                this.wantToBuy.page += 1;
                this.wantToBuy.loading = false;
                this.wantToBuy.items = [...this.wantToBuy.items, ...items];
                $state.loaded();
                return;
            }
            this.wantToBuy.items = [...this.wantToBuy.items, ...items];
            this.wantToBuy.loading = false;
            $state.complete();
        },

        async getForumTopics($state) {
            const { type, sectionID, sortBy, orderBy, keywords } = this.options;
            const { page, perPage } = this.forumTopic;
            const payload = {
                page,
                perPage,
                filterBy: type,
                sortBy,
                orderBy: orderBy,
                search: keywords,
                sectionID,
            };
            this.forumTopic.loading = true;
            const topics = await this.$store.dispatch(GET_TOPICS, payload);
            if (topics.length === perPage) {
                this.forumTopic.page += 1;
                this.forumTopic.loading = false;
                this.forumTopic.items = [...this.forumTopic.items, ...topics];
                $state.loaded();
                return;
            }
            this.forumTopic.items = [...this.forumTopic.items, ...topics];
            this.forumTopic.loading = false;
            $state.complete();
        },

        async getMembers($state) {
            const { type, location, sortBy, orderBy, keywords } = this.options;
            const { page, perPage } = this.member;
            const payload = {
                page,
                perPage,
                filterBy: type,
                location,
                sortBy,
                orderBy: orderBy,
                search: keywords,
            };
            this.member.loading = true;
            const members = await this.$store.dispatch(GET_USERS, payload);
            if (members.length === perPage) {
                this.member.page += 1;
                this.member.loading = false;
                this.member.items = [...this.member.items, ...members];
                $state.loaded();
                return;
            }
            this.member.items = [...this.member.items, ...members];
            this.member.loading = false;
            $state.complete();
        },

        async setSearchOptions(options) {
            Object.keys(options).forEach((key) => {
                if (options[key] === null) {
                    delete options[key];
                }
            });
            this.options = Object.assign(
                {},
                {
                    ...options,
                }
            );
            await this.$router.push({
                name: 'search',
                query: { ...options, query: options.keywords },
            });
        },
    },

    async created() {
        const { type } = this.$route.query;
        this.types = await this.$store.dispatch(GET_SEARCH_TYPES);
        this.sections = await this.$store.dispatch(GET_TOPIC_SECTIONS);
        if (!type) return this.$router.go(-1);
        this.options = Object.assign(
            {},
            {
                ...this.options,
                ...this.$route.query,
                keywords: this.$route.query.query,
            }
        );
    },
};
</script>
