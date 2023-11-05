<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import UserMessageRoomList from '@/components/UserMessageRoomList.vue';
import UserMessageConversationCard from '@/components/UserMessageConversationCard.vue';

@Component({
    components: {
        UserMessageConversationCard,
        UserMessageRoomList,
        BaseContentCard,
    },
})
export default class UserMessageView extends Vue {}
</script>

<template>
    <base-content-card title="User Messages">
        <b-row class="py-2" style="height: 45rem">
            <b-col cols="12" md="4" style="height: 100%; overflow-y: auto">
                <user-message-room-list></user-message-room-list>
            </b-col>
            <b-col cols="12" md="8" style="height: 100%; overflow-y: auto">
                <user-message-conversation-card></user-message-conversation-card>
            </b-col>
        </b-row>
    </base-content-card>
</template>
