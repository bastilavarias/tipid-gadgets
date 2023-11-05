<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { REFERENCE_GET_SEARCH_TYPES } from '@/store/modules/reference';

const defaultForm = {
    keyword: null,
    search_type: null,
};

@Component
export default class SearchCard extends Vue {
    form = Object.assign({}, defaultForm);
    searchTypes = [];

    get isFormValid() {
        return !!this.form.keyword;
    }

    get keyword() {
        return this.$route.query.keyword || null;
    }

    get searchType() {
        return this.$route.query.search_type || null;
    }

    async getSearchTypes() {
        const result = await this.$store.dispatch(REFERENCE_GET_SEARCH_TYPES);
        if (result.success) {
            this.searchTypes = result.data;
        }
    }

    goSearch() {
        this.$router.push({ name: 'Search View', query: { ...this.form } });
    }

    async created() {
        if (this.keyword) {
            // @ts-ignore
            this.form.keyword = this.keyword;
        }
        if (this.searchType) {
            // @ts-ignore
            this.form.search_type = this.searchType;
        }
        await this.getSearchTypes();
    }
}
</script>

<template>
    <b-card sub-title="Search TipidGadgets">
        <b-row>
            <b-col cols="12" class="mb-3">
                <b-input
                    size="sm"
                    placeholder="Keyword"
                    v-model="form.keyword"
                ></b-input>
            </b-col>
            <b-col cols="12" class="mb-3">
                <b-form-select
                    size="sm"
                    :options="[
                        { value: null, text: 'All Types' },
                        ...searchTypes,
                    ]"
                    v-model="form.search_type"
                ></b-form-select>
            </b-col>
            <b-col cols="12">
                <b-btn
                    size="sm"
                    block
                    variant="primary"
                    class="text-white"
                    :disabled="!isFormValid"
                    @click="goSearch"
                    >Search</b-btn
                >
            </b-col>
        </b-row>
    </b-card>
</template>
