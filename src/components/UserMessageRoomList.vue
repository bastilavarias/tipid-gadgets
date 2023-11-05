<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
    MESSAGE_GET_ROOM,
    MESSAGE_GET_USER_ROOMS,
} from '@/store/modules/message';
import UserMessageRoomListItem from '@/components/UserMessageRoomListItem.vue';
import BaseInfiniteScroll from '@/components/BaseInfiniteScroll.vue';
import { MessageRoomInformation } from '@/types/message';
import moment from 'moment';

@Component({
    components: { BaseInfiniteScroll, UserMessageRoomListItem },
})
export default class UserMessageRoomList extends Vue {
    room = {
        loading: false,
        items: [],
        page: 1,
        perPage: 10,
        identifier: +new Date(),
    };

    get hasRoomData() {
        return !this.room.loading && this.room.items.length > 0;
    }

    async getRooms($state: any) {
        const { page, perPage } = this.room;
        const payload = {
            page,
            perPage,
        };
        this.room.loading = true;
        const result = await this.$store.dispatch(
            MESSAGE_GET_USER_ROOMS,
            payload
        );
        if (result.success) {
            const data: Array<MessageRoomInformation> = result.data.data;
            if (data.length === this.room.perPage) {
                // @ts-ignore
                this.room.items = [...this.room.items, ...data];
                this.room.page += 1;
                this.room.loading = false;
                $state.loaded();
                return;
            }
            // @ts-ignore
            this.room.items = [...this.room.items, ...data];
            $state.complete();
            this.room.loading = false;
        }
        $state.complete();
        this.room.loading = false;
    }

    roomsBroadcastListener() {
        const user = this.$store.state.authentication.user;
        // @ts-ignore
        if (window.Echo)
            // @ts-ignore
            window.Echo.private(`user.${user.id}`).listen(
                '.room',
                async ({ data }: { data: MessageRoomInformation }) => {
                    const roomID = data.id;
                    const result = await this.$store.dispatch(
                        MESSAGE_GET_ROOM,
                        roomID
                    );
                    const room = result.data.data;
                    const roomIds =
                        this.room.items.map(
                            (item: MessageRoomInformation) => item.id
                        ) || [];
                    if (roomIds.includes(roomID)) {
                        // @ts-ignore
                        this.room.items = this.room.items
                            .map((item: MessageRoomInformation) => {
                                if (item.id === roomID)
                                    item = Object.assign({}, room);
                                return item;
                            })
                            .sort((previous, next) =>
                                moment(
                                    new Date(previous.recent_chat.created_at)
                                ).isAfter(new Date(next.recent_chat.created_at))
                                    ? -1
                                    : 1
                            );
                        return;
                    }
                    // @ts-ignore
                    this.room.items = [room, ...this.room.items];
                }
            );
    }

    created() {
        this.roomsBroadcastListener();
    }
}
</script>

<template>
    <b-list-group>
        <div v-if="hasRoomData">
            <template v-for="(room, index) in room.items">
                <user-message-room-list-item
                    :room="room"
                    :key="index"
                ></user-message-room-list-item>
            </template>
        </div>

        <div class="text-center py-4" v-else>
            <span class="text-black-50">No rooms.</span>
        </div>

        <base-infinite-scroll
            :action="getRooms"
            :identifier.sync="room.identifier"
        ></base-infinite-scroll>
    </b-list-group>
</template>
