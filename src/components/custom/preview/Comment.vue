<template>
    <v-card outlined>
        <v-list-item three-line>
            <v-list-item-avatar v-if="user.avatar">
                <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title
                    class="primary--text font-weight-bold pointer"
                    @click="goToUser(user.username)"
                    >{{ user.username }}</v-list-item-title
                >
                <v-list-item-subtitle
                    >Commented {{ toPostDate(createdAt) }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                    ><span v-if="user.location">
                        Location:
                        <span class="font-weight-bold secondary--text">{{
                            user.location
                        }}</span>
                    </span>
                    <span class="grey--text" v-else>
                        No location included
                    </span></v-list-item-subtitle
                >
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            <v-col cols="12" v-if="replyTo">
                <v-card outlined>
                    <v-card-subtitle>Replying to this comment</v-card-subtitle>
                    <v-list-item three-line>
                        <v-list-item-avatar v-if="replyTo.comment.user.avatar">
                            <v-img :src="replyTo.comment.user.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="primary--text font-weight-bold pointer"
                                @click="goToUser(replyTo.comment.user.username)"
                                >{{
                                    replyTo.comment.user.username
                                }}</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Commented
                                {{
                                    toPostDate(replyTo.comment.created_at)
                                }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle
                                ><span v-if="user.location">
                                    Location:
                                    <span
                                        class="font-weight-bold secondary--text"
                                        >{{
                                            replyTo.comment.user.location
                                        }}</span
                                    >
                                </span>
                                <span class="grey--text" v-else>
                                    No location included
                                </span></v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>

                    <v-card-text v-html="replyTo.comment.content"></v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12">
                <div class="black--text" v-html="content"></div>
            </v-col>

            <v-col cols="12" v-if="shouldShowReplyEditor">
                <v-row dense>
                    <v-col ref="error" cols="12" v-if="error">
                        <v-alert border="right" type="error" elevation="2">
                            {{ error }}
                        </v-alert></v-col
                    >

                    <v-col cols="12">
                        <span class="subtitle-2">Reply</span>
                    </v-col>

                    <v-col cols="12">
                        <base-text-editor
                            v-model="replyContent"
                        ></base-text-editor>
                    </v-col>
                </v-row>
            </v-col>
        </v-card-text>

        <v-card-actions v-if="shouldShowReplyEditor">
            <v-spacer></v-spacer>
            <v-btn
                color="secondary"
                depressed
                class="text-capitalize mr-1"
                @click="shouldShowReplyEditor = false"
                >Cancel</v-btn
            >
            <v-btn
                color="primary"
                depressed
                class="text-capitalize"
                :disabled="!replyContent"
                :loading="isReplyStart"
                @click="reply"
                >Reply</v-btn
            >
        </v-card-actions>

        <v-card-actions v-else>
            <v-spacer> </v-spacer>
            <v-tooltip bottom v-if="isAuthenticated">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        small
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="shouldShowReplyEditor = true"
                        ><v-icon small>mdi-reply</v-icon></v-btn
                    >
                </template>
                <span>Reply</span>
            </v-tooltip>
        </v-card-actions>
    </v-card>
</template>

<script>
import BaseTextEditor from '@/components/base/TextEditor';
import dateMixin from '@/mixins/date';
import { POST_TOPIC_COMMENT } from '@/store/types/topic';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';
import redirectionMixin from '@/mixins/redirection';
export default {
    name: 'comment-preview',

    mixins: [dateMixin, utilityMixin, redirectionMixin],

    components: { BaseTextEditor },

    props: {
        topicID: Number,
        commentID: Number,
        user: Object,
        content: String,
        createdAt: String,
        comments: Array,
        replyTo: [Object, null],
    },

    data() {
        return {
            replyContent: '',
            shouldShowReplyEditor: false,
            isReplyStart: false,
            error: null,
            commentsLocal: [...this.comments],
        };
    },

    watch: {
        comments(val) {
            this.commentsLocal = val;
        },

        commentsLocal(val) {
            this.$emit('update:comments', val);
        },
    },

    methods: {
        async reply() {
            const payload = {
                content: this.replyContent.trim() || null,
                topic_id: this.topicID,
                comment_id: this.commentID || null,
            };
            this.isReplyStart = true;
            const { code, message, data } = await this.$store.dispatch(
                POST_TOPIC_COMMENT,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });

                this.shouldShowReplyEditor = false;
                this.replyContent = '';
                this.error = null;
                this.isReplyStart = false;
                this.commentsLocal = [data, ...this.commentsLocal];
                this.$nextTick(() => {
                    this.$vuetify.goTo(`#comment_${data.id}`);
                });
                return;
            }
            this.error = message;
            this.isReplyStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.error);
            });
        },
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },
    },
};
</script>
