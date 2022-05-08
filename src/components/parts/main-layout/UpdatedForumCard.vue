<template>
    <v-card flat>
        <v-card-title class="secondary caption font-weight-medium white--text">
            Updated Forum Topics
        </v-card-title>

        <v-card outlined tile>
            <v-card-text style="max-height: 22rem; overflow: auto">
                <div
                    class="fill-height d-flex justify-center align-center"
                    v-if="!topic.loading && topic.items.length === 0"
                >
                    <span class="caption font-italic"
                        >No updated forum topics.</span
                    >
                </div>

                <v-row dense v-else>
                    <template v-for="(topic, index) in topic.items">
                        <v-col cols="12" :key="index">
                            <router-link
                                :to="{
                                    name: 'view-topic',
                                    params: { slug: topic.slug },
                                }"
                            >
                                <span
                                    class="subtitle-2 primary--text text-decoration-underline pointer"
                                    >{{ topic.name }}</span
                                >
                            </router-link>
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script>
import { GET_TOPICS } from '@/store/types/topic';

export default {
    name: 'main-layout-updated-forum-card',

    data() {
        return {
            topic: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
                sortBy: 'updated_at',
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
