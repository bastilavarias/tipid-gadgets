<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >New Items for Sale</v-card-title
                >

                <v-card-text>
                    <v-row dense>
                        <template v-for="index in 15">
                            <v-col cols="12" :key="index">
                                <item-preview :index="index"></item-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card flat>
                <v-card-title class="secondary--text font-weight-bold"
                    >New Want to Buys</v-card-title
                >

                <v-card-text>
                    <v-row dense>
                        <template v-for="index in 15">
                            <v-col cols="12" :key="index">
                                <item-preview :index="index"></item-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-card-text>
            </v-card>
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
