<template>
    <v-card outlined>
        <v-list-item two-line>
            <v-list-item-avatar v-if="reviewer.avatar">
                <v-img :src="reviewer.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{
                            name: 'user/information',
                            params: { username: reviewer.username },
                        }"
                        style="text-decoration: none"
                        >{{ reviewer.username }}</router-link
                    >
                </v-list-item-title>
                <v-list-item-subtitle
                    >on {{ toPostDate(createdAt) }}</v-list-item-subtitle
                >
            </v-list-item-content>
            <v-card-actions>
                <rating-status-chip :rating="rating"></rating-status-chip>
            </v-card-actions>
        </v-list-item>

        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <item-preview
                        :itemID="item.id"
                        :name="item.name"
                        :price="item.price"
                        :category="item.category"
                        :user="item.user"
                        component="list-item"
                        :slug="item.slug"
                        :index="0"
                    ></item-preview>
                </v-col>

                <v-col cols="12">
                    {{ content }}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import RatingStatusChip from '@/components/custom/RatingStatusChip';
import dateMixin from '@/mixins/date';
import ItemPreview from '@/components/custom/preview/Item';
export default {
    name: 'rating-preview',

    components: { ItemPreview, RatingStatusChip },

    mixins: [dateMixin],

    props: {
        rating: String,
        reviewer: Object,
        item: Object,
        content: String,
        createdAt: String,
    },
};
</script>
