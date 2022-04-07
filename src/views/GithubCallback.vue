<template>
    <v-row justify="center" align-content="center">
        <div class="text-center py-10">
            <v-icon :size="150" color="primary">mdi-github</v-icon>
            <div style="margin-bottom: 2rem"></div>
            <h1 class="display-1 mb-5 font-weight-bold primary--text">
                Connecting to GitHub...
            </h1>
            <v-progress-circular
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
    </v-row>
</template>

<script>
export default {
    async created() {
        const { code } = this.$route.query;
        console.log(code);
    },
};
</script>
