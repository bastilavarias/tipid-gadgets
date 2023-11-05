<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import ThreadListItem from '@/components/ThreadListItem.vue';
import { GET_THREADS } from '@/store/modules/thread';
@Component({
    components: { ThreadListItem, BaseContentCard },
})
export default class ForumView extends Vue {
    thread = {
        loading: false,
        items: [],
        page: 1,
        perPage: 20,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    shouldBootPage = false;

    get shouldShowPaginationComponent() {
        return this.shouldBootPage && this.thread.items.length > 0;
    }

    get hasData() {
        return !this.thread.loading && this.thread.items.length > 0;
    }

    @Watch('thread.page')
    async onThreadPageChange() {
        await this.getThreadTopics();
    }

    async getThreadTopics() {
        const { page, perPage, sortBy, orderBy } = this.thread;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
        };
        this.thread.loading = true;
        const result = await this.$store.dispatch(GET_THREADS, payload);
        this.thread.items = result.data.data;
        this.thread.total = result.data.pagination.total;
        this.thread.loading = false;
    }

    async created() {
        await this.getThreadTopics();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <section>
        <base-content-card title="TipidGadgets Forums">
            <b-list-group class="mb-3" v-if="hasData">
                <template v-for="(thread, index) in thread.items">
                    <thread-list-item
                        :inherited-index="index"
                        :thread="thread"
                        :key="index"
                    ></thread-list-item>
                </template>
            </b-list-group>

            <div class="text-center py-4" v-else>
                <span class="text-black-50">No data.</span>
            </div>

            <div
                class="d-flex justify-content-center"
                v-if="shouldShowPaginationComponent"
            >
                <b-pagination
                    :total-rows="thread.total"
                    :per-page="thread.perPage"
                    v-model="thread.page"
                ></b-pagination>
            </div>
        </base-content-card>
    </section>
</template>
