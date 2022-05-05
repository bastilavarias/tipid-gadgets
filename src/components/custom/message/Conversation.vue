<template>
    <v-card outlined rounded height="50rem">
        <template v-if="isNoConversationMessageShow">
            No Conversation here.
        </template>

        <template v-if="!isNoConversationMessageShow && information">
            <v-card-title class="d-flex align-center">
                <div>
                    <router-link
                        :to="{
                            name: 'user/information',
                            params: { username: currentUser.username },
                        }"
                        style="text-decoration: none"
                    >
                        <span class="mr-1 primary--text">{{
                            currentUser.username
                        }}</span>
                    </router-link>
                    <v-chip small>{{ userType }}</v-chip>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-information</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-subtitle>
                <router-link
                    :to="{
                        name: 'view-item',
                        params: { slug: information.item.slug },
                    }"
                    style="text-decoration: none"
                >
                    <span class="secondary--text font-weight-bold">{{
                        information.item.name
                    }}</span>
                </router-link>
                <span class="font-weight-bold"> · </span>
                <span
                    class="text-capitalize"
                    :style="{ color: statusColors[information.item.status] }"
                    >{{ information.item.status }}</span
                ></v-card-subtitle
            >

            <v-card-text
                style="height: 30rem; overflow: auto"
                ref="conversationMessagesDiv"
            >
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

            <v-card-text style="height: 20rem; overflow: auto">
                <v-row dense>
                    <v-col cols="12">
                        <v-textarea
                            color="primary"
                            outlined
                            hide-details
                            no-resize
                            autofocus
                            v-model="content"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <div class="d-flex justify-space-between">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="secondary"
                                depressed
                                :disabled="!content"
                                :loading="isCreateChatStart"
                                @click="createChat"
                                >Send</v-btn
                            >
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </template>
    </v-card>
</template>
<script>
import MessageChat from '@/components/custom/message/Chat';
import { CREATE_CHAT, GET_ROOM, GET_ROOM_CHATS } from '@/store/types/message';
import utilityMixin from '@/mixins/utility';

export default {
    name: 'message-conversation',

    mixins: [utilityMixin],

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

            content: null,
            isCreateChatStart: false,
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

        isHost() {
            return this.user.id === this.information.host.id;
        },

        currentUser() {
            if (this.isHost) return this.information.customer;
            return this.information.host;
        },

        userType() {
            const sectionID = this.information.item.item_section_id;
            if (sectionID === 1) return this.isHost ? 'Buyer' : 'Seller';
            return this.isHost ? 'Seller' : 'Buyer';
        },

        statusColors() {
            return {
                available: '#4CAF50',
            };
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
            this.scrollBottom();
        },

        chatsBroadcastListener() {
            window.Echo.private(`room.${this.roomID}`).listen(
                '.chat',
                ({ data }) => {
                    this.chat.items = [...this.chat.items, data];
                    this.scrollBottom();
                }
            );
        },

        async createChat() {
            if (this.content) {
                const payload = {
                    room_id: this.roomID,
                    content: this.content.trim() || '',
                };
                this.isCreateChatStart = true;
                const { code } = await this.$store.dispatch(
                    CREATE_CHAT,
                    payload
                );
                if (this.isHTTPRequestSuccess(code)) {
                    this.content = null;
                    this.isCreateChatStart = false;
                    return;
                }
                this.isCreateChatStart = false;
            }
        },

        scrollBottom() {
            this.$nextTick(() => {
                const { conversationMessagesDiv } = this.$refs;
                conversationMessagesDiv.scrollTop =
                    conversationMessagesDiv.scrollHeight ||
                    conversationMessagesDiv.clientHeight;
            });
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
