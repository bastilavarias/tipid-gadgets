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
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-select
                        hide-details
                        outlined
                        dense
                        placeholder="Type"
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="secondary"
                        depressed
                        block
                        class="text-capitalize"
                    >
                        Search
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" text block>
                <span class="text-capitalize">Use Advance Search</span>
                <v-icon class="ml-1">mdi-magnify</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'main-layout-search-card',
};
</script>
