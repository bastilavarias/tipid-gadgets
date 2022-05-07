<template>
    <v-card outlined>
        <v-card-subtitle> Search TipidGadgets </v-card-subtitle>

        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-text-field
                        outlined
                        dense
                        placeholder="Search"
                        hide-details
                        v-model="query"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-select
                        hide-details
                        outlined
                        dense
                        placeholder="Type"
                        :items="types"
                        item-value="slug"
                        item-text="name"
                        v-model="selectedType"
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="secondary"
                        depressed
                        block
                        class="text-capitalize"
                        @click="search"
                        :disabled="!isFormValid"
                    >
                        Search
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-btn
                color="primary"
                text
                block
                @click="isOptionDialogOpen = true"
            >
                <span class="text-capitalize">Use Advance Search</span>
                <v-icon class="ml-1">mdi-magnify</v-icon>
            </v-btn>
        </v-card-actions>

        <search-option-dialog
            :is-open.sync="isOptionDialogOpen"
            :options="options"
            @search="setSearchOptions"
        ></search-option-dialog>
    </v-card>
</template>

<script>
import { GET_SEARCH_TYPES } from '@/store/types/reference';
import SearchOptionDialog from '@/components/custom/search/OptionDialog';

export default {
    name: 'main-layout-search-card',
    components: { SearchOptionDialog },
    data() {
        return {
            types: [],
            query: null,
            selectedType: null,

            options: {
                type: null,
                keywords: null,
                sectionID: null,
                categoryID: null,
                conditionID: null,
                warrantyID: null,
                minimumPrice: null,
                maximumPrice: null,
                location: null,
                sortBy: 'created_at',
                orderBy: 'desc',
            },
            isOptionDialogOpen: false,
        };
    },

    computed: {
        isFormValid() {
            return this.selectedType;
        },
    },

    methods: {
        async search() {
            await this.$router.push({
                name: 'search',
                query: { query: this.query, type: this.selectedType },
            });
        },

        async setSearchOptions(options) {
            Object.keys(options).forEach((key) => {
                if (options[key] === null) {
                    delete options[key];
                }
            });
            this.options = Object.assign(
                {},
                {
                    ...options,
                }
            );
            await this.$router.push({
                name: 'search',
                query: { ...options, query: options.keywords },
            });
        },
    },

    async created() {
        this.types = await this.$store.dispatch(GET_SEARCH_TYPES);
    },
};
</script>
