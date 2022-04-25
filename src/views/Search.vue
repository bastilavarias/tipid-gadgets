<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title>
                    <span class="secondary--text font-weight-bold align-center"
                        >Search TipidGadgets</span
                    >
                    <v-spacer></v-spacer>
                    <v-btn icon @click="isOptionDialogOpen = true">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-subtitle class="primary--text"
                    ><span class="font-weight-bold">You searched for</span>:
                    <span class="font-weight-regular">Items for Sale</span>,
                    <span class="font-weight-regular">Forum Topics</span>
                </v-card-subtitle>

                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                                <v-card-title class="font-weight-bold"
                                    >Items for Sale</v-card-title
                                >

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="secondary"
                                        class="text-capitalize"
                                        depressed
                                        >See More</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card>
                                <v-card-title class="font-weight-bold"
                                    >Want to Buys</v-card-title
                                >

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="secondary"
                                        class="text-capitalize"
                                        depressed
                                        >See More</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card>
                                <v-card-title class="font-weight-bold"
                                    >Forum Topics</v-card-title
                                >

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="secondary"
                                        class="text-capitalize"
                                        depressed
                                        >See More</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card>
                                <v-card-title class="font-weight-bold"
                                    >Members</v-card-title
                                >

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="secondary"
                                        class="text-capitalize"
                                        depressed
                                        >See More</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <search-option-dialog
            :is-open.sync="isOptionDialogOpen"
        ></search-option-dialog>
    </v-row>
</template>

<script>
import SearchOptionDialog from '@/components/custom/search/OptionDialog';
export default {
    components: { SearchOptionDialog },
    data() {
        return {
            isOptionDialogOpen: false,
        };
    },
};
</script>
