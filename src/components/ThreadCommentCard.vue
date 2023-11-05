<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ThreadCommentItem from '@/components/ThreadCommentItem.vue';
import authenticationModule from '@/store/modules/authentication';
import { UserInformation } from '@/types/user';
import { ThreadInformation } from '@/types/thread';
import BaseRichTextEditor from '@/components/BaseRichTextEditor.vue';
import {
    GET_THREAD_COMMENTS,
    THREAD_CREATE_COMMENT,
} from '@/store/modules/thread';

@Component({
    components: { BaseRichTextEditor, ThreadCommentItem },
})
export default class ThreadCommentCard extends Vue {
    @Prop(Object) readonly thread: ThreadInformation | undefined;

    comment = null;
    isCommentStart = false;
    error = null;
    comments = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    shouldBootPage = false;

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isAuthenticated() {
        return authenticationModule.state.isAuthenticated;
    }

    get isFormValid() {
        return !!this.comment;
    }

    get shouldShowPaginationComponent() {
        return this.shouldBootPage && this.comments.items.length > 0;
    }

    @Watch('comments.page')
    async onCommentsPageChange() {
        await this.getComments();
    }

    async postComment() {
        if (this.isAuthenticated) {
            const payload = {
                topic_id: this.thread?.id,
                content: this.comment,
            };
            this.isCommentStart = true;
            const result = await this.$store.dispatch(
                THREAD_CREATE_COMMENT,
                payload
            );
            if (result.success) {
                this.comment = null;
                this.isCommentStart = false;
                this.error = null;
                await this.getComments();
                this.$bvToast.toast('Comment was successfully posted.', {
                    title: 'Thread Topic',
                    variant: 'success',
                    solid: true,
                });
                return;
            }
            this.error = result.error;
            this.isCommentStart = false;
        }
    }

    async getComments() {
        const { page, perPage, sortBy, orderBy } = this.comments;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
            threadID: this.thread?.id,
        };
        this.comments.loading = true;
        const result = await this.$store.dispatch(GET_THREAD_COMMENTS, payload);
        this.comments.items = result.data.data;
        this.comments.total = result.data.pagination.total;
        this.comments.loading = false;
    }

    async created() {
        await this.getComments();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <div>
        <div class="mb-3" v-if="isAuthenticated">
            <div>
                <p class="text-black-50">Comment as {{ user.username }}</p>
            </div>
            <b-form>
                <b-alert show variant="danger" v-if="error">{{
                    error
                }}</b-alert>
                <b-form-checkbox-group class="mb-3">
                    <base-rich-text-editor
                        v-model="comment"
                    ></base-rich-text-editor>
                </b-form-checkbox-group>

                <div class="d-flex justify-content-end">
                    <b-button
                        variant="primary"
                        class="text-white"
                        :disabled="isCommentStart || !isFormValid"
                        @click="postComment"
                    >
                        <b-spinner
                            small
                            label="Loading..."
                            v-if="isCommentStart"
                        ></b-spinner
                        ><span v-else>Post</span>
                    </b-button>
                </div>
            </b-form>
        </div>
        <div class="mb-3">
            <div>
                <p class="text-black-50" v-if="comments.total > 0">
                    Comments
                    <span>({{ comments.total }})</span>
                </p>
            </div>
            <template v-for="(comment, index) in comments.items">
                <div :key="index">
                    <thread-comment-item
                        :comment="comment"
                    ></thread-comment-item>
                    <div class="mb-3"></div>
                </div>
            </template>
        </div>
        <div
            class="d-flex justify-content-center"
            v-if="shouldShowPaginationComponent"
        >
            <b-pagination
                :total-rows="comments.total"
                :per-page="comments.perPage"
                v-model="comments.page"
            ></b-pagination>
        </div>
    </div>
</template>
