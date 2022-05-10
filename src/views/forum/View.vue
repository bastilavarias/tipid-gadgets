<template>
    <v-row dense>
        <v-col cols="12" v-if="shouldBootComponent">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Forum Topic</v-card-title
                >
                <v-card-subtitle class="primary--text"
                    >Section:
                    <router-link
                        style="text-decoration: none"
                        :to="{
                            name: 'search',
                            query: {
                                type: 'forum_topics',
                                sectionID: information.section.id,
                            },
                        }"
                    >
                        {{ information.section.name }}
                    </router-link></v-card-subtitle
                >

                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title
                            class="primary--text font-weight-bold"
                            >{{ information.name }}</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >Posted by
                            <span
                                class="text-decoration-underline primary--text pointer"
                                @click="goToUser(information.user.username)"
                                >{{ information.user.username }}</span
                            >
                            {{
                                toPostDate(information.created_at)
                            }}</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>

                <v-card-text
                    class="secondary--text"
                    v-html="information.description.content"
                >
                </v-card-text>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" v-if="isPoster">
                            <post-insight-card
                                :id="information.id"
                                type="topic"
                            ></post-insight-card>
                        </v-col>

                        <v-col cols="12">
                            <topic-author-card
                                :topicID="information.id"
                                :avatar="information.user.avatar"
                                :username="information.user.username"
                                :created-at="information.created_at"
                                :location="information.user.location"
                            ></topic-author-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" v-if="shouldBootComponent">
            <forum-comment-card :topicID="information.id"></forum-comment-card>
        </v-col>
    </v-row>
</template>

<script>
import RatingStatusChip from '@/components/custom/RatingStatusChip';
import utilityMixin from '@/mixins/utility';
import { VIEW_TOPIC, GET_TOPIC } from '@/store/types/topic';
import dateMixin from '@/mixins/date';
import TopicAuthorCard from '@/components/custom/forum/AuthorCard';
import PostInsightCard from '@/components/custom/PostInsightCard';
import ForumCommentCard from '@/components/custom/forum/CommentCard';
import redirectionMixin from '@/mixins/redirection';

export default {
    components: {
        ForumCommentCard,
        PostInsightCard,
        TopicAuthorCard,
        RatingStatusChip,
    },

    mixins: [utilityMixin, dateMixin, redirectionMixin],

    data() {
        return {
            shouldBootComponent: false,
            information: null,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user || null;
        },

        slug() {
            return this.$route.params.slug || null;
        },

        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        isPoster() {
            if (!this.isAuthenticated || !this.information) return false;
            return this.information.user.id === this.user.id;
        },
    },

    watch: {
        async information(val) {
            if (val) {
                const payload = {
                    topic_id: this.information.id,
                    user_id: this.user.id || null,
                };
                await this.$store.dispatch(VIEW_TOPIC, payload);
            }
        },

        async '$route.params.slug'(val) {
            if (val) await this.getInformation();
        },
    },

    methods: {
        async getInformation() {
            this.shouldBootComponent = false;
            this.information = await this.$store.dispatch(GET_TOPIC, this.slug);
            this.$nextTick(() => {
                this.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
            });
            this.shouldBootComponent = true;
        },
    },

    async created() {
        if (!this.slug) return this.$router.go(-1);
        await this.getInformation();
    },
};
</script>
