<template>
    <v-card outlined>
        <v-card-subtitle> Browse the Catalog</v-card-subtitle>

        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-select
                        hide-details
                        outlined
                        dense
                        placeholder="Type"
                        :items="sections"
                        item-text="name"
                        item-value="slug"
                        v-model="selectedSection"
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-select
                        hide-details
                        outlined
                        dense
                        placeholder="Category"
                        :items="categories"
                        item-text="name"
                        item-value="slug"
                        v-model="selectedCategory"
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="secondary"
                        depressed
                        block
                        class="text-capitalize"
                        :disabled="!isFormValid"
                        @click="browse"
                    >
                        Show Items
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import {
    GET_ITEM_CATEGORIES,
    GET_ITEM_SECTIONS,
} from '@/store/types/reference';

export default {
    name: 'main-layout-catalog-browser-card',

    data() {
        return {
            sections: [],
            categories: [],
            selectedSection: null,
            selectedCategory: null,
        };
    },

    computed: {
        isFormValid() {
            return this.selectedSection && this.selectedCategory;
        },
    },

    methods: {
        browse() {
            this.$router.push({
                name: 'catalog-browser',
                params: {
                    sectionSlug: this.selectedSection,
                    categorySlug: this.selectedCategory,
                },
            });
        },
    },

    async created() {
        this.sections = await this.$store.dispatch(GET_ITEM_SECTIONS);
        this.categories = await this.$store.dispatch(GET_ITEM_CATEGORIES);
    },
};
</script>
