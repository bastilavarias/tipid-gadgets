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
                            @click="comments.orderBy = order.slug"
                            >{{ order.name }}</v-list-item-title
                        >
                    </v-list-item>
                </v-list>
            </v-menu></v-card-subtitle
        >

        <v-card-text>
            <v-row dense v-if="comments.loading">
                <template v-for="i in 5">
                    <v-col cols="12" :key="i">
                        <v-skeleton-loader type="list-item-three-line">
                        </v-skeleton-loader>
                    </v-col>
                </template>
            </v-row>
            <v-row dense v-else>
                <template v-for="(comment, index) in comments.items">
                    <v-col cols="12" :key="index" :id="`comment_${comment.id}`">
                        <v-card outlined>
                            <v-list-item three-line>
                                <v-list-item-avatar v-if="comment.user.avatar">
                                    <v-img :src="comment.user.avatar"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="primary--text font-weight-bold"
                                        >{{
                                            comment.user.username
                                        }}</v-list-item-title
                                    >
                                    <v-list-item-subtitle
                                        >Commented
                                        {{
                                            toPostDate(comment.created_at)
                                        }}</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle
                                        ><span v-if="comment.user.location">
                                            Location:
                                            <span
                                                class="font-weight-bold secondary--text"
                                                >{{
                                                    comment.user.location
                                                }}</span
                                            >
                                        </span>
                                        <span class="grey--text" v-else>
                                            No location included
                                        </span></v-list-item-subtitle
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-card-text
                                class="black--text"
                                v-html="comment.content"
                            >
                            </v-card-text>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
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
export default {
    name: 'forum-comment-card',

    components: { BaseTextEditor },

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
                perPage: 10,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            commentsCount: 0,
        };
    },

    computed: {
        orderTypes() {
            return [
                {
                    name: 'Newest',
                    slug: 'asc',
                },

                {
                    name: 'Oldest',
                    slug: 'desc',
                },
            ];
        },
    },

    watch: {
        async 'comments.orderBy'(val) {
            if (val) {
                this.comments.page = 1;
                this.comments.orderBy = val;
                await this.getComments();
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

        async getComments() {
            const { page, perPage, sortBy, orderBy } = this.comments;
            const payload = {
                page,
                perPage,
                topicID: this.topicID,
                sortBy,
                orderBy,
            };
            this.comments.loading = true;
            this.comments.items = await this.$store.dispatch(
                GET_TOPIC_COMMENTS,
                payload
            );
            this.comments.loading = false;
        },

        async getCommentsCount() {
            this.commentsCount = await this.$store.dispatch(
                COUNT_TOPIC_COMMENT,
                this.topicID
            );
        },
    },

    async created() {
        await this.getComments();
        await this.getCommentsCount();
    },
};
</script>
