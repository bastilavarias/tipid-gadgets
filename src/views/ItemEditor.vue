<template>
    <v-row>
        <v-col cols="12" md="9">
            <v-col cols="12">
                <h1 class="title secondary--text font-weight-bold">
                    {{ title }}
                </h1>
            </v-col>

            <v-col cols="12">
                <base-text-editor></base-text-editor>
            </v-col>
        </v-col>
        <v-col cols="12" md="3">
            <v-card outlined>
                <v-list dense>
                    <v-subheader>Posting Rules & Tips</v-subheader>
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
