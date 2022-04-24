<template>
    <v-card flat color="transparent">
        <div class="mb-5">
            <div class="caption font-weight-bold">Post Insights</div>
            <div class="caption" style="color: rgba(0, 0, 0, 0.6)">
                Only you can see this
            </div>
        </div>

        <v-row
            justify="space-around"
            align-content="center"
            v-if="insights && !isGetInsightsStart"
        >
            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">{{ toMillify(insights.reach) }}</span>
                <span class="d-flex align-center">
                    <v-icon color="blue" small class="mr-1"
                        >mdi-google-analytics</v-icon
                    >
                    <span class="caption">Post Reach</span>
                </span>
            </div>

            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">{{
                    toMillify(insights.unique_viewers)
                }}</span>
                <span class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-eye</v-icon>
                    <span class="caption">Unique Viewers</span>
                </span>
            </div>

            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">{{ toMillify(insights.likes) }}</span>
                <span class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-thumb-up</v-icon>
                    <span class="caption">Likes</span>
                </span>
            </div>

            <div
                class="d-flex flex-column align-center align-content-center justify-center"
            >
                <span class="title">{{ toMillify(insights.bookmarks) }}</span>
                <span class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-bookmark</v-icon>
                    <span class="caption">Bookmarks</span>
                </span>
            </div>
        </v-row>
    </v-card>
</template>

<script>
import { GET_ITEM_INSIGHT, GET_TOPIC_INSIGHT } from '@/store/types/insight';
import utilityMixin from '@/mixins/utility';

export default {
    name: 'post-insight-card',

    mixins: [utilityMixin],

    props: {
        id: Number,
        type: String,
    },

    data() {
        return {
            isGetInsightsStart: false,
            insights: null,
        };
    },

    methods: {
        async getInsights() {
            this.isGetInsightsStart = true;
            const actionName =
                this.type === 'item' ? GET_ITEM_INSIGHT : GET_TOPIC_INSIGHT;
            this.insights = await this.$store.dispatch(actionName, this.id);
            this.isGetInsightsStart = false;
        },
    },

    async created() {
        await this.getInsights();
    },
};
</script>
