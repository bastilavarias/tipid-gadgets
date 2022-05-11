<template>
    <v-row v-if="shouldBootComponent">
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                >
                    Catalog
                </v-card-title>

                <v-card-subtitle class="primary--text"
                    ><span class="font-weight-bold">{{ section.name }} : </span>
                    <span>{{ category.name }}</span>
                </v-card-subtitle>

                <v-card-text>
                    <v-row dense>
                        <template v-for="(item, index) in item.items">
                            <v-col cols="12" :key="index">
                                <item-preview
                                    :section="item.section"
                                    :itemID="item.id"
                                    :name="item.name"
                                    :price="item.price"
                                    :category="item.category"
                                    :user="item.user"
                                    component="list-item"
                                    :slug="item.slug"
                                    :index="index"
                                ></item-preview>
                            </v-col>
                        </template>
                    </v-row>

                    <div
                        class="fill-height d-flex justify-center align-center"
                        v-if="!item.loading && item.items.length === 0"
                    >
                        <span class="caption font-italic">No items.</span>
                    </div>

                    <v-row dense v-if="item.loading">
                        <template v-for="i in 10">
                            <v-col cols="12" :key="i">
                                <v-skeleton-loader type="list-item-two-line">
                                </v-skeleton-loader>
                            </v-col>
                        </template>
                    </v-row>

                    <base-infinite-scroll
                        :action="browse"
                        :identifier="infiniteId"
                    ></base-infinite-scroll>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SearchOptionDialog from '@/components/custom/search/OptionDialog';
import { GET_ITEMS } from '@/store/types/item';
import ItemPreview from '@/components/custom/preview/Item';
import {
    GET_ITEM_CATEGORIES,
    GET_ITEM_SECTIONS,
} from '@/store/types/reference';
import TopicPreview from '@/components/custom/preview/Topic';
import UserPreview from '@/components/custom/preview/User';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';

export default {
    components: {
        BaseInfiniteScroll,
        UserPreview,
        TopicPreview,
        ItemPreview,
        SearchOptionDialog,
    },

    data() {
        return {
            shouldBootComponent: false,
            options: {
                sortBy: 'created_at',
                orderBy: 'desc',
                section: null,
                category: null,
            },
            item: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
            },
            sections: [],
            categories: [],
            infiniteId: +new Date(),
        };
    },

    computed: {
        section() {
            if (!this.options.section) return null;
            return this.sections.find(
                (section) => section.slug === this.options.section
            );
        },

        category() {
            if (!this.options.category) return null;
            return this.categories.find(
                (category) => category.slug === this.options.category
            );
        },
    },

    watch: {
        async '$route.params'(val) {
            if (val) {
                this.options = Object.assign(
                    {},
                    {
                        ...this.options,
                        section: val.sectionSlug,
                        category: val.categorySlug,
                    }
                );
                this.item.page = 1;
                this.item.items = [];
                this.infiniteId += 1;
            }
        },
    },

    methods: {
        async browse($state) {
            const { page, perPage } = this.item;
            const payload = {
                page,
                perPage,
                filterBy: this.section.slug,
                categoryID: this.category.id,
            };
            this.item.loading = true;
            const items = await this.$store.dispatch(GET_ITEMS, payload);
            if (items.length === perPage) {
                this.item.page += 1;
                this.item.loading = false;
                this.item.items = [...this.item.items, ...items];
                $state.loaded();
                return;
            }
            this.item.items = [...this.item.items, ...items];
            this.item.loading = false;
            $state.complete();
        },
    },

    async created() {
        const { sectionSlug, categorySlug } = this.$route.params;
        if (!sectionSlug && !categorySlug) return this.$router.go(-1);
        this.sections = await this.$store.dispatch(GET_ITEM_SECTIONS);
        this.categories = await this.$store.dispatch(GET_ITEM_CATEGORIES);
        this.options = Object.assign(
            {},
            {
                ...this.options,
                section: sectionSlug,
                category: categorySlug,
            }
        );
        this.shouldBootComponent = true;
    },
};
</script>
