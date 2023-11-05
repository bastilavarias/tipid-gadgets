<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import dateMixin from '@/mixins/date';
import authenticationModule from '@/store/modules/authentication';
import { UserInformation } from '@/types/user';
import { ThreadInformation } from '@/types/thread';
import {
    BOOKMARK_THREAD,
    LIKE_THREAD,
    THREAD_CHECK_BOOKMARK,
    THREAD_CHECK_LIKE,
    THREAD_COUNT_LIKE,
} from '@/store/modules/thread';

@Component
export default class ThreadUserCard extends Vue {
    @Prop(Object) readonly thread: ThreadInformation | undefined;

    shouldBootActionComponent = false;
    isLiked = false;
    likeCounts = 0;
    isLikeStart = false;
    isBookmarked = false;
    isBookmarkStart = false;

    get date() {
        return dateMixin.toPostDate(String(this.thread?.created_at));
    }

    get isAuthenticated() {
        return authenticationModule.state.isAuthenticated;
    }

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isPublicViewer() {
        return this.user === null;
    }

    get isAuthor() {
        if (this.user === null) {
            return false;
        }
        return this.thread?.user.id === this.user?.id;
    }

    async checkLike() {
        const result = await this.$store.dispatch(
            THREAD_CHECK_LIKE,
            this.thread?.id
        );
        if (result.success) {
            this.isLiked = result.data;
        }
    }

    async checkBookmark() {
        const result = await this.$store.dispatch(
            THREAD_CHECK_BOOKMARK,
            this.thread?.id
        );
        if (result.success) {
            this.isBookmarked = result.data;
        }
    }

    async like() {
        const payload = {
            topic_id: this.thread?.id,
            user_id: this.user?.id,
        };
        this.isLikeStart = true;
        const result = await this.$store.dispatch(LIKE_THREAD, payload);
        if (result.success) {
            await this.checkLike();
            await this.getLikesCount();
            this.isLikeStart = false;
            this.$bvToast.toast(
                `You ${this.isLiked ? 'liked' : 'unliked'} this Item`,
                {
                    title: this.thread?.name,
                    variant: 'success',
                    solid: true,
                }
            );
            return;
        }
        this.isLikeStart = false;
    }

    async bookmark() {
        const payload = {
            topic_id: this.thread?.id,
            user_id: this.user?.id,
        };
        this.isBookmarkStart = true;
        const result = await this.$store.dispatch(BOOKMARK_THREAD, payload);
        if (result.success) {
            await this.checkBookmark();
            this.isBookmarkStart = false;
            this.$bvToast.toast(
                `You ${
                    this.isBookmarked ? 'bookmarked' : 'un-bookmarked'
                } this Item`,
                {
                    title: this.thread?.name,
                    variant: 'success',
                    solid: true,
                }
            );
            return;
        }
        this.isBookmarkStart = false;
    }

    async getLikesCount() {
        const result = await this.$store.dispatch(
            THREAD_COUNT_LIKE,
            this.thread?.id
        );
        if (result.success) {
            this.likeCounts = result.data;
        }
    }

    async created() {
        if (this.isAuthenticated) {
            await this.checkLike();
            await this.checkBookmark();
            await this.getLikesCount();
            this.shouldBootActionComponent = true;
        }
    }
}
</script>

<template>
    <b-card style="background-color: #f0f0f0" no-body>
        <div class="p-2">
            <div>
                Posted by
                <router-link
                    :to="{
                        name: 'User Public Profile View',
                        params: { username: thread.user.username },
                    }"
                >
                    <span class="text-primary">
                        {{ thread.user.username }}
                    </span>
                </router-link>
                on {{ date }}
            </div>
            <div>
                <div>
                    Location:
                    <span class="font-weight-bold">{{
                        thread.user.location
                    }}</span>
                    Contact Number:
                    <span class="font-weight-bold">{{
                        thread.user.contact_number
                    }}</span>
                </div>
            </div>
            <div
                class="d-flex justify-content-end align-content-center"
                v-if="
                    (isPublicViewer || !isAuthor) && shouldBootActionComponent
                "
            >
                <div class="d-flex align-content-center">
                    <b-btn
                        variant="transparent"
                        @click="like"
                        :disabled="isLikeStart"
                    >
                        <b-icon
                            icon="hand-thumbs-up-fill"
                            variant="primary"
                            v-if="isLiked"
                        ></b-icon>
                        <b-icon
                            icon="hand-thumbs-up"
                            variant="primary"
                            v-else
                        ></b-icon>
                        <span class="text-black-50">({{ likeCounts }})</span>
                    </b-btn>

                    <b-btn
                        variant="transparent"
                        @click="bookmark"
                        :disabled="isBookmarkStart"
                    >
                        <b-icon
                            icon="bookmark-fill"
                            variant="primary"
                            v-if="isBookmarked"
                        ></b-icon>
                        <b-icon
                            icon="bookmark"
                            variant="primary"
                            v-else
                        ></b-icon>
                    </b-btn>
                </div>
            </div>
        </div>
    </b-card>
</template>
