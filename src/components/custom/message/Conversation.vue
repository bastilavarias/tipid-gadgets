<template>
    <div>
        <v-card
            outlined
            rounded
            height="50rem"
            v-if="isNoConversationMessageShow"
        >
            No Conversation here.
        </v-card>

        <v-card outlined rounded height="50rem" v-if="information">
            <v-card-title class="primary--text">{{ title }}</v-card-title>
            <v-card-subtitle class="secondary--text font-weight-bold">{{
                information.item.name
            }}</v-card-subtitle>

            <v-card-text style="height: 40rem; overflow: auto">
                <v-row dense>
                    <template v-for="(room, index) in chat.items">
                        <v-col cols="12" :key="index">
                            <message-chat
                                :content="room.content"
                                :createdAt="room.created_at"
                                :sender="room.user"
                            ></message-chat>
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import MessageChat from '@/components/custom/message/Chat';
import { GET_ROOM, GET_ROOM_CHATS } from '@/store/types/message';

export default {
    name: 'message-conversation',

    components: { MessageChat },

    data() {
        return {
            information: null,
            isGetRoomStart: false,
            isNoConversationMessageShow: false,
            chat: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
            },
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        roomID() {
            return this.$route.query.roomID || null;
        },

        title() {
            if (this.user.id === this.information.host.id)
                return this.information.customer.username;
            return this.information.host.username;
        },
    },

    watch: {
        async roomID(val) {
            if (val) {
                await this.getRoom();
                await this.getRoomChats();
                this.chatsBroadcastListener();
            }
        },
    },

    methods: {
        async getRoom() {
            this.isGetRoomStart = true;
            this.information = await this.$store.dispatch(
                GET_ROOM,
                this.roomID
            );
            this.isGetRoomStart = false;
            this.isNoConversationMessageShow = false;
        },

        async getRoomChats() {
            this.chat.items = await this.$store.dispatch(
                GET_ROOM_CHATS,
                this.roomID
            );
        },

        chatsBroadcastListener() {
            window.Echo.private(`room.${this.roomID}`).listen(
                '.chat',
                ({ data }) => {
                    this.chat.items = [...this.chat.items, data];
                }
            );
        },
    },

    async created() {
        if (!this.roomID) return (this.isNoConversationMessageShow = true);
        this.chatsBroadcastListener();
        await this.getRoom();
        await this.getRoomChats();
    },
};
</script>
