<template>
    <v-card flat color="transparent">
        <div class="mb-5">
            <div class="caption font-weight-bold">Post Insights</div>
            <div class="caption" style="color: rgba(0, 0, 0, 0.6)">
                Only you can see this
            </div>
        </div>

        <v-row justify="space-around" align-content="center">
            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">3.9k</span>
                <span class="d-flex align-center">
                    <v-icon color="blue" small class="mr-1"
                        >mdi-google-analytics</v-icon
                    >
                    <span class="caption">Post Reach</span>
                </span>
            </div>

            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">3.9k</span>
                <span class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-eye</v-icon>
                    <span class="caption">Unique Viewers</span>
                </span>
            </div>

            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">3.9k</span>
                <span class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-thumb-up</v-icon>
                    <span class="caption">Likes</span>
                </span>
            </div>

            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">3.9k</span>
                <span class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-bookmark</v-icon>
                    <span class="caption">Bookmarks</span>
                </span>
            </div>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'item-post-insight-card',
};
</script>
