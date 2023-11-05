<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MessageChatInformation } from '@/types/message';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import dateMixin from '@/mixins/date';

@Component
export default class UserMessageConversationCardItem extends Vue {
    @Prop(Object) readonly chat: MessageChatInformation | undefined;

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isSender() {
        return this.chat?.user.id === this.user?.id;
    }

    toChatDate(timestamps: string) {
        return dateMixin.toChatDate(timestamps);
    }
}
</script>

<template>
    <div class="d-flex justify-content-between">
        <template v-if="isSender">
            <div></div>
            <b-card
                class="p-2 d-flex flex-column"
                no-body
                style="max-height: 80%; background-color: #f8f9fa"
            >
                <div>
                    {{ chat.content }}
                </div>
                <div>
                    <span style="font-size: 0.8rem">{{
                        toChatDate(chat.created_at)
                    }}</span>
                </div>
            </b-card>
        </template>
        <template v-else>
            <b-card
                bg-variant="primary"
                class="p-2 d-flex flex-column"
                no-body
                style="max-height: 80%; color: white"
            >
                <div>
                    <span style="font-size: 0.8rem">{{
                        chat.user.username
                    }}</span>
                </div>
                <div>
                    {{ chat.content }}
                </div>
                <div>
                    <span style="font-size: 0.8rem">{{
                        toChatDate(chat.created_at)
                    }}</span>
                </div>
            </b-card>
            <div></div>
        </template>
    </div>
</template>
