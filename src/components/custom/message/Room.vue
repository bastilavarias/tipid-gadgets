<template>
    <v-card rounded outlined height="50rem" style="overflow: auto">
        <v-list dense rounded>
            <v-list-item-group>
                <template v-for="(room, index) in room.items">
                    <v-list-item
                        :value="room.id"
                        :three-line="!!room.recent_chat"
                        @click="goToConversation(room)"
                        :key="index"
                    >
                        <v-list-item-content>
                            <v-list-item-title
                                class="font-weight-bold primary--text"
                                >{{
                                    isHost(room.host)
                                        ? room.customer.username
                                        : room.host.username
                                }}</v-list-item-title
                            >
                            <v-list-item-subtitle
                                class="secondary--text"
                                v-if="room.item"
                                >{{ room.item.name }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle v-if="room.recent_chat"
                                >{{
                                    isYou(room.recent_chat.user)
                                        ? 'You'
                                        : room.recent_chat.user.username
                                }}: {{ room.recent_chat.content }}! ·
                                {{ toChatDate(room.recent_chat.created_at) }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <div
                    class="mt-10 d-flex justify-center align-center"
                    v-if="!room.loading && room.items.length === 0"
                >
                    <span class="caption font-italic">No chat rooms.</span>
                </div>
                <v-row dense v-if="room.loading">
                    <template v-for="i in room.perPage">
                        <v-col cols="12" :key="i">
                            <v-skeleton-loader type="list-item-three-line">
                            </v-skeleton-loader>
                        </v-col>
                    </template>
                </v-row>

                <base-infinite-scroll
                    :action="getRooms"
                    :identifier="infiniteId"
                ></base-infinite-scroll>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
import {
    CHECK_ROOM_MEMBER,
    GET_ROOM,
    GET_USER_ROOMS,
} from '@/store/types/message';
import dateMixin from '@/mixins/date';
import redirectionMixin from '@/mixins/redirection';
import identifierMixin from '@/mixins/identifier';
import moment from 'moment';
import BaseInfiniteScroll from '@/components/base/InfiniteScroll';
import { GET_TOPICS } from '@/store/types/topic';

export default {
    name: 'message-rooms',
    components: { BaseInfiniteScroll },
    mixins: [dateMixin, redirectionMixin, identifierMixin],

    data() {
        return {
            room: {
                loading: false,
                items: [],
                page: 1,
                perPage: 5,
            },
            currentRoomID: null,
            infiniteId: +new Date(),
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        roomID() {
            return this.$route.query.roomID || null;
        },
    },

    watch: {
        roomID(val) {
            if (this.roomID) this.roomMemberCheck();
        },
    },

    methods: {
        async getRooms($state) {
            const { page, perPage } = this.room;
            const payload = {
                page,
                perPage,
            };
            this.room.loading = true;
            const rooms = await this.$store.dispatch(GET_USER_ROOMS, payload);
            if (rooms.length === this.room.perPage) {
                this.room.page += 1;
                this.room.loading = false;
                this.room.items = [...this.room.items, ...rooms];
                $state.loaded();
                return;
            }
            this.room.items = [...this.room.items, ...rooms];
            this.room.loading = false;
            $state.complete();
        },

        isHost(host) {
            if (!this.isAuthenticated) return false;
            const user = this.$store.state.authentication.user;
            return host.id === user.id;
        },

        roomsBroadcastListener() {
            const user = this.$store.state.authentication.user;
            if (window.Echo)
                window.Echo.private(`user.${user.id}`).listen(
                    '.room',
                    async ({ data }) => {
                        const roomID = data.id;
                        const room = await this.$store.dispatch(
                            GET_ROOM,
                            roomID
                        );
                        const roomIds =
                            this.room.items.map((item) => item.id) || [];
                        if (roomIds.includes(roomID)) {
                            this.room.items = this.room.items
                                .map((item) => {
                                    if (item.id === roomID)
                                        item = Object.assign({}, room);
                                    return item;
                                })
                                .sort((previous, next) =>
                                    moment(
                                        new Date(
                                            previous.recent_chat.created_at
                                        )
                                    ).isAfter(
                                        new Date(next.recent_chat.created_at)
                                    )
                                        ? -1
                                        : 1
                                );

                            return;
                        }
                        this.room.items = [room, ...this.room.items];
                    }
                );
        },

        async roomMemberCheck() {
            const isRoomMember = await this.$store.dispatch(
                CHECK_ROOM_MEMBER,
                this.roomID
            );
            if (!isRoomMember) return this.$router.go(-1);
        },
    },

    async created() {
        if (this.roomID) await this.roomMemberCheck();
        this.roomsBroadcastListener();
    },
};
</script>
