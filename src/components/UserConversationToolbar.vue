<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { MessageRoomInformation } from '@/types/message';
import { UserInformation } from '@/types/user';
import { TRANSACTION_RECEIVE_ITEM } from '@/store/modules/transaction';
import authenticationModule from '@/store/modules/authentication';
import {
    CHECK_USER_REVIEW_VALIDITY,
    WRITE_USER_REVIEW,
} from '@/store/modules/review';
import { ReviewInformation } from '@/types/review';

const defaultForm = {
    content: null,
    rating: null,
};

@Component
export default class UserConversationToolbar extends Vue {
    @Prop(Object) readonly room: MessageRoomInformation | undefined;

    form = Object.assign({}, defaultForm);
    isReceiveItemStart = false;
    isCheckReviewValidityStart = true;
    isReviewUserStart = false;
    isValidToReview = false;

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

    get toolbarDisplay() {
        return this.isHost ? this.room?.customer : this.room?.host;
    }

    get isTransactionReceived() {
        return this.room?.transaction.status === 'received';
    }

    get shouldShowReceiveButton() {
        const isStatusAvailable = this.room?.transaction.status === 'available';
        return !this.isHost && isStatusAvailable && this.hasItem;
    }

    get isFormValid() {
        const { content, rating } = this.form;
        return !!content && !!rating;
    }

    get reviewee(): UserInformation | null {
        if (this.room && this.isHost) {
            return this.room?.customer;
        } else if (this.room && !this.isHost) {
            return this.room?.host;
        }

        return this.user;
    }

    get businessIdentifier() {
        return this.isHost ? 'Client' : 'Seller';
    }

    get hasItem() {
        return !!this.room?.item;
    }

    @Watch('isTransactionReceived')
    onIsTransactionReceivedChanged(value: any) {
        if (value) {
            this.checkReviewValidity();
            this.setReviewBroadcastListener();
        }
    }

    async receiveItem() {
        const payload = {
            room_id: this.room?.id,
            item_id: this.room?.item.id,
        };
        this.isReceiveItemStart = true;
        const result = await this.$store.dispatch(
            TRANSACTION_RECEIVE_ITEM,
            payload
        );
        if (result.success) {
            this.$bvModal.hide('receive-confirmation-modal');
            this.$bvToast.toast('Transaction Complete', {
                title: 'Transaction.',
                variant: 'success',
                solid: true,
            });
            this.isReceiveItemStart = false;
            return;
        }
        this.$bvToast.toast(result.error, {
            title: 'Transaction Failed.',
            variant: 'danger',
            solid: true,
        });
        this.isReceiveItemStart = false;
    }

    async reviewUser() {
        const payload = {
            room_id: this.room?.id,
            item_id: this.room?.item.id,
            user_id: this.reviewee ? this.reviewee.id : null,
            transaction_id: this.room?.transaction.id,
            content: this.form.content,
            rating: this.form.rating,
        };
        this.isReviewUserStart = true;
        const result = await this.$store.dispatch(WRITE_USER_REVIEW, payload);
        if (result.success) {
            this.form = Object.assign({}, defaultForm);
            this.$bvModal.hide('review-modal');
            this.$bvToast.toast('Review Complete', {
                title: 'User Review',
                variant: 'success',
                solid: true,
            });
            this.isReviewUserStart = false;
            return;
        }
        this.$bvToast.toast(result.error, {
            title: 'Transaction Failed.',
            variant: 'danger',
            solid: true,
        });
        this.isReviewUserStart = false;
    }

    async checkReviewValidity() {
        const payload = {
            transactionID: this.room?.transaction.id,
            userID: this.reviewee ? this.reviewee.id : null,
        };
        this.isCheckReviewValidityStart = true;
        const result = await this.$store.dispatch(
            CHECK_USER_REVIEW_VALIDITY,
            payload
        );
        this.isCheckReviewValidityStart = false;
        this.isValidToReview = result.data.data || false;
    }

    setReviewBroadcastListener() {
        // @ts-ignore
        if (window.Echo)
            // @ts-ignore
            this.channel = window.Echo.private(`room.${this.room.id}`).listen(
                '.review',
                ({ data }: { data: ReviewInformation }) => {
                    if (this.user?.id === data.reviewer.id) {
                        this.isValidToReview = false;
                    }
                }
            );
    }

    async created() {
        if (this.isTransactionReceived) {
            await this.checkReviewValidity();
            this.setReviewBroadcastListener();
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column">
        <div class="d-flex w-100 justify-content-between text-truncate">
            <div class="d-flex flex-column">
                <router-link
                    :to="{
                        name: 'User Public Profile View',
                        params: { username: toolbarDisplay.username },
                    }"
                >
                    <span class="h5 text-primary font-weight-bold mb-0">
                        {{ toolbarDisplay.username }}
                        <b-badge variant="secondary">{{
                            businessIdentifier
                        }}</b-badge>
                    </span>
                </router-link>
                <div>
                    <router-link
                        :to="{
                            name: 'Product View',
                            params: { productSlug: room.item.slug },
                        }"
                        v-if="hasItem"
                    >
                        <span
                            class="h-5 font-weight-bold mb-0"
                            style="color: black"
                        >
                            {{ room.item.name }}
                        </span>
                    </router-link>
                    <span class="h6 font-weight-normal font-italic" v-else
                        >Product Item was deleted</span
                    >
                </div>
            </div>
            <b-button
                variant="primary"
                class="text-white"
                v-b-modal="'receive-confirmation-modal'"
                v-if="shouldShowReceiveButton"
                >Receive
            </b-button>
            <div v-if="!isCheckReviewValidityStart && isTransactionReceived">
                <b-button
                    variant="primary"
                    class="text-white"
                    v-b-modal="'review-modal'"
                    v-if="isValidToReview"
                    >Review
                </b-button>
                <a href="" v-else>
                    <span class="text-primary underline">View Review</span>
                </a>
            </div>
        </div>

        <b-modal id="receive-confirmation-modal" title="Receive Item">
            Are you sure that you want to receive this product item?
            <template #modal-footer>
                <b-button
                    variant="primary"
                    class="text-white"
                    @click="receiveItem"
                >
                    <b-spinner
                        small
                        label="Loading..."
                        v-if="isReceiveItemStart"
                    ></b-spinner
                    ><span v-else>Receive</span></b-button
                >
            </template>
        </b-modal>

        <b-modal id="review-modal">
            <template #modal-title>{{ businessIdentifier }}'s review</template>
            <b-form-group label="Content">
                <b-form-textarea
                    required
                    v-model="form.content"
                ></b-form-textarea>
            </b-form-group>
            <b-form-group label="Rating">
                <b-form-rating
                    variant="primary"
                    inline
                    no-border
                    v-model="form.rating"
                ></b-form-rating>
            </b-form-group>
            <template #modal-footer>
                <b-button
                    variant="primary"
                    class="text-white"
                    :disabled="!isFormValid"
                    @click="reviewUser"
                >
                    <b-spinner
                        small
                        label="Loading..."
                        v-if="isReviewUserStart"
                    ></b-spinner
                    ><span v-else>Write Review</span></b-button
                >
            </template>
        </b-modal>
    </div>
</template>
