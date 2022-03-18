<template>
    <v-row>
        <v-col cols="12">
            <v-col cols="12">
                <div class="d-flex justify-space-between align-center">
                    <div class="title secondary--text font-weight-bold">
                        Forum Topics
                    </div>
                    <div class="d-flex align-center">
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
                    </div>
                </div>
            </v-col>

            <template v-for="index in 15">
                <topic-preview :index="index" :key="index"></topic-preview>
            </template>
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
