<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Saved Items</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="n in 5">
                            <v-col cols="12" :key="n">
                                <item-preview :index="n"></item-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Bookmarked Topics</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="n in 5">
                            <v-col cols="12" :key="n">
                                <topic-preview :index="n"></topic-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import ItemPreview from '@/components/custom/preview/Item';
import TopicPreview from '@/components/custom/preview/Topic';
export default {
    components: { TopicPreview, ItemPreview },
};
</script>
