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
                        <template v-for="(topic, index) in topics.items">
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
export default {
    name: 'Home',

    components: { TopicPreview },

    data() {
        return {
            topics: {
                loading: false,
                items: [],
                page: 1,
                perPage: 20,
                filterBy: 'item_for_sale',
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            shouldEnableLoading: false,
        };
    },

    methods: {
        async getTopics() {
            const { page, perPage, filterBy, sortBy, orderBy } = this.topics;
            const payload = {
                page,
                perPage,
                filterBy,
                sortBy,
                orderBy,
            };
            if (this.shouldEnableLoading) this.topics.loading = true;
            this.topics.items = await this.$store.dispatch(GET_TOPICS, payload);
            this.topics.loading = false;
        },
    },

    async created() {
        await this.getTopics();
    },

    async beforeRouteEnter(to, from, next) {
        const routeNames = ['view-topic'];
        if (routeNames.includes(from)) this.shouldEnableLoading = true;
        next();
    },
};
</script>
