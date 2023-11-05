<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { GET_PRODUCTS } from '@/store/modules/product';
import ProductListItem from '@/components/ProductListItem.vue';
import { GET_THREADS } from '@/store/modules/thread';
import ThreadListItem from '@/components/ThreadListItem.vue';
import { GET_USERS } from '@/store/modules/user';
import UserListItem from '@/components/UserListItem.vue';
import { REFERENCE_GET_ITEM_CATEGORIES } from '@/store/modules/reference';
@Component({
    components: {
        UserListItem,
        ThreadListItem,
        ProductListItem,
        BaseContentCard,
    },
})
export default class SearchView extends Vue {
    itemForSale = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'items_for_sale',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    wantToBuy = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'want_to_buys',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    thread = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    user = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };
    itemCategories = [];
    shouldBootPage = false;

    get keyword() {
        return this.$route.query.keyword || null;
    }

    get searchType() {
        return this.$route.query.search_type || null;
    }

    get itemCategoryID() {
        return this.$route.query.item_category || null;
    }

    get threadSectionID() {
        return this.$route.query.thread_section_id || null;
    }

    get isItemsForSalePaneOpen() {
        return (
            this.searchType === null ||
            this.searchType === 'items_for_sale' ||
            this.currentItemCategory
        );
    }

    get isWantToBuysPaneOpen() {
        return (
            this.searchType === null ||
            this.searchType === 'want_to_buys' ||
            this.currentItemCategory
        );
    }

    get isForumTopicsPaneOpen() {
        return (
            (this.searchType === null || this.searchType === 'forum_topics') &&
            !this.currentItemCategory
        );
    }

    get isUsersPaneOpen() {
        return (
            (this.searchType === null || this.searchType === 'members') &&
            !this.currentItemCategory
        );
    }

    get shouldShowItemForSalePaginationComponent() {
        return this.shouldBootPage && this.itemForSale.items.length > 0;
    }

    get shouldShowWantToBuyPaginationComponent() {
        return this.shouldBootPage && this.wantToBuy.items.length > 0;
    }

    get shouldShowThreadPaginationComponent() {
        return this.shouldBootPage && this.thread.items.length > 0;
    }

    get shouldShowUserPaginationComponent() {
        return this.shouldBootPage && this.user.items.length > 0;
    }

    get currentItemCategory() {
        if (this.itemCategoryID) {
            // @ts-ignore
            return this.itemCategories.find(
                (category: { value: number; text: string }) =>
                    // @ts-ignore
                    category.value === parseInt(this.itemCategoryID)
            );
        }
        return null;
    }

    get hasItemsForSaleData() {
        return !this.itemForSale.loading && this.itemForSale.items.length > 0;
    }

    get hasWantToBuysData() {
        return !this.wantToBuy.loading && this.wantToBuy.items.length > 0;
    }

    get hasThreadData() {
        return !this.thread.loading && this.thread.items.length > 0;
    }

    get hasUserData() {
        return !this.user.loading && this.user.items.length > 0;
    }

    get noResults() {
        return (
            !this.hasItemsForSaleData &&
            !this.hasWantToBuysData &&
            !this.hasThreadData &&
            !this.hasUserData
        );
    }

    @Watch('keyword')
    async onKeywordChange() {
        await this.beginSearch();
    }

    @Watch('searchType')
    async onSearchTypeChange() {
        await this.beginSearch();
    }

    @Watch('itemCategoryID')
    async onItemCategoryIDChange() {
        await this.beginSearch();
    }

    @Watch('itemForSale.page')
    async onChangeItemForSalePage() {
        await this.getItemsForSale();
    }

    @Watch('wantToBuy.page')
    async onChangeWantToBuyPage() {
        await this.getWantToBuys();
    }

    @Watch('thread.page')
    async onChangeThreadPage() {
        await this.getThreadTopics();
    }

    @Watch('user.page')
    async onChangeUserPage() {
        await this.getUsers();
    }

    async getItemsForSale() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.itemForSale;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
            categoryID: this.itemCategoryID,
            search: this.keyword,
        };
        this.itemForSale.loading = true;
        const result = await this.$store.dispatch(GET_PRODUCTS, payload);
        this.itemForSale.items = result.data.data;
        this.itemForSale.total = result.data.pagination.total;
        this.itemForSale.loading = false;
    }

    async getWantToBuys() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.wantToBuy;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
            categoryID: this.itemCategoryID,
            search: this.keyword,
        };
        this.wantToBuy.loading = true;
        const result = await this.$store.dispatch(GET_PRODUCTS, payload);
        this.wantToBuy.items = result.data.data;
        this.wantToBuy.total = result.data.pagination.total;
        this.wantToBuy.loading = false;
    }

    async getThreadTopics() {
        const { page, perPage, sortBy, orderBy } = this.thread;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
            sectionID: this.threadSectionID,
            search: this.keyword,
        };
        this.thread.loading = true;
        const result = await this.$store.dispatch(GET_THREADS, payload);
        this.thread.items = result.data.data;
        this.thread.total = result.data.pagination.total;
        this.thread.loading = false;
    }

    async getUsers() {
        const { page, perPage, sortBy, orderBy } = this.user;
        const payload = {
            page,
            perPage,
            sortBy,
            orderBy,
            search: this.keyword,
        };
        this.user.loading = true;
        const result = await this.$store.dispatch(GET_USERS, payload);
        this.user.items = result.data.data;
        this.user.total = result.data.pagination.total;
        this.user.loading = false;
    }

    async beginSearch() {
        this.shouldBootPage = false;
        if (this.isItemsForSalePaneOpen) {
            await this.getItemsForSale();
        }
        if (this.isWantToBuysPaneOpen) {
            await this.getWantToBuys();
        }
        if (this.isForumTopicsPaneOpen) {
            await this.getThreadTopics();
        }
        if (this.isUsersPaneOpen) {
            await this.getUsers();
        }
        this.shouldBootPage = true;
    }

    async getItemCategories() {
        const result = await this.$store.dispatch(
            REFERENCE_GET_ITEM_CATEGORIES
        );
        if (result.success) {
            this.itemCategories = result.data;
        }
    }

    async created() {
        await this.getItemCategories();
        await this.beginSearch();
    }
}
</script>

