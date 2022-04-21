<template>
    <v-card color="#f0f0f0" flat outlined>
        <v-list-item three-line>
            <v-list-item-avatar>
                <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="d-flex align-center"
                    ><span class="primary--text font-weight-bold mr-1">{{
                        username
                    }}</span>
                    <v-chip small class="font-weight-bold">Seller</v-chip>
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
            <v-list-item-action>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" icon v-bind="attrs" v-on="on">
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
                        <span> 100% (678 feedbacks) </span>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="d-flex">
                        <span class="mr-1">
                            <rating-status-chip
                                rating="negative"
                            ></rating-status-chip>
                        </span>
                        <span> 0% (0 feedbacks) </span>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="pt-0 pb-0">
            <v-toolbar flat color="transparent" dense>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            depressed
                            :color="isLiked ? 'primary' : '#f0f0f0'"
                            :text="isLiked"
                            @click="likeItem"
                            style="color: rgba(0, 0, 0, 0.6)"
                            v-if="isAuthenticated"
                            ><v-icon>mdi-thumb-up</v-icon>(99)</v-btn
                        >
                    </template>
                    <span>{{ isLiked ? 'Unlike' : 'Like' }}</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            :color="isBookmarked ? 'primary' : ''"
                            @click="bookmarkItem"
                            v-if="isAuthenticated"
                            ><v-icon>mdi-bookmark</v-icon></v-btn
                        >
                    </template>
                    <span>{{
                        isBookmarked ? 'Remove bookmark' : 'Bookmark'
                    }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on"
                            ><v-icon>mdi-alert</v-icon></v-btn
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
    LIKE_ITEM,
} from '@/store/types/item';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';

export default {
    name: 'item-seller-card',

    components: { RatingStatusChip },

    mixins: [dateMixin, utilityMixin],

    props: {
        itemID: Number,
        avatar: String,
        username: String,
        createdAt: String,
        location: String,
    },

    data() {
        return {
            isBookmarked: false,
            isLiked: false,
        };
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
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
                this.isBookmarked = await this.$store.dispatch(
                    CHECK_ITEM_BOOKMARK,
                    this.itemID
                );
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
                this.isLiked = await this.$store.dispatch(
                    CHECK_ITEM_LIKE,
                    this.itemID
                );
                return;
            }
            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                open: true,
                message,
                color: 'error',
            });
        },
    },

    async created() {
        if (this.isAuthenticated) {
            this.isLiked = await this.$store.dispatch(
                CHECK_ITEM_LIKE,
                this.itemID
            );
            this.isBookmarked = await this.$store.dispatch(
                CHECK_ITEM_BOOKMARK,
                this.itemID
            );
        }
    },
};
</script>
