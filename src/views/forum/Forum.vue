<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title>
                    <span class="secondary--text font-weight-bold">
                        Forum Topics</span
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        depressed
                        color="secondary"
                        class="text-capitalize"
                        :to="{
                            name: 'forum/topic-editor',
                            params: { operation: 'create' },
                        }"
                        >Start
                        <span class="mx-1 text-lowercase">a</span>
                        Topic</v-btn
                    >
                </v-card-title>

                <v-card-text>
                    <v-row dense>
                        <template v-for="(topic, index) in topic.items">
                            <v-col cols="12" :key="index">
                                <topic-preview
                                    :topicID="topic.id"
                                    :name="topic.name"
                                    :section="topic.section"
                                    :user="topic.user"
                                    :created-at="topic.created_at"
                                    :comments-count="topic.comments_count"
                                    :slug="topic.slug"
                                    :updated-at="topic.updated_at"
                                    :index="index"
                                ></topic-preview>
                            </v-col>
                        </template>
                    </v-row>
                    <v-row dense v-if="topic.loading">
                        <template v-for="i in 20">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>
                    <base-infinite-scroll
                        :action="getTopics"
                        :identifier="infiniteId"
                    ></base-infinite-scroll>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import TopicPreview from '@/components/custom/preview/Topic';
import { GET_TOPICS } from '@/store/types/topic';
import pageMixin from '@/mixins/page';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';
export default {
    name: 'Home',

    mixins: [pageMixin],

    components: { BaseInfiniteScroll, TopicPreview },

    data() {
        return {
            topic: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                filterBy: 'item_for_sale',
                sortBy: 'updated_at',
                orderBy: 'desc',
            },
            infiniteId: +new Date(),
        };
    },

    methods: {
        async getTopics($state) {
            const { page, perPage, filterBy, sortBy, orderBy } = this.topic;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
            };
            this.topic.loading = true;
            const topics = await this.$store.dispatch(GET_TOPICS, payload);
            if (topics.length === perPage) {
                this.topic.page += 1;
                this.topic.loading = false;
                this.topic.items = [...this.topic.items, ...topics];
                $state.loaded();
                return;
            }
            this.topic.items = [...this.topic.items, ...topics];
            this.topic.loading = false;
            $state.complete();
        },
    },
};
</script>
