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
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            dense
                            hide-details
                            label="Keywords"
                            outlined
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                            outlined
                            dense
                            hide-details
                            label="Category"
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                            outlined
                            dense
                            hide-details
                            label="Condition"
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                            outlined
                            dense
                            hide-details
                            label="Warranty"
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
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    label="Maximum Price"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <v-row dense>
                            <v-col cols="12" md="6">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Sort by"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    outlined
                                    dense
                                    hide-details
                                    label="Order"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" class="text-capitalize" depressed>
                    Search
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
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
        };
    },

    watch: {
        isOpen(val) {
            this.isOpenLocal = val;
        },

        isOpenLocal(val) {
            this.$emit('update:isOpen', val);
        },
    },
};
</script>
