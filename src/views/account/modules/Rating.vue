<template>
    <v-row>
        <v-col cols="12">
            <v-row dense>
                <v-col cols="12">
                    <v-row dense>
                        <template v-for="n in 5">
                            <v-col cols="12" :key="n">
                                <rating-preview
                                    :rating="
                                        isEven(n) ? 'positive' : 'negative'
                                    "
                                ></rating-preview>
                            </v-col>
                        </template>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import RatingPreview from '@/components/custom/preview/Rating';
import utilityMixin from '@/mixins/utility';

export default {
    components: { RatingPreview },

    mixins: [utilityMixin],
};
</script>
