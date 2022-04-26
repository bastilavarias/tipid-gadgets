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

                <v-card-subtitle class="primary--text"
                    ><span class="font-weight-bold">{{ title }}</span>
                    <span v-if="query"> : {{ options.keywords }} </span>
                </v-card-subtitle>

                <v-card-text>
                    <template v-if="mode.itemsForSale">
                        <v-row dense v-if="itemForSale.loading">
                            <template v-for="i in 10">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <v-row dense v-else>
                            <template
                                v-for="(item, index) in itemForSale.items"
                            >
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
                    </template>

                    <template v-if="mode.wantToBuys">
                        <v-row dense v-if="wantToBuy.loading">
                            <template v-for="i in 10">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
                        <v-row dense v-else>
                            <template v-for="(item, index) in wantToBuy.items">
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
                    </template>

                    <template v-if="mode.forumTopics">
                        <v-row dense v-if="forumTopic.loading">
                            <template v-for="i in 20">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
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
                                        :index="index"
                                    ></topic-preview>
                                </v-col>
                            </template>
                        </v-row>
                    </template>

                    <template v-if="mode.members">
                        <v-row dense v-if="member.loading">
                            <template v-for="i in 20">
                                <v-col cols="12" :key="i">
                                    <v-skeleton-loader
                                        type="list-item-two-line"
                                    >
                                    </v-skeleton-loader>
                                </v-col>
                            </template>
                        </v-row>
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
                    </template>
                </v-card-text>
            </v-card>
        </v-col>

        <search-option-dialog
            :is-open.sync="isOptionDialogOpen"
        ></search-option-dialog>
    </v-row>
</template>

<script>
import SearchOptionDialog from '@/components/custom/search/OptionDialog';
import { GET_ITEMS } from '@/store/types/item';
import ItemPreview from '@/components/custom/preview/Item';
import { GET_SEARCH_TYPES } from '@/store/types/reference';
import { GET_TOPICS } from '@/store/types/topic';
import TopicPreview from '@/components/custom/preview/Topic';
import { GET_USERS } from '@/store/types/user';
import UserPreview from '@/components/custom/preview/User';

export default {
    components: { UserPreview, TopicPreview, ItemPreview, SearchOptionDialog },

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
                perPage: 20,
                filterBy: 'item_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            wantToBuy: {
                loading: false,
                items: [],
                page: 1,
                perPage: 20,
                filterBy: 'want_to_buy',
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            forumTopic: {
                loading: false,
                items: [],
                page: 1,
                perPage: 20,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            member: {
                loading: false,
                items: [],
                page: 1,
                perPage: 20,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
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
    },

    watch: {
        async type(val) {
            this.options = Object.assign(
                {},
                {
                    ...this.options,
                    type: val,
                }
            );
            await this.search();
        },

        async query(val) {
            this.options = Object.assign(
                {},
                {
                    ...this.options,
                    keywords: val,
                }
            );
            await this.search();
        },
    },

    methods: {
        async search() {
            const {
                type,
                keywords,
                sectionID,
                categoryID,
                conditionID,
                warrantyID,
                minimumPrice,
                maximumPrice,
                sortBy,
                orderBy,
                location,
            } = this.options;
            if (type === 'items_for_sale') {
                const payload = {
                    page: 1,
                    perPage: 20,
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
                this.itemForSale.items = await this.$store.dispatch(
                    GET_ITEMS,
                    payload
                );
                this.itemForSale.loading = false;
            }
            if (type === 'want_to_buys') {
                const payload = {
                    page: 1,
                    perPage: 20,
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
                this.wantToBuy.items = await this.$store.dispatch(
                    GET_ITEMS,
                    payload
                );
                this.wantToBuy.loading = false;
            } else if (type === 'forum_topics') {
                const payload = {
                    page: 1,
                    perPage: 20,
                    sectionID,
                    sortBy,
                    orderBy: orderBy,
                    search: keywords,
                };
                this.forumTopic.loading = true;
                this.forumTopic.items = await this.$store.dispatch(
                    GET_TOPICS,
                    payload
                );
                this.forumTopic.loading = false;
            } else if (type === 'members') {
                const payload = {
                    page: 1,
                    perPage: 20,
                    location,
                    sortBy,
                    orderBy: orderBy,
                    search: keywords,
                };
                this.member.loading = true;
                this.member.items = await this.$store.dispatch(
                    GET_USERS,
                    payload
                );
                this.member.loading = false;
            }

            await this.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
        },
    },

    async created() {
        const { query, type } = this.$route.query;
        this.types = await this.$store.dispatch(GET_SEARCH_TYPES);
        if (!query && !type) return this.$router.go(-1);
        this.options = Object.assign(
            {},
            {
                ...this.options,
                type,
                keywords: query,
            }
        );
        await this.search();
    },
};
</script>
