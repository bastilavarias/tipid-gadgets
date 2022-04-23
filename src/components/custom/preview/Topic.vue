<template>
    <v-card flat :color="isEven(index) ? '#EEEEEE' : 'white'">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{ name: 'view-topic', params: { slug } }"
                        style="text-decoration: none"
                        >{{ name }}</router-link
                    >
                </v-list-item-title>

                <v-list-item-subtitle>
                    <span class="primary--text">{{ section.name }}</span
                    ><span class="grey--text"> - posted by</span>
                    <span class="primary--text"> {{ user.username }}</span>
                    <span class="grey--text">
                        on {{ toPostDate(createdAt) }} — 50 replies</span
                    >
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import utilityMixin from '@/mixins/utility';
import dateMixin from '@/mixins/date';

export default {
    name: 'topic-preview',

    mixins: [utilityMixin, dateMixin],

    props: {
        index: Number,
        topicID: Number,
        name: String,
        section: Object,
        user: Object,
        createdAt: String,
        slug: String,
    },
};
</script>
