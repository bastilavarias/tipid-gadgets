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
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import TopicPreview from '@/components/custom/preview/Topic';
import { GET_TOPICS } from '@/store/types/topic';
import pageMixin from '@/mixins/page';
export default {
    name: 'Home',

    mixins: [pageMixin],

    components: { TopicPreview },

    data() {
        return {
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

    methods: {
        async getTopics() {
            const { page, perPage, filterBy, sortBy, orderBy } = this.topic;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
            };
            this.topic.loading = true;
            this.topic.items = await this.$store.dispatch(GET_TOPICS, payload);
            this.topic.loading = false;
        },
    },

    async created() {
        await this.getTopics();
    },
};
</script>
