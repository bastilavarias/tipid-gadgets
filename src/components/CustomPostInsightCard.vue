<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { GET_POST_INSIGHT } from '@/store/modules/insight';

@Component
export default class CustomPostInsightCard extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(String) readonly type: string | undefined;

    insight = {
        reach: 0,
        unique_viewers: 0,
        likes: 0,
        bookmarks: 0,
    };

    toInsightLabel(identifier: string) {
        const label = {
            reach: {
                text: 'Post Reach',
                icon: 'bar-chart',
            },
            unique_viewers: {
                text: 'Viewers',
                icon: 'eye',
            },
            likes: {
                text: 'Likes',
                icon: 'hand-thumbs-up',
            },
            bookmarks: {
                text: 'Bookmarks',
                icon: 'bookmark',
            },
        };
        //@ts-ignore
        return label[identifier];
    }

    async getInsight() {
        const payload = {
            id: this.id,
            type: this.type,
        };
        const result = await this.$store.dispatch(GET_POST_INSIGHT, payload);
        if (result.success) {
            this.insight = Object.assign({}, result.data);
        }
    }

    async created() {
        await this.getInsight();
    }
}
</script>

<template>
    <b-card style="background-color: #f0f0f0" no-body>
        <div class="p-2">
            <p class="small">Post Insights</p>
            <div class="d-flex justify-content-around">
                <template v-for="(_insight, index) in Object.keys(insight)">
                    <div
                        class="d-flex flex-column align-items-center"
                        :key="index"
                    >
                        <p class="lead mb-0">{{ insight[_insight] }}</p>
                        <div class="d-flex align-items-center">
                            <b-icon
                                :icon="toInsightLabel(_insight).icon"
                                class="mr-1"
                            ></b-icon>
                            <span class="small">{{
                                toInsightLabel(_insight).text
                            }}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </b-card>
</template>
