<template>
    <v-row dense>
        <v-col cols="12">
            <v-btn
                large
                block
                depressed
                color="primary"
                class="text-capitalize"
                :to="{ name: 'home' }"
                >Home</v-btn
            >
        </v-col>

        <v-col cols="12">
            <v-btn
                large
                block
                depressed
                color="primary"
                class="text-capitalize"
                :to="{
                    name: 'forum',
                }"
                >Visit
                <span class="text-lowercase mx-1">the</span> Forums</v-btn
            >
        </v-col>

        <v-col cols="12">
            <v-btn
                large
                block
                depressed
                color="primary"
                class="text-capitalize"
                :to="{ name: 'item-editor', params: { operation: 'create' } }"
                >Post <span class="text-lowercase mx-1">an</span> Item</v-btn
            >
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'main-layout-main-navigation',
};
</script>
