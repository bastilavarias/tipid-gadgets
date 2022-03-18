<template>
    <v-card flat :color="isEven(index) ? '#EEEEEE' : 'white'">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="primary--text font-weight-bold">
                    Battlefield 2042 (No Trading and Hacking/Cheating)
                </v-list-item-title>

                <v-list-item-subtitle>
                    <span class="primary--text">Software/Games</span
                    ><span class="grey--text"> - posted by</span>
                    <span class="primary--text"> axelangel007</span>
                    <span class="grey--text"> on 18 Mar 2022 — 50 replies</span>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import utilityMixin from '@/mixins/utility';

export default {
    name: 'topic-preview',

    props: {
        index: Number,
    },

    mixins: [utilityMixin],
};
</script>
