<template>
    <v-card
        :color="isEven(index) || isCardComponent ? '#EEEEEE' : 'white'"
        height="auto"
        :flat="!isCardComponent"
        class="d-block"
    >
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{ name: 'view-item', params: { slug } }"
                        style="text-decoration: none"
                        >{{ name }}</router-link
                    >
                </v-list-item-title>

                <v-list-item-subtitle>
                    <span class="secondary--text font-weight-bold">{{
                        formatCurrency('PHP', price)
                    }}</span>
                    - <span class="primary--text">{{ category.name }}</span
                    ><span class="grey--text"
                        >({{ user.location || 'No location included' }})</span
                    >
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <template v-if="isCardComponent">
            <v-row no-gutters v-if="isGetImagesStart">
                <template v-for="i in 2">
                    <v-col :key="i" xs="12" md="6">
                        <v-skeleton-loader type="image"> </v-skeleton-loader>
                    </v-col>
                </template>
            </v-row>
            <masonry :cols="2" :gutter="0">
                <div v-for="(image, index) in images" :key="index">
                    <v-img
                        width="100%"
                        height="auto"
                        :src="image"
                        :key="index"
                    ></v-img>
                </div>
            </masonry>
        </template>
    </v-card>
</template>

<script>
import utilityMixin from '@/mixins/utility';
import { GET_ITEM_IMAGES } from '@/store/types/item';

export default {
    name: 'item-preview',

    props: {
        index: Number,
        itemID: Number,
        name: String,
        price: String,
        category: Object,
        user: Object,
        slug: String,
        component: String,
    },

    mixins: [utilityMixin],

    data() {
        return {
            model: 0,
            colors: [
                'primary',
                'secondary',
                'yellow darken-2',
                'red',
                'orange',
            ],
            isGetImagesStart: false,
            images: [],
        };
    },

    computed: {
        isCardComponent() {
            return this.component && this.component === 'card';
        },
    },

    watch: {
        component() {
            if (this.isCardComponent) this.getImages();
        },
    },

    methods: {
        async getImages() {
            this.isGetImagesStart = true;
            this.images = await this.$store.dispatch(
                GET_ITEM_IMAGES,
                this.itemID
            );
            this.isGetImagesStart = false;
        },
    },

    async created() {
        if (this.isCardComponent) await this.getImages();
    },
};
</script>
