<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProductInformation } from '@/types/product';
import dateMixin from '@/mixins/date';
import { UserInformation } from '@/types/user';
import authenticationModule from '@/store/modules/authentication';
import { DELETE_PRODUCT } from '@/store/modules/product';

@Component
export default class ProductListItem extends Vue {
    @Prop(Number) readonly inheritedIndex: number | undefined;
    @Prop(Object) readonly product: ProductInformation | undefined;
    @Prop(Boolean) readonly allowAuthorActions: boolean | undefined;
    @Prop(Boolean) readonly readOnly: boolean | undefined;

    isActionStart = false;

    get date() {
        return dateMixin.toPostDate(String(this.product?.created_at));
    }

    get user(): UserInformation | null {
        const user = authenticationModule.state.user;
        if (user === null) {
            return null;
        }
        return user;
    }

    get isAuthor() {
        if (this.user === null) {
            return false;
        }
        return this.product?.user.id === this.user?.id;
    }

    async toEditPage() {
        const queries: any = {
            action: 'edit',
            slug: this.product?.slug,
        };
        await this.$router.push({
            name: 'Product Action View',
            query: { ...queries },
        });
    }

    onOpenModal() {
        this.$bvModal.show(`delete-product-${this.product?.id}-modal`);
    }

    onCloseModal() {
        this.$bvModal.hide(`delete-product-${this.product?.id}-modal`);
    }

    async onDelete() {
        this.isActionStart = true;
        const result = await this.$store.dispatch(
            DELETE_PRODUCT,
            this.product?.id
        );
        if (result.success) {
            this.onCloseModal();
            this.isActionStart = false;
            this.$bvToast.toast('Item was successfully deleted.', {
                title: 'Items',
                variant: 'success',
                solid: true,
            });
            this.$emit('onRefresh');

            return;
        }
        this.isActionStart = false;
    }
}
</script>

<template>
    <b-list-group-item
        class="flex-column align-items-start border-0"
        :style="{
            backgroundColor: inheritedIndex % 2 === 0 ? 'white' : '#f8f9fa',
        }"
    >
        <div class="d-flex w-100 justify-content-between text-truncate">
            <span class="h6 mb-1 text-primary font-weight-bold" v-if="readOnly">
                {{ product.name }}
            </span>
            <router-link
                :to="{
                    name: 'Product View',
                    params: { productSlug: product.slug },
                }"
                v-else
            >
                <span class="h6 mb-1 text-primary font-weight-bold">
                    {{ product.name }}
                </span>
            </router-link>
            <small>{{ date }}</small>
        </div>

        <span
            ><span class="font-weight-bold text-black-50">PHP 22500.00</span> -

            <span class="h6 mb-1 text-primary font-weight-bold" v-if="readOnly">
                {{ product.category.name }}
            </span>
            <router-link
                :to="{
                    name: 'Search View',
                    query: { item_category: product.category.id },
                }"
                v-else
            >
                <span class="h6 mb-1 text-primary font-weight-bold">
                    {{ product.category.name }}
                </span>
            </router-link>
            <span class="text-black-50"
                >({{ product.user.location }})</span
            ></span
        >
        <div class="d-flex justify-content-end" v-if="allowAuthorActions">
            <div class="d-flex align-content-center">
                <b-btn variant="transparent" @click="toEditPage">
                    <b-icon icon="pencil-fill" variant="primary"></b-icon>
                </b-btn>

                <b-btn variant="transparent" @click="onOpenModal">
                    <b-icon icon="trash-fill" variant="primary"></b-icon>
                </b-btn>
            </div>
        </div>

        <b-modal
            :id="`delete-product-${product.id}-modal`"
            title="Delete Product"
        >
            Are you sure that you want to receive this product
            {{ product.name }}?
            <template #modal-footer>
                <b-button
                    variant="primary"
                    class="text-white"
                    @click="onDelete"
                >
                    <b-spinner
                        small
                        label="Loading..."
                        v-if="isActionStart"
                    ></b-spinner
                    ><span v-else>Delete</span></b-button
                >
            </template>
        </b-modal>
    </b-list-group-item>
</template>

<style scoped>
.text-decoration-underline {
    text-decoration: underline;
}
</style>
