<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MessageRoomInformation } from '@/types/message';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import dateMixin from '@/mixins/date';

@Component
export default class UserMessageRoomListItem extends Vue {
    @Prop(Object) readonly room: MessageRoomInformation | undefined;

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isHost() {
        return this.room?.host.id === this.user?.id;
    }

    get displayName() {
        return this.isHost
            ? this.room?.customer.username
            : this.room?.host.username;
    }

    get hasItem() {
        return !!this.room?.item;
    }

    get date() {
        return dateMixin.toChatDate(String(this.room?.updated_at));
    }
}
</script>

<template>
    <b-list-group-item
        :to="{ name: 'User Message View', query: { roomID: room.id } }"
    >
        <div class="d-flex w-100 justify-content-between text-truncate">
            <span class="h6 text-primary font-weight-bold mb-0">
                {{ displayName }}
            </span>
            <small>{{ date }}</small>
        </div>
        <div class="d-flex w-100 justify-content-between text-truncate">
            <span class="h6 font-weight-bold mb-0" v-if="hasItem">
                {{ room.item.name }}
            </span>
            <span class="h6 font-weight-normal font-italic" v-else
                >Product Item was deleted</span
            >
        </div>
        <div class="d-flex w-100 justify-content-between text-truncate">
            <span class="text-black-50">
                {{ room.recent_chat.content }}
            </span>
        </div>
    </b-list-group-item>
</template>
