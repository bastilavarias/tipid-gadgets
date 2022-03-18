<template>
    <v-card flat :color="isEven(index) ? '#EEEEEE' : 'white'">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{ name: 'view-item' }"
                        style="text-decoration: none"
                        >Lenovo ideapad L3 15.6inch i3-10110u Ram 8gb Hdd
                        1TB</router-link
                    >
                </v-list-item-title>

                <v-list-item-subtitle>
                    <span class="secondary--text font-weight-bold"
                        >PHP 19999.00</span
                    >
                    - <span class="primary--text">Laptops/PDAs</span
                    ><span class="grey--text">(Pasay City, Metro Manila)</span>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import utilityMixin from '@/mixins/utility';

export default {
    name: 'item-preview',

    props: {
        index: Number,
    },

    mixins: [utilityMixin],
};
</script>
