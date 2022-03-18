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
                        placeholder="All Categories"
                    ></v-select>
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
                        Show Items
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'main-layout-catalog-browser-card',
};
</script>
