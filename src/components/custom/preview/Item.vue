<template>
    <v-card
        flat
        :color="isEven(index) || component === 'card' ? '#EEEEEE' : 'white'"
    >
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{ name: 'view-item' }"
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

        <v-carousel v-model="model" v-if="component === 'card'">
            <v-carousel-item v-for="(color, i) in colors" :key="color">
                <v-sheet :color="color" height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                        <div class="text-h2">Slide {{ i + 1 }}</div>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-card>
</template>

<script>
import utilityMixin from '@/mixins/utility';

export default {
    name: 'item-preview',

    props: {
        index: Number,
        name: String,
        price: String,
        category: Object,
        user: Object,
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
        };
    },
};
</script>
