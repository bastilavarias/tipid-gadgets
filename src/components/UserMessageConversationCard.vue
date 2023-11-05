<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
    MESSAGE_GET_ROOM,
    MESSAGE_GET_ROOM_CHATS,
    MESSAGE_SEND_CHAT,
} from '@/store/modules/message';
import {
    MessageChatInformation,
    MessageRoomInformation,
} from '@/types/message';
import BaseInfiniteScroll from '@/components/BaseInfiniteScroll.vue';
import UserMessageConversationCardItem from '@/components/UserMessageConversationCardItem.vue';
import UserConversationToolbar from '@/components/UserConversationToolbar.vue';
import { TransactionInformation } from '@/types/transaction';
@Component({
    components: {
        UserConversationToolbar,
        UserMessageConversationCardItem,
        BaseInfiniteScroll,
    },
})
export default class UserMessageConversationCard extends Vue {
    chat = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        identifier: +new Date(),
    };
    isActionStart = false;
    content = null;
    error = null;
    channel = null;
    room: null | MessageRoomInformation = null;
    shouldBootPage = false;

    get roomID() {
        return this.$route.query.roomID || null;
    }

    get isFormValid() {
        return !!this.content;
    }

    @Watch('roomID')
    async onChangeRoomIDRouteQuery(oldValue: number, newValue: number) {
        if (this.roomID) {
            if (this.channel) {
                // @ts-ignore
                window.Echo.leave(this.channel.name);
            }
            this.shouldBootPage = false;
            await this.initiateChatServices();
            this.shouldBootPage = true;
        }
    }

    async getChats($state: any) {
        const { page, perPage } = this.chat;
        const payload = {
            page,
            perPage,
            roomID: this.roomID,
        };
        this.chat.loading = true;
        const result = await this.$store.dispatch(
            MESSAGE_GET_ROOM_CHATS,
            payload
        );
        if (result.success) {
            const data: Array<MessageChatInformation> = result.data.data;
            if (data.length === this.chat.perPage) {
                // @ts-ignore
                this.chat.items = [...this.chat.items, ...data];
                this.scrollBottom();
                this.chat.page += 1;
                this.chat.loading = false;
                $state.loaded();
                return;
            }
            // @ts-ignore
            this.chat.items = [...data, ...this.chat.items];
            this.scrollBottom();
            $state.complete();
            this.chat.loading = false;
        }
        $state.complete();
        this.chat.loading = false;
    }

    async sendChat() {
        this.isActionStart = true;
        const payload = {
            room_id: this.roomID,
            content: this.content,
        };
        const result = await this.$store.dispatch(MESSAGE_SEND_CHAT, payload);
        if (result.success) {
            this.content = null;
            this.isActionStart = false;
            return;
        }
        this.$bvToast.toast(result.error, {
            title: 'Chat Failed.',
            variant: 'danger',
            solid: true,
        });
        this.isActionStart = false;
    }

    resetChat() {
        this.room = Object.assign({}, null);
        this.chat.page = 1;
        this.chat.items = [];
        this.chat.identifier += 1;
    }

    setChatBroadcastListener() {
        // @ts-ignore
        if (window.Echo)
            // @ts-ignore
            this.channel = window.Echo.private(`room.${this.roomID}`)
                .listen(
                    '.chat',
                    ({ data }: { data: MessageChatInformation }) => {
                        // @ts-ignore
                        this.chat.items = [...this.chat.items, data];
                        this.scrollBottom();
                    }
                )
                .listen(
                    '.transaction',
                    ({ data }: { data: TransactionInformation }) => {
                        if (data && this.room) {
                            this.room.transaction = Object.assign({}, data);
                        }
                    }
                );
    }

    scrollBottom() {
        this.$nextTick(() => {
            const { conversationMessagesDiv } = this.$refs;
            // @ts-ignore
            conversationMessagesDiv.scrollTop = // @ts-ignore
                conversationMessagesDiv.scrollHeight || // @ts-ignore
                conversationMessagesDiv.clientHeight; // @ts-ignore;
        });
    }

    async getRoom() {
        const result = await this.$store.dispatch(
            MESSAGE_GET_ROOM,
            this.roomID
        );
        this.room = Object.assign({}, result.data.data);
    }

    async initiateChatServices() {
        this.resetChat();
        await this.getRoom();
        this.setChatBroadcastListener();
    }

    async created() {
        if (this.roomID) {
            await this.initiateChatServices();
            this.shouldBootPage = true;
        }
    }
}
</script>

<template>
    <div style="height: 100%">
        <div v-if="shouldBootPage" style="height: 100%">
            <div class="conversation d-flex flex-column">
                <div class="conversation__room-information">
                    <user-conversation-toolbar
                        :room="room"
                    ></user-conversation-toolbar>
                </div>
                <div class="conversation__chats" ref="conversationMessagesDiv">
                    <template v-for="(chat, index) in chat.items">
                        <div :key="index">
                            <user-message-conversation-card-item
                                :chat="chat"
                            ></user-message-conversation-card-item>
                            <div class="mb-2"></div>
                        </div>
                    </template>
                    <base-infinite-scroll
                        :action="getChats"
                        :identifier.sync="chat.identifier"
                        direction="top"
                    ></base-infinite-scroll>
                </div>
                <div class="conversation__writer d-flex flex-column">
                    <div class="mb-2">
                        <b-textarea
                            placeholder="Type your message here..."
                            v-model="content"
                        ></b-textarea>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div></div>
                        <b-button
                            variant="primary"
                            class="text-white"
                            :disabled="isActionStart || !isFormValid"
                            @click="sendChat"
                        >
                            <b-spinner
                                small
                                label="Loading..."
                                v-if="isActionStart"
                            ></b-spinner
                            ><span v-else>Send</span>
                        </b-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center py-4" v-else>
            <span class="text-black-50">No selected room.</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.conversation {
    height: 100%;

    &__room-information {
        height: 10%;
        overflow: auto;
    }

    &__chats {
        height: 70%;
        overflow-y: auto;
    }

    &__writer {
        height: 20%;
    }
}
</style>
