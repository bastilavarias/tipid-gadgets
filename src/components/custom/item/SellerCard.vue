<template>
    <v-card color="#f0f0f0" flat outlined>
        <v-list-item three-line>
            <v-list-item-avatar v-if="avatar">
                <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title
                    class="d-flex align-center pointer"
                    @click="goToUser(username)"
                    ><span class="primary--text font-weight-bold mr-1">{{
                        username
                    }}</span>
                    <v-chip small class="font-weight-bold">{{
                        section.slug === 'item_for_sale' ? 'Seller' : 'Buyer'
                    }}</v-chip>
                </v-list-item-title>
                <v-list-item-subtitle
                    >on
                    {{ toPostDate(createdAt) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                    ><span v-if="location">
                        Location:
                        <span class="font-weight-bold secondary--text">{{
                            location
                        }}</span>
                    </span>
                    <span class="grey--text" v-else>
                        No location included
                    </span></v-list-item-subtitle
                >
            </v-list-item-content>
            <v-list-item-action v-if="isAuthenticated && !isOwnAccount">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            :loading="isInquireStart"
                            @click="inquire"
                        >
                            <v-icon>mdi-message-text</v-icon>
                        </v-btn>
                    </template>
                    <span>Inquire</span>
                </v-tooltip>
            </v-list-item-action>
        </v-list-item>

        <v-card-text>
            <v-row dense>
                <v-col col="12" md="6">
                    <div class="d-flex">
                        <span class="mr-1">
                            <rating-status-chip
                                rating="positive"
                            ></rating-status-chip>
                        </span>
                        <span>
                            {{ positiveRatingsPercentage }}% ({{
                                positiveRatingsCount
                            }}
                            review<span v-if="positiveRatingsCount > 1">s</span
                            >)
                        </span>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="d-flex">
                        <span class="mr-1">
                            <rating-status-chip
                                rating="negative"
                            ></rating-status-chip>
                        </span>
                        <span>
                            {{ negativeRatingsPercentage }}% ({{
                                negativeRatingsCount
                            }}
                            review<span v-if="negativeRatingsCount > 1">s</span
                            >)
                        </span>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text class="pt-0 pb-0">
            <v-toolbar flat color="transparent" dense>
                <v-tooltip bottom v-if="!isAuthenticated">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            small
                            v-bind="attrs"
                            v-on="on"
                            depressed
                            text
                            style="color: rgba(0, 0, 0, 0.6)"
                            ><v-icon small>mdi-thumb-up</v-icon
                            ><span>({{ toMillify(likesCount) }})</span></v-btn
                        >
                    </template>
                    <span>{{ toMillify(likesCount) }} likes</span>
                </v-tooltip>
                <v-tooltip bottom v-if="isAuthenticated">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            small
                            v-bind="attrs"
                            v-on="on"
                            depressed
                            :color="isLiked ? 'primary' : '#f0f0f0'"
                            :text="isLiked"
                            @click="likeItem"
                            style="color: rgba(0, 0, 0, 0.6)"
                            ><v-icon small>mdi-thumb-up</v-icon
                            ><span>({{ toMillify(likesCount) }})</span></v-btn
                        >
                    </template>
                    <span>{{ isLiked ? 'Unlike' : 'Like' }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            small
                            v-bind="attrs"
                            v-on="on"
                            depressed
                            text
                            style="color: rgba(0, 0, 0, 0.6)"
                            ><v-icon small>mdi-eye</v-icon
                            ><span>({{ toMillify(viewsCount) }})</span></v-btn
                        >
                    </template>
                    <span>{{ toMillify(viewsCount) }} Views</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-tooltip bottom v-if="isAuthenticated">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            small
                            icon
                            v-bind="attrs"
                            v-on="on"
                            :color="isBookmarked ? 'primary' : ''"
                            @click="bookmarkItem"
                            ><v-icon small>mdi-bookmark</v-icon></v-btn
                        >
                    </template>
                    <span>{{
                        isBookmarked ? 'Remove bookmark' : 'Bookmark'
                    }}</span>
                </v-tooltip>
                <v-tooltip bottom v-if="isAuthenticated">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon v-bind="attrs" v-on="on"
                            ><v-icon small>mdi-alert</v-icon></v-btn
                        >
                    </template>
                    <span>Report to Admin</span>
                </v-tooltip>
            </v-toolbar>
        </v-card-text>
    </v-card>
</template>

<script>
import dateMixin from '@/mixins/date';
import RatingStatusChip from '@/components/custom/RatingStatusChip';
import {
    BOOKMARK_ITEM,
    CHECK_ITEM_BOOKMARK,
    CHECK_ITEM_LIKE,
    COUNT_ITEM_LIKE,
    COUNT_ITEM_VIEW,
    LIKE_ITEM,
} from '@/store/types/item';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';
import redirectionMixin from '@/mixins/redirection';
import { DELETE_TOPIC } from '@/store/types/topic';
import { INQUIRE_MESSAGE } from '@/store/types/message';

export default {
    name: 'item-seller-card',

    components: { RatingStatusChip },

    mixins: [dateMixin, utilityMixin, redirectionMixin],

    props: {
        itemID: Number,
        userID: Number,
        avatar: String,
        username: String,
        createdAt: String,
        location: String,
        section: Object,
        positiveRatingsCount: Number,
        negativeRatingsCount: Number,
        positiveRatingsPercentage: Number,
        negativeRatingsPercentage: Number,
    },

    data() {
        return {
            isBookmarked: false,
            isLiked: false,
            likesCount: 0,
            viewsCount: 0,
            isInquireStart: false,
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        isOwnAccount() {
            if (!this.isAuthenticated) return false;
            const user = this.$store.state.authentication.user;
            return this.userID === user.id;
        },
    },

    methods: {
        async bookmarkItem() {
            const payload = {
                item_id: this.itemID,
            };
            const { code, message } = await this.$store.dispatch(
                BOOKMARK_ITEM,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                await this.checkItemBookmark();
                return;
            }
            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                open: true,
                message,
                color: 'error',
            });
        },

        async likeItem() {
            const payload = {
                item_id: this.itemID,
            };
            const { code, message } = await this.$store.dispatch(
                LIKE_ITEM,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                await this.checkItemLike();
                await this.getLikesCount();
                return;
            }
            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                open: true,
                message,
                color: 'error',
            });
        },

        async getLikesCount() {
            this.likesCount = await this.$store.dispatch(
                COUNT_ITEM_LIKE,
                this.itemID
            );
        },

        async getViewsCount() {
            this.viewsCount = await this.$store.dispatch(
                COUNT_ITEM_VIEW,
                this.itemID
            );
        },

        async checkItemLike() {
            this.isLiked = await this.$store.dispatch(
                CHECK_ITEM_LIKE,
                this.itemID
            );
        },

        async checkItemBookmark() {
            this.isBookmarked = await this.$store.dispatch(
                CHECK_ITEM_BOOKMARK,
                this.itemID
            );
        },

        async inquire() {
            const payload = {
                item_id: this.itemID,
                user_id: this.userID,
            };
            this.isInquireStart = true;
            const { code, data } = await this.$store.dispatch(
                INQUIRE_MESSAGE,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                await this.$router.push({
                    name: 'message',
                    query: { roomID: data.id },
                });
                this.isInquireStart = false;
                return;
            }
            this.isInquireStart = false;
        },
    },

    async created() {
        await this.getLikesCount();
        await this.getViewsCount();
        if (this.isAuthenticated) {
            await this.checkItemLike();
            await this.checkItemBookmark();
        }
    },
};
</script>