<template>
    <b-row>
        <b-col cols="12" class="mb-3">
            <h4>
                Search results for
                <span v-if="keyword"
                    >keyword:
                    <span class="text-primary">{{ keyword }}</span></span
                >
                <span v-if="itemCategoryID">
                    <span class="text-primary">{{
                        currentItemCategory.text
                    }}</span></span
                >
            </h4>
        </b-col>

        <b-col cols="12">
            <div class="text-center py-4" v-if="noResults">
                <span class="text-black-50">No results.</span>
            </div>
            <b-row v-else>
                <b-col
                    cols="12"
                    class="mb-2"
                    v-if="
                        isItemsForSalePaneOpen &&
                        shouldShowItemForSalePaginationComponent
                    "
                >
                    <base-content-card title="Items for Sale">
                        <b-list-group class="mb-3">
                            <template
                                v-for="(product, index) in itemForSale.items"
                            >
                                <product-list-item
                                    :inherited-index="index"
                                    :product="product"
                                    :key="index"
                                ></product-list-item>
                            </template>
                        </b-list-group>

                        <div
                            class="d-flex justify-content-center"
                            v-if="shouldShowItemForSalePaginationComponent"
                        >
                            <b-pagination
                                :total-rows="itemForSale.total"
                                :per-page="itemForSale.perPage"
                                v-model="itemForSale.page"
                            ></b-pagination>
                        </div>
                    </base-content-card>
                </b-col>

                <b-col
                    cols="12"
                    class="mb-2"
                    v-if="
                        isWantToBuysPaneOpen &&
                        shouldShowWantToBuyPaginationComponent
                    "
                >
                    <base-content-card title="Want to Buys">
                        <b-list-group class="mb-3">
                            <template
                                v-for="(product, index) in wantToBuy.items"
                            >
                                <product-list-item
                                    :inherited-index="index"
                                    :product="product"
                                    :key="index"
                                ></product-list-item>
                            </template>
                        </b-list-group>

                        <div
                            class="d-flex justify-content-center"
                            v-if="shouldShowWantToBuyPaginationComponent"
                        >
                            <b-pagination
                                :total-rows="wantToBuy.total"
                                :per-page="wantToBuy.perPage"
                                v-model="wantToBuy.page"
                            ></b-pagination>
                        </div>
                    </base-content-card>
                </b-col>

                <b-col
                    cols="12"
                    class="mb-2"
                    v-if="
                        isForumTopicsPaneOpen &&
                        shouldShowThreadPaginationComponent
                    "
                >
                    <base-content-card title="Forum Topics">
                        <b-list-group class="mb-3">
                            <template v-for="(thread, index) in thread.items">
                                <thread-list-item
                                    :inherited-index="index"
                                    :thread="thread"
                                    :key="index"
                                ></thread-list-item>
                            </template>
                        </b-list-group>
                        <div
                            class="d-flex justify-content-center"
                            v-if="shouldShowThreadPaginationComponent"
                        >
                            <b-pagination
                                :total-rows="thread.total"
                                :per-page="thread.perPage"
                                v-model="thread.page"
                            ></b-pagination>
                        </div>
                    </base-content-card>
                </b-col>

                <b-col
                    cols="12"
                    v-if="isUsersPaneOpen && shouldShowUserPaginationComponent"
                >
                    <base-content-card title="Users">
                        <b-list-group class="mb-3">
                            <template v-for="(user, index) in user.items">
                                <user-list-item
                                    :inherited-index="index"
                                    :user="user"
                                    :key="index"
                                ></user-list-item>
                            </template>
                        </b-list-group>
                        <div
                            class="d-flex justify-content-center"
                            v-if="shouldShowUserPaginationComponent"
                        >
                            <b-pagination
                                :total-rows="user.total"
                                :per-page="user.perPage"
                                v-model="user.page"
                            ></b-pagination>
                        </div>
                    </base-content-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>
