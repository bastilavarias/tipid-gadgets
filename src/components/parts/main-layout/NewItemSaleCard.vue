<template>
    <v-card flat>
        <v-card-title class="secondary caption font-weight-medium white--text">
            New Items for Sale
        </v-card-title>

        <v-card outlined tile>
            <v-card-text style="height: 10rem">
                <div class="fill-height d-flex justify-center align-center">
                    <span class="caption font-italic"
                        >No new items for sale.</span
                    >
                </div>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script>
export default {
    name: 'main-layout-new-item-sale-card',
};
</script>
