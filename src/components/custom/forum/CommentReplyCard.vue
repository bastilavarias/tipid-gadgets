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
    </v-card>
</template>

<script>
import BaseTextEditor from '@/components/base/TextEditor';
import { POST_TOPIC_COMMENT, SAVE_DRAFT_TOPIC } from '@/store/types/topic';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';
export default {
    name: 'forum-comment-card',

    components: { BaseTextEditor },

    mixins: [utilityMixin],

    props: {
        topicID: Number,
    },

    data() {
        return {
            content: '',
            isCommentStart: false,
            error: null,
        };
    },

    methods: {
        async comment() {
            const payload = {
                content: this.content.trim() || null,
                topic_id: this.topicID,
            };
            this.isCommentStart = true;
            const { code, message } = await this.$store.dispatch(
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
                this.$nextTick(() => {
                    // this.$vuetify.goTo(0);
                });
                return;
            }
            this.error = message;
            this.isCommentStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.error);
            });
        },
    },
};
</script>
