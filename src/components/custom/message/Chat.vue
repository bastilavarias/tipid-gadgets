<template>
    <div class="d-flex justify-space-between">
        <div v-if="isYou(sender)"></div>
        <v-card
            :color="isYou(sender) ? 'primary' : 'secondary'"
            min-width="30%"
            max-width="80%"
            shaped
            dark
        >
            <v-card-subtitle
                >{{ isYou(sender) ? 'You' : sender.username }} ·
                {{ toChatDate(createdAt) }}</v-card-subtitle
            >
            <v-card-text class="white--text" v-html="content"> </v-card-text>
        </v-card>
    </div>
</template>

<script>
import identifierMixin from '@/mixins/identifier';
import dateMixin from '@/mixins/date';

export default {
    name: 'message-chat',

    mixins: [identifierMixin, dateMixin],

    props: {
        content: String,
        createdAt: String,
        sender: Object,
    },
};
</script>
