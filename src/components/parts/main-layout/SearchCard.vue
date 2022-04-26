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
            <v-btn color="primary" text block :to="{ name: 'search' }">
                <span class="text-capitalize">Use Advance Search</span>
                <v-icon class="ml-1">mdi-magnify</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { GET_SEARCH_TYPES } from '@/store/types/reference';

export default {
    name: 'main-layout-search-card',

    data() {
        return {
            types: [],
            query: null,
            selectedType: null,
        };
    },

    computed: {
        isFormValid() {
            return this.selectedType || this.query;
        },
    },

    methods: {
        async search() {
            await this.$router.push({
                name: 'search',
                query: { query: this.query, type: this.selectedType },
            });
        },
    },

    async created() {
        this.types = await this.$store.dispatch(GET_SEARCH_TYPES);
    },
};
</script>
