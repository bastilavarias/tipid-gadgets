<template>
    <v-row>
        <v-col cols="12">
            <v-col cols="12">
                <h1 class="title secondary--text font-weight-bold">
                    New Items for Sale
                </h1>
            </v-col>

            <template v-for="index in 15">
                <item-preview :index="index" :key="index"></item-preview>
            </template>
        </v-col>

        <v-col cols="12">
            <v-col cols="12">
                <h1 class="title secondary--text font-weight-bold">
                    New Want to Buys
                </h1>
            </v-col>

            <template v-for="index in 15">
                <item-preview :index="index" :key="index"></item-preview>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import ItemPreview from '@/components/custom/preview/Item';
export default {
    name: 'Home',
    components: { ItemPreview },
};
</script>
