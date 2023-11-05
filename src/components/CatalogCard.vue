<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { REFERENCE_GET_ITEM_CATEGORIES } from '@/store/modules/reference';

const defaultForm = {
    item_category: null,
    search_type: null,
};

@Component
export default class CatalogCard extends Vue {
    categories = [];
    types = [
        { value: null, text: 'All Types' },
        { value: 'items_for_sale', text: 'Items for Sale' },
        { value: 'want_to_buys', text: 'Want to Buys' },
    ];
    form = Object.assign({}, defaultForm);

    async getCategories() {
        const result = await this.$store.dispatch(
            REFERENCE_GET_ITEM_CATEGORIES
        );
        if (result.success) {
            this.categories = result.data;
        }
    }

    goSearch() {
        this.$router.push({ name: 'Search View', query: { ...this.form } });
    }

    async created() {
        await this.getCategories();
    }
}
</script>

<template>
    <b-card sub-title="Browse the Catalog">
        <b-row>
            <b-col cols="12" class="mb-3">
                <b-form-select
                    size="sm"
                    :options="[
                        { value: null, text: 'All Categories' },
                        ...categories,
                    ]"
                    v-model="form.item_category"
                ></b-form-select>
            </b-col>
            <b-col cols="12" class="mb-3">
                <b-form-select
                    size="sm"
                    :options="types"
                    v-model="form.search_type"
                ></b-form-select>
            </b-col>

            <b-col cols="12">
                <b-btn
                    size="sm"
                    block
                    variant="primary"
                    class="text-white"
                    @click="goSearch"
                    >Show Items</b-btn
                >
            </b-col>
        </b-row>
    </b-card>
</template>
