<template>
    <v-row>
        <v-col cols="12" v-if="information">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Item Details</v-card-title
                >
                <v-card-subtitle class="primary--text"
                    >{{ information.section.name }}:
                    {{ information.category.name }}</v-card-subtitle
                >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title
                            class="primary--text font-weight-bold"
                            >{{ information.name }}</v-list-item-title
                        >
                        <v-list-item-subtitle
                            class="success--text font-weight-bold"
                            >{{
                                formatCurrency('PHP', information.price)
                            }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle>
                            <span class="font-weight-bold success--text">{{
                                information.condition.name
                            }}</span>
                            <span class="mx-1">with</span>
                            <span class="font-weight-bold success--text">{{
                                information.warranty.name
                            }}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text
                    class="secondary--text"
                    v-html="information.description.content"
                >
                </v-card-text>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" v-if="isAuthenticated">
                            <item-post-insight-card
                                :itemID="information.id"
                            ></item-post-insight-card>
                        </v-col>

                        <v-col cols="12">
                            <item-seller-card
                                :itemID="information.id"
                                :avatar="information.user.avatar"
                                :username="information.user.username"
                                :created-at="information.created_at"
                                :location="information.user.location"
                            ></item-seller-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { GET_ITEM, VIEW_ITEM } from '@/store/types/item';
import utilityMixin from '@/mixins/utility';
import ItemSellerCard from '@/components/custom/item/SellerCard';
import ItemPostInsightCard from '@/components/custom/item/PostInsightCard';

export default {
    components: { ItemPostInsightCard, ItemSellerCard },

    mixins: [utilityMixin],

    data() {
        return {
            information: null,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user || null;
        },

        slug() {
            return this.$route.params.slug || null;
        },

        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },
    },

    watch: {
        async information(val) {
            if (val) {
                const payload = {
                    item_id: this.information.id,
                    user_id: this.user.id || null,
                };
                await this.$store.dispatch(VIEW_ITEM, payload);
            }
        },
    },

    methods: {
        async getInformation() {
            this.information = await this.$store.dispatch(GET_ITEM, this.slug);
            this.$nextTick(() => {
                this.$vuetify.goTo(0, { duration: 0, easing: 'linear' });
            });
        },
    },

    async created() {
        if (!this.slug) return this.$router.go(-1);
        await this.getInformation();
    },
};
</script>
