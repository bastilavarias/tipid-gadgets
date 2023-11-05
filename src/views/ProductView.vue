<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import ProductUserCard from '@/components/ProductUserCard.vue';
import { GET_PRODUCT, VIEW_PRODUCT } from '@/store/modules/product';
import { ProductInformation } from '@/types/product';
import authenticationModule from '@/store/modules/authentication';
import { UserInformation } from '@/types/user';
import utilityMixin from '@/mixins/utility';
import CustomPostInsightCard from '@/components/CustomPostInsightCard.vue';

@Component({
    components: { CustomPostInsightCard, ProductUserCard, BaseContentCard },
})
export default class ProductView extends Vue {
    product: ProductInformation | null = null;
    shouldBootPage = false;

    get slug() {
        return this.$route.params.productSlug || null;
    }

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isPublicViewer() {
        return this.user === null;
    }

    get isAuthor() {
        return this.product?.user.id === this.user?.id;
    }

    async getProduct() {
        const result = await this.$store.dispatch(GET_PRODUCT, this.slug);
        if (result.success) {
            this.product = Object.assign({}, result.data);
            this.shouldBootPage = true;
        }
    }

    async viewPost() {
        const payload = {
            item_id: this.product?.id,
            user_id: this.user?.id,
        };
        await this.$store.dispatch(VIEW_PRODUCT, payload);
    }

    toSearchType(type: string) {
        return utilityMixin.toItemSectionSearchType(type);
    }

    async created() {
        await this.getProduct();
        await this.viewPost();
    }
}
</script>

<template>
    <base-content-card title="Item Details">
        <div class="d-flex flex-column" v-if="shouldBootPage">
            <div class="pt-2 mb-2">
                <router-link
                    :to="{
                        name: 'Search View',
                        query: {
                            search_type: toSearchType(product.section.slug),
                        },
                    }"
                >
                    <span class="text-primary">
                        {{ product.section.name }}
                    </span>
                </router-link>
                :
                <router-link
                    :to="{
                        name: 'Search View',
                        query: {
                            search_type: toSearchType(product.section.slug),
                            item_category: product.category.id,
                        },
                    }"
                >
                    <span class="text-primary">
                        {{ product.category.name }}
                    </span>
                </router-link>
            </div>
            <div class="d-flex flex-column mb-3">
                <div>
                    <span class="h5 text-primary font-weight-bold">
                        {{ product.name }}
                    </span>
                </div>
                <div>
                    <span class="text-success font-weight-bold">
                        PHP {{ product.price }}
                    </span>
                </div>
            </div>
            <div class="mb-3">
                <span class="text-success font-weight-bold text-uppercase">
                    {{ product.condition.name }}
                </span>
                <span class="text-black-50">with</span>
                <span class="text-success font-weight-bold text-uppercase">
                    {{ product.warranty.name }}
                </span>
            </div>
            <div class="mb-3" v-if="isAuthor">
                <custom-post-insight-card
                    type="product"
                    :id="product.id"
                ></custom-post-insight-card>
            </div>
            <div class="mb-5" v-if="!isAuthor || isPublicViewer">
                <product-user-card :product="product"></product-user-card>
            </div>
            <div
                style="overflow: hidden"
                v-html="product.description.content"
            ></div>
        </div>
    </base-content-card>
</template>
