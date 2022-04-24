<template>
    <v-row dense>
        <v-col cols="12" v-if="information">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Forum Topic</v-card-title
                >
                <v-card-subtitle class="primary--text"
                    >Section: {{ information.section.name }}</v-card-subtitle
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
                                class="text-decoration-underline primary--text"
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

        <v-col cols="12">
            <forum-comment-reply-card></forum-comment-reply-card>
        </v-col>

        <v-col cols="12">
            <forum-comment-list-card></forum-comment-list-card>
        </v-col>
    </v-row>
</template>

<script>
import RatingStatusChip from '@/components/custom/RatingStatusChip';
import ForumCommentReplyCard from '@/components/custom/forum/CommentReplyCard';
import ForumCommentListCard from '@/components/custom/forum/CommentListCard';
import utilityMixin from '@/mixins/utility';
import { VIEW_TOPIC, GET_TOPIC } from '@/store/types/topic';
import dateMixin from '@/mixins/date';
import TopicAuthorCard from '@/components/custom/forum/AuthorCard';
import PostInsightCard from '@/components/custom/PostInsightCard';

export default {
    components: {
        PostInsightCard,
        TopicAuthorCard,
        ForumCommentListCard,
        ForumCommentReplyCard,
        RatingStatusChip,
    },

    mixins: [utilityMixin, dateMixin],

    data() {
        return {
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
    },

    methods: {
        async getInformation() {
            this.information = await this.$store.dispatch(GET_TOPIC, this.slug);
            this.$nextTick(() => {
                this.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
            });
        },
    },

    async created() {
        if (!this.slug) return this.$router.go(-1);
        await this.getInformation();
    },
};
</script>
