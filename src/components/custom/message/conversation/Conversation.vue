<template>
    <v-card outlined rounded height="50rem">
        <template v-if="isNoConversationMessageShow">
            No Conversation here.
        </template>

        <template v-if="!isNoConversationMessageShow && shouldBootComponent">
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="d-flex align-center">
                        <router-link
                            :to="{
                                name: 'user/information',
                                params: { username: currentUser.username },
                            }"
                            style="text-decoration: none"
                        >
                            <span class="mr-1 primary--text title">{{
                                currentUser.username
                            }}</span>
                        </router-link>
                        <v-chip small>{{ userType }}</v-chip>
                    </v-list-item-title>

                    <v-list-item-subtitle>
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
                            class="text-capitalize font-weight-bold"
                            :style="{
                                color: this.statusColors[
                                    information.transaction.status
                                ],
                            }"
                            >{{ information.transaction.status }}</span
                        >
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                        <span
                            class="text-decoration-underline caption pointer"
                            v-if="isHost && isTransactionStatusAvailable"
                            @click="openMarkAsReceiveDialog"
                            >Mark as Receive</span
                        >
                        <span
                            class="text-decoration-underline caption pointer"
                            @click="isOpenReviewDialogOpen = true"
                            v-if="
                                isTransactionStatusReceived && isValidToReview
                            "
                            >Write {{ currentUser.username }} a review</span
                        >
                        <span
                            class="caption font-italic"
                            v-else-if="
                                isTransactionStatusReceived && !isValidToReview
                            "
                            >You already gave {{ currentUser.username }} a
                            review.
                        </span>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-card-text
                style="height: 30rem; overflow: auto"
                ref="conversationMessagesDiv"
            >
                <base-infinite-scroll
                    :action="getRoomChats"
                    :identifier="infiniteId"
                    direction="top"
                    v-if="shouldBootComponent"
                ></base-infinite-scroll>
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

        <message-conversation-review-editor-dialog
            :is-open.sync="isOpenReviewDialogOpen"
            :reviewee="currentUser"
            :transactionID="information.transaction.id"
            v-if="isTransactionStatusReceived && isValidToReview"
        ></message-conversation-review-editor-dialog>

        <base-alert-dialog
            :is-open.sync="isMarkAsReceiveDialogOpen"
            :title="markAsReceiveDialog.title"
            :description="markAsReceiveDialog.description"
            :theme="markAsReceiveDialog.theme"
            :loading="isMarkAsReceiveStart"
            @onCancel="isMarkAsReceiveDialogOpen = false"
            @onProceed="markAsReceive"
        ></base-alert-dialog>
    </v-card>
</template>
<script>
import MessageChat from '@/components/custom/message/Chat';
import {
    CREATE_CHAT,
    GET_ROOM,
    GET_ROOM_CHATS,
    GET_USER_ROOMS,
} from '@/store/types/message';
import utilityMixin from '@/mixins/utility';
import BaseAlertDialog from '@/components/base/AlertDialog';
import { TRANSACTION_RECEIVE } from '@/store/types/transaction';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import { CHECK_REVIEWER_VALIDITY } from '@/store/types/user';
import MessageConversationReviewEditorDialog from '@/components/custom/message/conversation/ReviewEditorDialog';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';

