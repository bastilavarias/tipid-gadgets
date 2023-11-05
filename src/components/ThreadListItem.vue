<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ThreadInformation } from '@/types/thread';
import dateMixin from '@/mixins/date';
import { DELETE_THREAD } from '@/store/modules/thread';
@Component
export default class ThreadListItem extends Vue {
    @Prop(Number) readonly inheritedIndex: number | undefined;
    @Prop(Object) readonly thread: ThreadInformation | undefined;
    @Prop(Boolean) readonly allowAuthorActions: boolean | undefined;

    isActionStart = false;

    get date() {
        return dateMixin.toPostDate(String(this.thread?.created_at));
    }

    async toEditPage() {
        const queries: any = {
            action: 'edit',
            slug: this.thread?.slug,
        };
        await this.$router.push({
            name: 'Thread Action View',
            query: { ...queries },
        });
    }

    onOpenModal() {
        this.$bvModal.show(`delete-thread-${this.thread?.id}-modal`);
    }

    onCloseModal() {
        this.$bvModal.hide(`delete-thread-${this.thread?.id}-modal`);
    }

    async onDelete() {
        this.isActionStart = true;
        const result = await this.$store.dispatch(
            DELETE_THREAD,
            this.thread?.id
        );
        if (result.success) {
            this.onCloseModal();
            this.isActionStart = false;
            this.$bvToast.toast('Thread was successfully deleted.', {
                title: 'Thread Topics',
                variant: 'success',
                solid: true,
            });
            this.$emit('onRefresh');

            return;
        }
        this.isActionStart = false;
    }
}
</script>

<template>
    <b-list-group-item
        class="flex-column align-items-start border-0"
        :style="{
            backgroundColor: inheritedIndex % 2 === 0 ? 'white' : '#f8f9fa',
        }"
    >
        <div class="d-flex w-100 justify-content-between text-truncate">
            <router-link
                :to="{
                    name: 'Thread View',
                    params: { threadSlug: thread.slug },
                }"
            >
                <span class="h6 mb-1 text-primary font-weight-bold">
                    {{ thread.name }}
                </span>
            </router-link>
            <small>{{ date }}</small>
        </div>

        <span>
            <router-link
                :to="{
                    name: 'Search View',
                    query: {
                        search_type: 'forum_topics',
                        thread_section_id: this.thread.section.id,
                    },
                }"
            >
                <span class="h6 mb-1 text-primary">
                    {{ thread.section.name }}
                </span>
            </router-link>
            —
            <span class="text-black-50"
                >{{ thread.comments_count }} comments</span
            ></span
        >
        <div class="d-flex justify-content-end" v-if="allowAuthorActions">
            <div class="d-flex align-content-center">
                <b-btn variant="transparent" @click="toEditPage">
                    <b-icon icon="pencil-fill" variant="primary"></b-icon>
                </b-btn>

                <b-btn variant="transparent" @click="onOpenModal">
                    <b-icon icon="trash-fill" variant="primary"></b-icon>
                </b-btn>
            </div>
        </div>
        <b-modal :id="`delete-thread-${thread.id}-modal`" title="Delete Thread">
            Are you sure that you want to receive this thread
            {{ thread.name }}?
            <template #modal-footer>
                <b-button
                    variant="primary"
                    class="text-white"
                    @click="onDelete"
                >
                    <b-spinner
                        small
                        label="Loading..."
                        v-if="isActionStart"
                    ></b-spinner
                    ><span v-else>Delete</span></b-button
                >
            </template>
        </b-modal>
    </b-list-group-item>
</template>
