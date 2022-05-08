<template>
    <v-dialog width="500" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Search Options</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle>Advance search configuration</v-card-subtitle>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-select
                            outlined
                            dense
                            hide-details
                            label="Type"
                            item-value="slug"
                            item-text="name"
                            :items="types"
                            clearable
                            @click:clear="optionsLocal.type = null"
                            v-model="optionsLocal.type"
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            dense
                            hide-details
                            label="Keywords"
                            outlined
                            v-model="optionsLocal.keywords"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" v-if="isForumTopics">
                        <v-select
                            outlined
                            dense
                            hide-details
                            label="Section"
                            item-value="id"
                            item-text="name"
                            :items="sections"
                            clearable
                            @click:clear="optionsLocal.sectionID = null"
                            v-model="optionsLocal.sectionID"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" v-if="isItemsForSale || isWantToBuys">
                        <v-row>
                            <v-col cols="12">
                                <div class="subtitle-2">More Options</div>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Category"
                                    item-value="id"
                                    item-text="name"
                                    :items="categories"
                                    clearable
                                    @click:clear="
                                        optionsLocal.categoryID = null
                                    "
                                    v-model="optionsLocal.categoryID"
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Condition"
                                    item-value="id"
                                    item-text="name"
                                    :items="conditions"
                                    clearable
                                    @click:clear="
                                        optionsLocal.conditionID = null
                                    "
                                    v-model="optionsLocal.conditionID"
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Warranty"
                                    item-value="id"
                                    item-text="name"
                                    :items="warranties"
                                    clearable
                                    @click:clear="
                                        optionsLocal.warrantyID = null
                                    "
                                    v-model="optionsLocal.warrantyID"
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-row dense>
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            outlined
                                            dense
                                            hide-details
                                            label="Minimum Price"
                                            type="number"
                                            v-model="optionsLocal.minimumPrice"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            outlined
                                            dense
                                            hide-details
                                            label="Maximum Price"
                                            type="number"
                                            v-model="optionsLocal.maximumPrice"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col
                        cols="12"
                        v-if="
                            isItemsForSale ||
                            isWantToBuys ||
                            isForumTopics ||
                            isMembers
                        "
                    >
                        <v-row dense>
                            <v-col cols="12" md="6">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Sort by"
                                    :items="sortTypes[optionsLocal.type]"
                                    item-value="slug"
                                    item-text="name"
                                    clearable
                                    @click:clear="optionsLocal.sortBy = null"
                                    v-model="optionsLocal.sortBy"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Order"
                                    :items="orderTypes"
                                    item-value="slug"
                                    item-text="name"
                                    clearable
                                    @click:clear="optionsLocal.orderBy = null"
                                    v-model="optionsLocal.orderBy"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    class="text-capitalize"
                    depressed
                    @click="search"
                    :disabled="!isFormValid"
                >
                    Search
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    GET_ITEM_CATEGORIES,
    GET_ITEM_CONDITIONS,
    GET_ITEM_WARRANTIES,
    GET_SEARCH_TYPES,
    GET_TOPIC_SECTIONS,
} from '@/store/types/reference';

export default {
    name: 'search-option-dialog',

    props: {
        isOpen: false,
        options: Object,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            optionsLocal: Object.assign({}, this.options),
            types: [],
            categories: [],
            conditions: [],
            warranties: [],
            sections: [], // forum sections
        };
    },

    computed: {
        isItemsForSale() {
            return this.optionsLocal.type === 'items_for_sale';
        },

        isWantToBuys() {
            return this.optionsLocal.type === 'want_to_buys';
        },

        isForumTopics() {
            return this.optionsLocal.type === 'forum_topics';
        },

        isMembers() {
            return this.optionsLocal.type === 'members';
        },

        sortTypes() {
            return {
                items_for_sale: [
                    {
                        name: 'Posted At',
                        slug: 'created_at',
                    },

                    {
                        name: 'Price',
                        slug: 'price',
                    },
                    {
                        name: 'Name',
                        slug: 'name',
                    },
                ],

                want_to_buys: [
                    {
                        name: 'Posted At',
                        slug: 'created_at',
                    },

                    {
                        name: 'Price',
                        slug: 'price',
                    },
                    {
                        name: 'Name',
                        slug: 'name',
                    },
                ],

                forum_topics: [
                    {
                        name: 'Posted At',
                        slug: 'created_at',
                    },

                    // {
                    //     name: 'Relevance',
                    //     slug: 'relevance',
                    // },

                    {
                        name: 'Name',
                        slug: 'name',
                    },
                ],

                members: [
                    {
                        name: 'Posted At',
                        slug: 'created_at',
                    },

                    {
                        name: 'Name',
                        slug: 'name',
                    },
                ],
            };
        },

        orderTypes() {
            return [
                {
                    name: 'Ascending',
                    slug: 'asc',
                },

                {
                    name: 'Descending',
                    slug: 'desc',
                },
            ];
        },

        isFormValid() {
            const { type } = this.optionsLocal;
            return type;
        },
    },

    watch: {
        isOpen(val) {
            this.isOpenLocal = val;
        },

        isOpenLocal(val) {
            this.$emit('update:isOpen', val);
        },

        options(val) {
            this.optionsLocal = Object.assign(
                {},
                {
                    ...val,
                }
            );
        },
    },

    methods: {
        search() {
            this.$emit('search', this.optionsLocal);
            this.isOpenLocal = false;
        },
    },

    async created() {
        this.types = await this.$store.dispatch(GET_SEARCH_TYPES);
        this.categories = await this.$store.dispatch(GET_ITEM_CATEGORIES);
        this.conditions = await this.$store.dispatch(GET_ITEM_CONDITIONS);
        this.warranties = await this.$store.dispatch(GET_ITEM_WARRANTIES);
        this.sections = await this.$store.dispatch(GET_TOPIC_SECTIONS);
    },
};
</script>
