<template>
    <v-card flat color="transparent">
        <v-card-subtitle>Comment</v-card-subtitle>

        <v-card-text>
            <v-row>
                <v-col ref="error" cols="12" v-if="error">
                    <v-alert border="right" type="error" elevation="2">
                        {{ error }}
                    </v-alert></v-col
                >

                <v-col cols="12">
                    <base-text-editor v-model="content"></base-text-editor>
                </v-col>

                <v-col cols="12">
                    <div class="d-flex justify-space-between">
                        <v-spacer></v-spacer>
                        <v-btn
                            depressed
                            color="secondary"
                            class="text-capitalize"
                            :disabled="!content"
                            :loading="isCommentStart"
                            @click="comment"
                            >Post</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-subtitle class="d-flex justify-space-between align-center"
            ><span
                >Comments
                <span v-if="commentsCount">({{ commentsCount }})</span></span
            >
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="secondary"
                        class="text-capitalize"
                        small
                        depressed
                        v-bind="attrs"
                        v-on="on"
                    >
                        {{
                            `Sort by ${
                                orderTypes.find(
                                    (type) => type.slug === comments.orderBy
                                ).name
                            }` || 'Sort By'
                        }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        dense
                        v-for="(order, index) in orderTypes"
                        :key="index"
                    >
                        <v-list-item-title
                            class="pointer"
                            @click="sortComments(order)"
                            >{{ order.name }}</v-list-item-title
                        >
                    </v-list-item>
                </v-list>
            </v-menu></v-card-subtitle
        >

        <v-card-text>
            <v-row dense>
                <template v-for="(comment, index) in comments.items">
                    <v-col cols="12" :key="index" :id="`comment_${comment.id}`">
                        <comment-preview
                            :topicID="topicID"
                            :commentID="comment.id"
                            :user="comment.user"
                            :created-at="comment.created_at"
                            :content="comment.content"
                            :comments.sync="comments.items"
                            :reply-to="comment.reply_to"
                        ></comment-preview>
                    </v-col>
                </template>
            </v-row>
            <v-row dense v-if="comments.loading">
                <template v-for="i in comments.perPage">
                    <v-col cols="12" :key="i">
                        <v-skeleton-loader type="list-item-three-line">
                        </v-skeleton-loader>
                    </v-col>
                </template>
            </v-row>

            <base-infinite-scroll
                :action="getComments"
                :identifier="infiniteId"
            ></base-infinite-scroll>
        </v-card-text>
    </v-card>
</template>

<script>
import BaseTextEditor from '@/components/base/TextEditor';
import {
    COUNT_TOPIC_COMMENT,
    GET_TOPIC_COMMENTS,
    POST_TOPIC_COMMENT,
} from '@/store/types/topic';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';
import dateMixin from '@/mixins/date';
import CommentPreview from '@/components/custom/preview/Comment';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';
export default {
    name: 'forum-comment-card',

    components: { BaseInfiniteScroll, CommentPreview, BaseTextEditor },

    mixins: [utilityMixin, dateMixin],

    props: {
        topicID: Number,
    },

    data() {
        return {
            content: '',
            isCommentStart: false,
            error: null,
            comments: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            commentsCount: 0,
            shouldShowReplyEditor: false,
            replyContent: '',
            infiniteId: +new Date(),
        };
    },

    computed: {
        orderTypes() {
            return [
                {
                    name: 'Newest',
                    slug: 'desc',
                },

                {
                    name: 'Oldest',
                    slug: 'asc',
                },
            ];
        },
    },

    watch: {
        async topicID(val) {
            if (val) {
                this.comments.page = 1;
                this.comments.items = [];
                this.infiniteId += 1;
            }
        },

        async 'comments.orderBy'(val) {
            if (val) {
                this.comments.page = 1;
                this.comments.items = [];
                this.infiniteId += 1;
            }
        },
    },

    methods: {
        async comment() {
            const payload = {
                content: this.content.trim() || null,
                topic_id: this.topicID,
            };
            this.isCommentStart = true;
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

                this.content = '';
                this.error = null;
                this.isCommentStart = false;
                this.comments.items = [data, ...this.comments.items];
                this.$nextTick(() => {
                    this.$vuetify.goTo(`#comment_${data.id}`);
                });
                return;
            }
            this.error = message;
            this.isCommentStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.error);
            });
        },

        async getComments($state) {
            const { page, perPage, sortBy, orderBy } = this.comments;
            const payload = {
                page,
                perPage,
                topicID: this.topicID,
                sortBy,
                orderBy,
            };
            this.comments.loading = true;
            const comments = await this.$store.dispatch(
                GET_TOPIC_COMMENTS,
                payload
            );
            if (comments.length === perPage) {
                this.comments.page += 1;
                this.comments.loading = false;
                this.comments.items = [...this.comments.items, ...comments];
                $state.loaded();
                return;
            }
            this.comments.items = [...this.comments.items, ...comments];
            this.comments.loading = false;
            $state.complete();
        },

        async getCommentsCount() {
            this.commentsCount = await this.$store.dispatch(
                COUNT_TOPIC_COMMENT,
                this.topicID
            );
        },

        sortComments(type) {
            this.comments.orderBy = type.slug;
        },
    },

    async created() {
        await this.getCommentsCount();
    },
};
</script>
