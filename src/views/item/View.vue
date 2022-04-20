<template>
    <v-row>
        <v-col cols="12" v-if="information">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Item Details</v-card-title
                >
                <v-card-subtitle class="primary--text"
                    >{{ information.item_section.name }}:
                    {{ information.item_category.name }}</v-card-subtitle
                >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title
                            class="primary--text font-weight-bold"
                            >{{ information.name }}</v-list-item-title
                        >
                        <v-list-item-subtitle
                            class="success--text font-weight-bold"
                            >{{
                                formatCurrency('PHP', information.price)
                            }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle>
                            <span class="font-weight-bold success--text">{{
                                information.item_condition.name
                            }}</span>
                            <span class="mx-1">with</span>
                            <span class="font-weight-bold success--text">{{
                                information.item_warranty.name
                            }}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text
                    class="secondary--text"
                    v-html="information.description"
                >
                </v-card-text>

                <v-card-text>
                    <v-card color="#f0f0f0" flat outlined>
                        <v-list-item three-line>
                            <v-list-item-avatar>
                                <v-img :src="information.user.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center"
                                    ><span
                                        class="primary--text font-weight-bold mr-1"
                                        >{{ information.user.username }}</span
                                    >
                                    <v-chip small class="font-weight-bold"
                                        >Seller</v-chip
                                    >
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    >on May 14, 2021 01:05
                                    PM</v-list-item-subtitle
                                >
                                <v-list-item-subtitle
                                    >Location:
                                    <span
                                        class="font-weight-bold secondary--text"
                                        >Quezon City, Metro Manila</span
                                    ></v-list-item-subtitle
                                >
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
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

                        <v-toolbar flat color="transparent" dense>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            icon
                                            small
                                            v-bind="attrs"
                                            v-on="on"
                                            ><v-icon small
                                                >mdi-bookmark</v-icon
                                            ></v-btn
                                        >
                                    </template>
                                    <span>Bookmark</span>
                                </v-tooltip>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            icon
                                            small
                                            v-bind="attrs"
                                            v-on="on"
                                            ><v-icon small
                                                >mdi-alert</v-icon
                                            ></v-btn
                                        >
                                    </template>
                                    <span>Report to Admin</span>
                                </v-tooltip>
                            </v-toolbar-items>
                        </v-toolbar>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import RatingStatusChip from '@/components/custom/RatingStatusChip';
import { GET_ITEM } from '@/store/types/item';
import utilityMixin from '@/mixins/utility';

export default {
    components: { RatingStatusChip },

    mixins: [utilityMixin],

    data() {
        return {
            information: null,
        };
    },

    computed: {
        slug() {
            return this.$route.params.slug || null;
        },
    },

    methods: {
        async getInformation() {
            this.information = await this.$store.dispatch(GET_ITEM, this.slug);
            this.$nextTick(() => {
                this.$vuetify.goTo(0);
            });
        },
    },

    async created() {
        if (!this.slug) return this.$router.go(-1);
        await this.getInformation();
    },
};
</script>
