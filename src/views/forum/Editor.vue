<template>
    <v-row>
        <v-col cols="12" md="9">
            <v-col cols="12">
                <h1 class="title secondary--text font-weight-bold">
                    {{ title }}
                </h1>
            </v-col>

            <v-col cols="12">
                <v-row dense>
                    <v-col cols="12">
                        <div class="subtitle-1 grey--text mb-1">Section</div>
                        <v-select
                            outlined
                            placeholder="Choose"
                            dense
                            color="primary"
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <div class="subtitle-1 grey--text mb-1">Subject</div>
                        <v-text-field
                            outlined
                            placeholder="Subject"
                            dense
                            color="primary"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mb-5">
                        <div class="subtitle-1 grey--text mb-1">Message</div>
                        <base-text-editor></base-text-editor>
                    </v-col>

                    <v-col cols="12" class="d-flex">
                        <v-spacer></v-spacer>
                        <div>
                            <v-btn
                                color="secondary"
                                class="text-capitalize mr-3"
                                depressed
                                :to="{ name: '' }"
                                >Save
                                <span class="mx-1 text-lowercase">as</span>
                                Draft</v-btn
                            >

                            <v-btn
                                color="primary"
                                class="text-capitalize"
                                depressed
                                >Create Topic</v-btn
                            >
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-col>
        <v-col cols="12" md="3">
            <v-card outlined>
                <v-list dense>
                    <v-subheader>Posting a Topic Rules & Tips</v-subheader>
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
            return this.isCreateMode ? 'New Topic' : 'Edit a topic';
        },
    },
};
</script>
