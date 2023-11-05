<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductInformation } from '@/types/product';
import dateMixin from '@/mixins/date';
import authenticationModule from '@/store/modules/authentication';
import {
    BOOKMARK_PRODUCT,
    LIKE_PRODUCT,
    PRODUCT_CHECK_BOOKMARK,
    PRODUCT_CHECK_LIKE,
    PRODUCT_COUNT_LIKE,
} from '@/store/modules/product';
import { UserInformation } from '@/types/user';
import { MESSAGE_INQUIRE_PRODUCT } from '@/store/modules/message';

@Component
export default class ProductUserCard extends Vue {
    @Prop(Object) readonly product: ProductInformation | undefined;

    shouldBootActionComponent = false;
    isLiked = false;
    likeCounts = 0;
    isLikeStart = false;
    isBookmarked = false;
    isBookmarkStart = false;
    isInquireStart = false;

    get date() {
        return dateMixin.toPostDate(String(this.product?.created_at));
    }

    get isAuthenticated() {
        return authenticationModule.state.isAuthenticated;
    }

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isPublicViewer() {
        return this.user === null;
    }

    get isAuthor() {
        if (this.user === null) {
            return false;
        }
        return this.product?.user.id === this.user?.id;
    }

    async checkLike() {
        const result = await this.$store.dispatch(
            PRODUCT_CHECK_LIKE,
            this.product?.id
        );
        if (result.success) {
            this.isLiked = result.data;
        }
    }

    async checkBookmark() {
        const result = await this.$store.dispatch(
            PRODUCT_CHECK_BOOKMARK,
            this.product?.id
        );
        if (result.success) {
            this.isBookmarked = result.data;
        }
    }

    async like() {
        const payload = {
            item_id: this.product?.id,
            user_id: this.user?.id,
        };
        this.isLikeStart = true;
        const result = await this.$store.dispatch(LIKE_PRODUCT, payload);
        if (result.success) {
            await this.checkLike();
            await this.getLikesCount();
            this.isLikeStart = false;
            this.$bvToast.toast(
                `You ${this.isLiked ? 'liked' : 'unliked'} this Item`,
                {
                    title: this.product?.name,
                    variant: 'success',
                    solid: true,
                }
            );
            return;
        }
        this.isLikeStart = false;
    }

    async bookmark() {
        const payload = {
            item_id: this.product?.id,
            user_id: this.user?.id,
        };
        this.isBookmarkStart = true;
        const result = await this.$store.dispatch(BOOKMARK_PRODUCT, payload);
        if (result.success) {
            await this.checkBookmark();
            this.isBookmarkStart = false;
            this.$bvToast.toast(
                `You ${
                    this.isBookmarked ? 'bookmarked' : 'un-bookmarked'
                } this Item`,
                {
                    title: this.product?.name,
                    variant: 'success',
                    solid: true,
                }
            );
            return;
        }
        this.isBookmarkStart = false;
    }

    async getLikesCount() {
        const result = await this.$store.dispatch(
            PRODUCT_COUNT_LIKE,
            this.product?.id
        );
        if (result.success) {
            this.likeCounts = result.data;
        }
    }

    async inquire() {
        this.isInquireStart = true;
        const payload = {
            item_id: this.product?.id,
            user_id: this.product?.user.id,
        };
        const result = await this.$store.dispatch(
            MESSAGE_INQUIRE_PRODUCT,
            payload
        );
        if (result.success) {
            this.$bvToast.toast('Product inquiry successfully sent.', {
                title: 'Item Post',
                variant: 'success',
                solid: true,
            });
            setTimeout(() => window.open('/profile/message', '_self'), 2000);
            return;
        }
        this.isInquireStart = false;
    }

    async created() {
        if (this.isAuthenticated) {
            await this.checkLike();
            await this.checkBookmark();
            await this.getLikesCount();
            this.shouldBootActionComponent = true;
        }
    }
}
</script>

<template>
    <b-card style="background-color: #f0f0f0" no-body>
        <div class="p-2">
            <div>
                Posted by
                <router-link
                    :to="{
                        name: 'User Public Profile View',
                        params: { username: product.user.username },
                    }"
                >
                    <span class="text-primary">
                        {{ product.user.username }}
                    </span>
                </router-link>
                on {{ date }}
            </div>
            <div class="mb-3">
                Location:
                <span class="font-weight-bold">{{
                    product.user.location
                }}</span>
                Contact Number:
                <span class="font-weight-bold">{{
                    product.user.contact_number
                }}</span>
            </div>
            <div
                class="d-flex justify-content-between align-content-center"
                v-if="
                    (isPublicViewer || !isAuthor) && shouldBootActionComponent
                "
            >
                <div class="d-flex align-content-center">
                    <b-btn
                        variant="transparent"
                        @click="like"
                        :disabled="isLikeStart"
                    >
                        <b-icon
                            icon="hand-thumbs-up-fill"
                            variant="primary"
                            v-if="isLiked"
                        ></b-icon>
                        <b-icon
                            icon="hand-thumbs-up"
                            variant="primary"
                            v-else
                        ></b-icon>
                        <span class="text-black-50">({{ likeCounts }})</span>
                    </b-btn>
                </div>
                <div class="d-flex align-content-center">
                    <b-btn
                        variant="transparent"
                        @click="inquire"
                        :disabled="isInquireStart"
                    >
                        <b-icon
                            icon="chat-dots-fill"
                            variant="primary"
                        ></b-icon>
                    </b-btn>
                    <b-btn
                        variant="transparent"
                        @click="bookmark"
                        :disabled="isBookmarkStart"
                    >
                        <b-icon
                            icon="bookmark-fill"
                            variant="primary"
                            v-if="isBookmarked"
                        ></b-icon>
                        <b-icon
                            icon="bookmark"
                            variant="primary"
                            v-else
                        ></b-icon>
                    </b-btn>
                </div>
            </div>
        </div>
    </b-card>
</template>
