<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { ThreadInformation } from '@/types/thread';
import { GET_THREAD, VIEW_THREAD } from '@/store/modules/thread';
import ThreadCommentCard from '@/components/ThreadCommentCard.vue';
import ThreadUserCard from '@/components/ThreadUserCard.vue';
import authenticationModule from '@/store/modules/authentication';
import { UserInformation } from '@/types/user';
import CustomPostInsightCard from '@/components/CustomPostInsightCard.vue';

@Component({
    components: {
        CustomPostInsightCard,
        ThreadUserCard,
        ThreadCommentCard,
        BaseContentCard,
    },
})
export default class ProductView extends Vue {
    thread: ThreadInformation | null = null;
    shouldBootPage = false;

    get slug() {
        return this.$route.params.threadSlug || null;
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
        return this.thread?.user.id === this.user?.id;
    }

    @Watch('slug')
    async onSlugChange(value: string) {
        if (value) {
            await this.getThread();
            await this.viewPost();
        }
    }

    async getThread() {
        const result = await this.$store.dispatch(GET_THREAD, this.slug);
        if (result.success) {
            this.thread = Object.assign({}, result.data);
            this.shouldBootPage = true;
        }
    }

    async viewPost() {
        const payload = {
            topic_id: this.thread?.id,
            user_id: this.user?.id,
        };
        await this.$store.dispatch(VIEW_THREAD, payload);
    }

    async created() {
        await this.getThread();
        await this.viewPost();
    }
}
</script>

<template>
    <base-content-card title="Thread Topic">
        <div class="d-flex flex-column" v-if="shouldBootPage">
            <div class="pt-2 mb-2">
                <router-link
                    :to="{
                        name: 'Search View',
                        query: {
                            search_type: 'forum_topics',
                            thread_section_id: this.thread.section.id,
                        },
                    }"
                >
                    <span class="text-primary">
                        {{ thread.section.name }}
                    </span>
                </router-link>
            </div>
            <div class="mb-3">
                <span class="h5 text-primary font-weight-bold">
                    {{ thread.name }}
                </span>
            </div>
            <div
                style="overflow: hidden"
                class="mb-3"
                v-html="thread.description.content"
            ></div>
            <div class="mb-3" v-if="isAuthor">
                <custom-post-insight-card
                    type="thread"
                    :id="thread.id"
                ></custom-post-insight-card>
            </div>

            <div class="mb-5" v-if="!isAuthor || isPublicViewer">
                <thread-user-card :thread="thread"></thread-user-card>
            </div>
            <thread-comment-card :thread="thread"></thread-comment-card>
        </div>
    </base-content-card>
</template>
