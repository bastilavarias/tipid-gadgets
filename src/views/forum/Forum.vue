<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title>
                    <span class="secondary--text font-weight-bold">
                        Forum Topics</span
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        depressed
                        color="secondary"
                        class="text-capitalize"
                        :to="{
                            name: 'forum/topic-editor',
                            params: { operation: 'create' },
                        }"
                        >Start
                        <span class="mx-1 text-lowercase">a</span>
                        Topic</v-btn
                    >
                </v-card-title>

                <v-card-text>
                    <v-row dense>
                        <template v-for="index in 15">
                            <v-col cols="12" :key="index">
                                <topic-preview :index="index"></topic-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import TopicPreview from '@/components/custom/preview/Topic';
export default {
    name: 'Home',

    components: { TopicPreview },
};
</script>
