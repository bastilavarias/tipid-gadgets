<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import BaseRichTextEditor from '@/components/BaseRichTextEditor.vue';
import {
    REFERENCE_GET_ITEM_CATEGORIES,
    REFERENCE_GET_ITEM_CONDITIONS,
    REFERENCE_GET_ITEM_SECTIONS,
    REFERENCE_GET_ITEM_WARRANTIES,
} from '@/store/modules/reference';
import {
    CREATE_PRODUCT,
    GET_PRODUCT,
    UPDATE_PRODUCT,
} from '@/store/modules/product';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import { ProductInformation } from '@/types/product';

const defaultForm = {
    item_section_id: null,
    name: null,
    item_category_id: null,
    price: null,
    item_condition_id: null,
    item_warranty_id: null,
    description: null,
    id: null,
};

@Component({
    components: { BaseRichTextEditor, BaseContentCard },
})
export default class ProductActionView extends Vue {
    form = Object.assign({}, defaultForm);
    product: ProductInformation | null = null;
    error = null;
    isActionStart = false;
    sections = [];
    categories = [];
    conditions = [];
    warranties = [];
    shouldBootPage = false;

    get operation() {
        const action = this.$route.query.action;
        return {
            create: action === 'new',
            update: action === 'edit',
        };
    }

    get cardTitle() {
        let title = 'Post an Item';
        if (this.operation.update) {
            title = 'Update an Item';
        }
        return title;
    }

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    @Watch('$route.query.action')
    onChangeActionRouteQuery(value: any) {
        if (value === 'new') {
            this.form = Object.assign({}, defaultForm);
        }
    }

    async onCreate() {
        this.isActionStart = true;
        const result = await this.$store.dispatch(CREATE_PRODUCT, this.form);
        if (result.success) {
            this.$bvToast.toast('Item was successfully posted.', {
                title: 'Item Post Complete',
                variant: 'success',
                solid: true,
            });
            setTimeout(() => window.open('/', '_self'), 2000); // for the meantime it should be redirected in Home View but if the user items page are ready it will be then.
            return;
        }
        this.error = result.error;
        this.isActionStart = false;
    }

    async onUpdate() {
        const slug = this.$route.query.slug;
        if (this.operation.update && slug) {
            this.isActionStart = true;
            const result = await this.$store.dispatch(
                UPDATE_PRODUCT,
                this.form
            );
            if (result.success) {
                this.$bvToast.toast('Item was successfully updated.', {
                    title: 'Item Post Complete',
                    variant: 'success',
                    solid: true,
                });
                setTimeout(
                    () => window.open('/profile/item-favorite', '_self'),
                    2000
                ); // for the meantime it should be redirected in Home View but if the user items page are ready it will be then.
                return;
            }
            this.error = result.error;
            this.isActionStart = false;
        }
    }

    async save() {
        if (this.operation.create) {
            await this.onCreate();
            return;
        }
        await this.onUpdate();
    }

    async getProduct(): Promise<ProductInformation | void> {
        const slug = this.$route.query.slug;
        const result = await this.$store.dispatch(GET_PRODUCT, slug);
        if (result.success) {
            const {
                id,
                description,
                item_category_id,
                item_condition_id,
                item_section_id,
                item_warranty_id,
                name,
                price,
            } = result.data;
            this.form = Object.assign(
                {},
                {
                    id,
                    description: description.content,
                    item_category_id,
                    item_condition_id,
                    item_section_id,
                    item_warranty_id,
                    name,
                    price,
                }
            );
            this.product = Object.assign({}, result.data);
            return;
        }
        await this.$router.go(-1);
    }

    async getSections() {
        const result = await this.$store.dispatch(REFERENCE_GET_ITEM_SECTIONS);
        if (result.success) {
            this.sections = result.data;
        }
    }

    async getCategories() {
        const result = await this.$store.dispatch(
            REFERENCE_GET_ITEM_CATEGORIES
        );
        if (result.success) {
            this.categories = result.data;
        }
    }

    async getConditions() {
        const result = await this.$store.dispatch(
            REFERENCE_GET_ITEM_CONDITIONS
        );
        if (result.success) {
            this.conditions = result.data;
        }
    }

    async getWarranties() {
        const result = await this.$store.dispatch(
            REFERENCE_GET_ITEM_WARRANTIES
        );
        if (result.success) {
            this.warranties = result.data;
        }
    }

    validateIfAuthor() {
        let isAuthor = false;
        if (!this.user) {
            return isAuthor;
        }
        if (this.user.id !== this.product?.user.id) {
            return isAuthor;
        }
        isAuthor = true;
        return isAuthor;
    }

    async created() {
        if (this.operation.update) {
            await this.getProduct();
            const isAuthor = this.validateIfAuthor();
            if (!isAuthor) {
                this.$router.go(-1);
            }
        }
        await this.getSections();
        await this.getCategories();
        await this.getConditions();
        await this.getWarranties();
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <base-content-card :title="cardTitle">
        <div class="py-5" v-if="shouldBootPage">
            <b-row class="d-flex justify-content-center">
                <b-col cols="12" md="10" lg="8">
                    <b-alert show variant="danger" v-if="error">{{
                        error
                    }}</b-alert>
                    <b-form class="mb-4">
                        <b-form-group id="tips-group">
                            To post an item, complete the form below and click
                            the submit button. All fields are mandatory.
                            <a href="#">Some helpful tips for new Posters. </a>
                        </b-form-group>

                        <b-form-group id="site-rules-group">
                            Please read the
                            <a href="#">site rules </a> before posting.
                        </b-form-group>

                        <b-form-group label="Section">
                            <b-form-select
                                v-model="form.item_section_id"
                                :options="sections"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group label="Item name">
                            <b-form-input
                                required
                                v-model="form.name"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Category">
                            <b-form-select
                                v-model="form.item_category_id"
                                :options="categories"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group label="Price or Budget">
                            <b-form-input
                                type="number"
                                required
                                v-model="form.price"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Condition">
                            <b-form-select
                                v-model="form.item_condition_id"
                                :options="conditions"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group label="Warranty">
                            <b-form-select
                                v-model="form.item_warranty_id"
                                :options="warranties"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group label="Description">
                            <base-rich-text-editor
                                v-model="form.description"
                            ></base-rich-text-editor>
                        </b-form-group>

                        <b-button
                            variant="primary"
                            class="text-white"
                            :disabled="isActionStart"
                            block
                            @click="save"
                        >
                            <b-spinner
                                small
                                label="Loading..."
                                v-if="isActionStart"
                            ></b-spinner
                            ><span v-else>Post my Item</span>
                        </b-button>
                    </b-form>
                </b-col>
            </b-row>
        </div>
    </base-content-card>
</template>
