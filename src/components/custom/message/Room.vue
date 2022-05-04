<template>
    <v-card rounded outlined height="50rem">
        <v-list dense rounded>
            <v-list-item-group>
                <template v-for="(room, index) in room.items">
                    <v-list-item :three-line="!!room.recent_chat" :key="index">
                        <v-list-item-content>
                            <v-list-item-title
                                class="font-weight-bold primary--text"
                                >{{
                                    isHost(room.host)
                                        ? room.customer.username
                                        : room.host.username
                                }}</v-list-item-title
                            >
                            <v-list-item-subtitle class="secondary--text">{{
                                room.item.name
                            }}</v-list-item-subtitle>
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
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
import { GET_USER_ROOMS } from '@/store/types/message';
import dateMixin from '@/mixins/date';

export default {
    name: 'message-rooms',

    mixins: [dateMixin],

    data() {
        return {
            room: {
                loading: false,
                items: [],
                page: 1,
                perPage: 10,
            },
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

    methods: {
        async getRooms() {
            this.room.loading = true;
            this.room.items = await this.$store.dispatch(GET_USER_ROOMS);
            console.log(this.room.items);
            this.room.loading = false;
        },

        isHost(host) {
            if (!this.isAuthenticated) return false;
            const user = this.$store.state.authentication.user;
            return host.id === user.id;
        },

        isYou(_user) {
            if (!this.isAuthenticated) return false;
            const user = this.$store.state.authentication.user;
            return user.id === _user.id;
        },
    },

    async created() {
        await this.getRooms();
    },
};
</script>
