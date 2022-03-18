<template>
    <v-chip tile small :color="isPositive ? 'success' : 'error'">
        <v-icon small class="mr-1"
            >mdi-{{ isPositive ? 'plus' : 'minus' }}</v-icon
        >
        <span class="font-weight-bold">{{
            isPositive ? 'Positive' : 'Negative'
        }}</span>
    </v-chip>
</template>

<script>
export default {
    name: 'rating-status-chip',

    props: {
        rating: String,
    },

    computed: {
        isPositive() {
            return this.rating === 'positive';
        },
    },
};
</script>
