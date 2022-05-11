<template>
    <v-card
        :color="isEven(index) || isCardComponent ? '#EEEEEE' : 'white'"
        height="auto"
        :flat="!isCardComponent"
        class="d-block"
    >
        <v-list-item :three-line="canDelete" :two-line="!canDelete">
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{ name: 'view-item', params: { slug } }"
                        style="text-decoration: none"
                        >{{ name }}</router-link
                    >
                </v-list-item-title>

                <v-list-item-subtitle>
                    <span class="secondary--text font-weight-bold">{{
                        formatCurrency('PHP', price)
                    }}</span>
                    -
                    <span
                        class="primary--text pointer"
                        @click="goToCatalogBrowser(section.slug, category.slug)"
                        >{{ category.name }}</span
                    ><span class="grey--text"
                        >({{ user.location || 'No location included' }})</span
                    >
                </v-list-item-subtitle>

                <v-list-item-subtitle
                    class="d-flex justify-space-around"
                    v-if="canDelete"
                >
                    <v-spacer></v-spacer>
                    <v-btn
                        small
                        text
                        class="text-capitalize text-decoration-underline"
                        @click="openDeleteDialog"
                        >Delete</v-btn
                    >
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <template v-if="isCardComponent">
            <v-row no-gutters v-if="isGetImagesStart">
                <template v-for="i in 2">
                    <v-col :key="i" xs="12" md="6">
                        <v-skeleton-loader type="image"> </v-skeleton-loader>
                    </v-col>
                </template>
            </v-row>
            <masonry :cols="2" :gutter="0">
                <div v-for="(image, index) in images" :key="index">
                    <v-img
                        width="100%"
                        height="auto"
                        :src="image"
                        :key="index"
                    ></v-img>
                </div>
            </masonry>
        </template>

        <base-alert-dialog
            :is-open.sync="isDeleteDialogOpen"
            :title="deleteDialog.title"
            :description="deleteDialog.description"
            :theme="deleteDialog.theme"
            :loading="isDeleteStart"
            @onCancel="isDeleteDialogOpen = false"
            @onProceed="deleteItem"
        ></base-alert-dialog>
    </v-card>
</template>

<script>
import utilityMixin from '@/mixins/utility';
import { DELETE_ITEM, GET_ITEM_IMAGES } from '@/store/types/item';
import redirectionMixin from '@/mixins/redirection';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import BaseAlertDialog from '@/components/base/AlertDialog';

export default {
    name: 'item-preview',
    components: { BaseAlertDialog },
    props: {
        index: Number,
        itemID: Number,
        name: String,
        price: String,
        category: Object,
        user: Object,
        slug: String,
        component: String,
        section: Object,
        canDelete: {
            type: Boolean,
            default: false,
        },
    },

    mixins: [utilityMixin, redirectionMixin],

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
            isGetImagesStart: false,
            images: [],

            isDeleteStart: false,
            isDeleteDialogOpen: false,
            deleteDialog: {
                theme: 'success',
                title: null,
                description: null,
            },
        };
    },

    computed: {
        isCardComponent() {
            return this.component && this.component === 'card';
        },
    },

    watch: {
        component() {
            if (this.isCardComponent) this.getImages();
        },
    },

    methods: {
        async getImages() {
            this.isGetImagesStart = true;
            this.images = await this.$store.dispatch(
                GET_ITEM_IMAGES,
                this.itemID
            );
            this.isGetImagesStart = false;
        },

        async deleteItem() {
            this.isDeleteStart = true;
            const { code, message } = await this.$store.dispatch(
                DELETE_ITEM,
                this.itemID
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                this.isDeleteStart = false;
                this.$emit('onDelete', this.itemID);
                return;
            }
            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                open: true,
                message,
                color: 'success',
            });
            this.isDeleteStart = false;
        },

        openDeleteDialog() {
            this.deleteDialog = Object.assign(
                {},
                {
                    theme: 'success',
                    title: 'Delete',
                    description:
                        'Deleting this item has no turning back. Please proceed if you are sure.',
                }
            );
            this.isDeleteDialogOpen = true;
        },
    },

    async created() {
        if (this.isCardComponent) await this.getImages();
    },
};
</script>
