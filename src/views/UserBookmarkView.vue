<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { GET_PRODUCT_USER_BOOKMARKS } from '@/store/modules/product';
import ProductListItem from '@/components/ProductListItem.vue';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import { GET_THREAD_USER_BOOKMARKS } from '@/store/modules/thread';
import ThreadListItem from '@/components/ThreadListItem.vue';

@Component({
    components: { ThreadListItem, ProductListItem, BaseContentCard },
})
export default class UserBookmarkView extends Vue {
    productBookmark = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    threadBookmark = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    shouldBootPage = false;

    get user(): UserInformation | null {
        return authenticationModule.state.user;
    }

    get shouldShowWantToBuyPaginationComponent() {
        return this.shouldBootPage && this.productBookmark.items.length > 0;
    }

    get shouldShowThreadPaginationComponent() {
        return this.shouldBootPage && this.threadBookmark.items.length > 0;
    }

    get hasProductBookmarkData() {
        return (
            !this.productBookmark.loading &&
            this.productBookmark.items.length > 0
        );
    }

    get hasThreadBookmarkData() {
        return (
            !this.threadBookmark.loading && this.threadBookmark.items.length > 0
        );
    }

    @Watch('productBookmark.page')
    async onChangeProductBookmarkPage() {
        await this.getProductBookmarks();
    }

    @Watch('thread.page')
    async onChangeThreadPage() {
        await this.getThreadTopicBookmarks();
    }

    async getProductBookmarks() {
        const { page, perPage, sortBy, orderBy } = this.productBookmark;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.productBookmark.loading = true;
        const result = await this.$store.dispatch(
            GET_PRODUCT_USER_BOOKMARKS,
            payload
        );
        const products = result.data.data;
        this.productBookmark.items = products.filter((item: any) => item.item);
        this.productBookmark.total = result.data.pagination.total;
        this.productBookmark.loading = false;
    }

    async getThreadTopicBookmarks() {
        const { page, perPage, sortBy, orderBy } = this.threadBookmark;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.threadBookmark.loading = true;
        const result = await this.$store.dispatch(
            GET_THREAD_USER_BOOKMARKS,
            payload
        );
        const threadTopics = result.data.data;
        this.threadBookmark.items = threadTopics.filter(
            (topic: any) => topic.topic
        );
        this.threadBookmark.total = result.data.pagination.total;
        this.threadBookmark.loading = false;
    }

    async created() {
        await this.getProductBookmarks();
        await this.getThreadTopicBookmarks();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <b-row v-if="shouldBootPage">
        <b-col cols="12" class="mb-3">
            <base-content-card title="My Product Bookmarks">
                <b-list-group class="mb-3" v-if="hasProductBookmarkData">
                    <template v-for="(product, index) in productBookmark.items">
                        <product-list-item
                            :inherited-index="index"
                            :product="product.item"
                            :key="index"
                        ></product-list-item>
                    </template>
                </b-list-group>

                <div class="text-center py-4" v-else>
                    <span class="text-black-50">No data.</span>
                </div>

                <div
                    class="d-flex justify-content-center"
                    v-if="shouldShowWantToBuyPaginationComponent"
                >
                    <b-pagination
                        :total-rows="productBookmark.total"
                        :per-page="productBookmark.perPage"
                        v-model="productBookmark.page"
                    ></b-pagination>
                </div>
            </base-content-card>
        </b-col>
        <b-col cols="12">
            <base-content-card title="My Forum Topics Bookmarks">
                <b-list-group class="mb-3" v-if="hasThreadBookmarkData">
                    <template v-for="(thread, index) in threadBookmark.items">
                        <thread-list-item
                            :inherited-index="index"
                            :thread="thread.topic"
                            :key="index"
                        ></thread-list-item>
                    </template>
                </b-list-group>

                <div class="text-center py-4" v-else>
                    <span class="text-black-50">No data.</span>
                </div>

                <div
                    class="d-flex justify-content-center"
                    v-if="shouldShowThreadPaginationComponent"
                >
                    <b-pagination
                        :total-rows="threadBookmark.total"
                        :per-page="threadBookmark.perPage"
                        v-model="threadBookmark.page"
                    ></b-pagination>
                </div>
            </base-content-card>
        </b-col>
    </b-row>
</template>
