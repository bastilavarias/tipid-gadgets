<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Item Details</v-card-title
                >
                <v-card-subtitle class="primary--text"
                    >Items for Sale: Laptops/PDAs</v-card-subtitle
                >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title
                            class="primary--text font-weight-bold"
                            >Lenovo Ideapad Slim3 Core i5 10Gen 1.0 Ghz 512Gb
                            SSd 2Gb Nvidia mx330</v-list-item-title
                        >
                        <v-list-item-subtitle
                            class="success--text font-weight-bold"
                            >PHP 24800.00</v-list-item-subtitle
                        >
                        <v-list-item-subtitle>
                            <span class="font-weight-bold success--text"
                                >Already Used</span
                            >
                            <span class="mx-1">with</span>
                            <span class="font-weight-bold success--text"
                                >Personal Warranty</span
                            >
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text class="secondary--text" v-html="sampleHTML">
                </v-card-text>

                <v-card-text>
                    <v-card color="#f0f0f0" flat outlined>
                        <v-list-item three-line>
                            <v-list-item-avatar>
                                <v-img
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center"
                                    ><span
                                        class="primary--text font-weight-bold mr-1"
                                        >bastilavar21</span
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
export default {
    components: { RatingStatusChip },

    data() {
        return {
            sampleHTML: ``,
        };
    },
};
</script>
