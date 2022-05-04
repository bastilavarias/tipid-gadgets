<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Messages</v-card-title
                >

                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="3">
                            <message-rooms></message-rooms>
                        </v-col>

                        <v-col cols="12" md="9">
                            <message-conversation></message-conversation>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import MessageRooms from '@/components/custom/message/Room';
import MessageConversation from '@/components/custom/message/Conversation';

export default {
    components: { MessageConversation, MessageRooms },
};
</script>