export default {
    name: 'message-conversation',

    mixins: [utilityMixin],

    components: {
        BaseInfiniteScroll,
        MessageConversationReviewEditorDialog,
        BaseAlertDialog,
        MessageChat,
    },

    data() {
        return {
            shouldBootComponent: false,
            information: null,
            isGetRoomStart: false,
            isNoConversationMessageShow: false,
            chat: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
            },

            content: null,
            isCreateChatStart: false,

            isMarkAsReceiveStart: false,
            isMarkAsReceiveDialogOpen: false,
            markAsReceiveDialog: {
                theme: 'success',
                title: null,
                description: null,
            },

            isValidToReview: false,
            isCheckReviewerValidityStart: false,

            isOpenReviewDialogOpen: false,

            infiniteId: +new Date(),
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
                received: '#EE8800',
            };
        },

        isTransactionStatusAvailable() {
            if (!this.information) return false;
            return this.information.transaction.status === 'available';
        },

        isTransactionStatusReceived() {
            if (!this.information) return false;
            return this.information.transaction.status === 'received';
        },
    },

    watch: {
        async roomID(val) {
            if (val) {
                await this.loadData();
                this.chat.page = 1;
                this.chat.items = [];
                this.infiniteId += 1; // load chats again.
                this.loadBroadcastListeners();
                this.shouldBootComponent = true;
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

        async getRoomChats($state) {
            const { page, perPage } = this.chat;
            const payload = {
                roomID: this.roomID,
                page,
                perPage,
            };
            this.chat.loading = true;
            const chats = await this.$store.dispatch(GET_ROOM_CHATS, payload);
            if (chats.length === this.chat.perPage) {
                this.chat.page += 1;
                this.chat.loading = false;
                this.chat.items = [...chats, ...this.chat.items];
                $state.loaded();
                return;
            }
            this.chat.items = [...chats, ...this.chat.items];
            this.chat.loading = false;
            $state.complete();
        },

        chatBroadcastListener() {
            if (window.Echo)
                window.Echo.private(`room.${this.roomID}`).listen(
                    '.chat',
                    ({ data }) => {
                        this.chat.items = [...this.chat.items, data];
                        this.scrollBottom();
                    }
                );
        },

        transactionBroadcastListener() {
            if (window.Echo)
                window.Echo.private(`room.${this.roomID}`).listen(
                    '.transaction',
                    ({ data }) => {
                        this.information.transaction = Object.assign({}, data);
                        this.isValidToReview = true;
                        const { host } = this.information;
                        const message = this.isHost
                            ? 'You marked this transaction as received.'
                            : `${host.username} marked this transaction as received.`;
                        this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                            open: true,
                            message: message,
                            color: 'success',
                        });
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

        async markAsReceive() {
            const payload = {
                item_id: this.information.item.id,
                room_id: this.information.id,
            };
            this.isMarkAsReceiveStart = true;
            const { code } = await this.$store.dispatch(
                TRANSACTION_RECEIVE,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.isMarkAsReceiveDialogOpen = false;
                this.isMarkAsReceiveStart = false;
                return;
            }
            this.isMarkAsReceiveStart = false;
        },

        openMarkAsReceiveDialog() {
            this.markAsReceiveDialog = Object.assign(
                {},
                {
                    theme: 'success',
                    title: 'Mark as Receive',
                    description:
                        'Marking this transaction as receive has no turning back. Please proceed if you are sure.',
                }
            );
            this.isMarkAsReceiveDialogOpen = true;
        },

        async checkReviewerValidity() {
            const { host, customer, transaction } = this.information;
            const payload = {
                userID: this.isHost ? customer.id : host.id, // reviewee
                transactionID: transaction.id,
            };
            this.isCheckReviewerValidityStart = true;
            this.isValidToReview = await this.$store.dispatch(
                CHECK_REVIEWER_VALIDITY,
                payload
            );
            this.isCheckReviewerValidityStart = false;
        },

        reviewBroadcastListener() {
            if (window.Echo)
                window.Echo.private(`room.${this.roomID}`).listen(
                    '.review',
                    ({ data }) => {
                        const { reviewee_id, reviewer_id, reviewer } = data;
                        if (this.user.id === reviewer_id)
                            this.isValidToReview = false;

                        if (this.user.id === reviewee_id) {
                            const message = `${reviewer.username} gave you a rating.`;
                            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                                open: true,
                                message: message,
                                color: 'success',
                            });
                        }
                    }
                );
        },

        async loadData() {
            await this.getRoom();

            if (this.isTransactionStatusReceived)
                await this.checkReviewerValidity();
        },

        loadBroadcastListeners() {
            this.chatBroadcastListener();
            this.transactionBroadcastListener();
            this.reviewBroadcastListener();
        },
    },

    async created() {
        if (!this.roomID) return (this.isNoConversationMessageShow = true);
        await this.loadData();
        this.loadBroadcastListeners();
        this.shouldBootComponent = true;
        this.scrollBottom();
    },
};
</script>
