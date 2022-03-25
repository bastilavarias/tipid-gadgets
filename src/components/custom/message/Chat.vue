<template>
    <div class="d-flex justify-space-between">
        <v-card
            color="secondary"
            min-width="30%"
            max-width="80%"
            shaped
            dark
            v-if="!self"
        >
            <v-card-subtitle>bastilavar · 3 mins ago</v-card-subtitle>
            <v-card-text class="white--text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                earum obcaecati ratione sapiente tenetur. Dolorum eius est
                explicabo quibusdam reprehenderit!
            </v-card-text>
        </v-card>
        <div></div>
        <v-card
            color="primary"
            min-width="30%"
            max-width="80%"
            shaped
            dark
            v-if="self"
        >
            <v-card-subtitle>You · 3 mins ago</v-card-subtitle>
            <v-card-text class="white--text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                earum obcaecati ratione sapiente tenetur. Dolorum eius est
                explicabo quibusdam reprehenderit!
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'message-chat',

    props: {
        self: Boolean,
    },
};
</script>
