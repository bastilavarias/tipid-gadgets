<template>
    <v-row>
        <v-col cols="12" md="9">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >{{ title }}</v-card-title
                >

                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Section</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Item Name</div>
                            <v-text-field
                                outlined
                                placeholder="Name"
                                dense
                                color="primary"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Category</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                Price or Budget
                            </div>
                            <v-text-field
                                type="number"
                                outlined
                                placeholder="₱"
                                dense
                                color="primary"
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Condition</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Warranty</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                            ></v-select>
                        </v-col>

                        <v-col cols="12" class="mb-5">
                            <div class="caption grey--text mb-1">
                                Description
                            </div>
                            <base-text-editor></base-text-editor>
                        </v-col>

                        <v-col cols="12" class="d-flex">
                            <v-spacer></v-spacer>
                            <div>
                                <v-btn
                                    color="secondary"
                                    class="text-capitalize mr-3"
                                    depressed
                                    >Save
                                    <span class="mx-1 text-lowercase">as</span>
                                    Draft</v-btn
                                >

                                <v-btn
                                    color="primary"
                                    class="text-capitalize"
                                    depressed
                                    >Post Item</v-btn
                                >
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="3">
            <v-card outlined>
                <v-list dense>
                    <v-subheader>Posting an Item Rules & Tips</v-subheader>
                    <template v-for="n in 10">
                        <v-list-item :key="n">
                            {{ n }}. Lorem ipsum dolor.
                        </v-list-item>
                        <v-divider v-if="n !== 10"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import BaseTextEditor from '@/components/base/TextEditor';

export default {
    components: { BaseTextEditor },

    computed: {
        isCreateMode() {
            return this.$route.params.operation === 'create';
        },

        title() {
            return this.isCreateMode ? 'Post an Item' : 'Edit an Item';
        },
    },
};
</script>
