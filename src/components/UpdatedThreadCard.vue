<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { GET_THREADS } from '@/store/modules/thread';
import BaseContentCard from '@/components/BaseContentCard.vue';
@Component({
    components: { BaseContentCard },
})
export default class UpdatedThreadCard extends Vue {
    thread = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        sortBy: 'updated_at',
        orderBy: 'desc',
        total: 0,
    };

    get hasData() {
        return !this.thread.loading && this.thread.items.length > 0;
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
    }
}
</script>

<template>
    <base-content-card
        title="Updated Forum Topics
"
    >
        <b-list-group class="mb-3" v-if="hasData">
            <template v-for="(thread, index) in thread.items">
                <b-list-group-item
                    class="text-primary"
                    :to="{
                        name: 'Thread View',
                        params: { threadSlug: thread.slug },
                    }"
                    :key="index"
                >
                    {{ thread.name }}
                </b-list-group-item>
            </template>
        </b-list-group>

        <div class="text-center py-4" v-else>
            <span class="text-black-50">No data.</span>
        </div>
    </base-content-card>
</template>
