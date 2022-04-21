<template>
    <v-row>
        <v-col cols="12" md="9">
            <v-card flat>
                <v-card-title>
                    <span
                        class="secondary--text font-weight-bold align-center"
                        >{{ title }}</span
                    >
                    <v-spacer></v-spacer>
                    <v-select
                        :label="`Drafts (${drafts.length})`"
                        placeholder="Choose"
                        color="primary"
                        hide-details
                        dense
                        outlined
                        :items="drafts"
                        item-text="name"
                        return-object
                        style="max-width: 12rem"
                        :loading="isGetDraftsStart"
                        clearable
                        @click:clear="selectedDraft = null"
                        v-model="selectedDraft"
                    ></v-select>
                </v-card-title>

                <v-card-text>
                    <v-row dense>
                        <v-col ref="error" cols="12" v-if="error">
                            <v-alert border="right" type="error" elevation="2">
                                {{ error }}
                            </v-alert></v-col
                        >

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Section</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                                :items="sections"
                                item-value="id"
                                item-text="name"
                                clearable
                                @click:clear="form.item_section_id = null"
                                v-model="form.item_section_id"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Item Name</div>
                            <v-text-field
                                outlined
                                placeholder="Name"
                                dense
                                color="primary"
                                v-model="form.name"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Category</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                                :items="categories"
                                item-value="id"
                                item-text="name"
                                clearable
                                @click:clear="form.item_category_id = null"
                                v-model="form.item_category_id"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                Price or Budget
                            </div>
                            <v-text-field
                                type="number"
                                outlined
                                placeholder="₱"
                                dense
                                color="primary"
                                v-model="form.price"
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Condition</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                                :items="conditions"
                                item-value="id"
                                item-text="name"
                                clearable
                                @click:clear="form.item_condition_id = null"
                                v-model="form.item_condition_id"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Warranty</div>
                            <v-select
                                outlined
                                placeholder="Choose"
                                dense
                                color="primary"
                                :items="warranties"
                                item-value="id"
                                item-text="name"
                                clearable
                                @click:clear="form.item_warranty_id = null"
                                v-model="form.item_warranty_id"
                            ></v-select>
                        </v-col>

                        <v-col cols="12" class="mb-5">
                            <div class="caption grey--text mb-1">
                                Description
                            </div>
                            <base-text-editor
                                v-model="form.description"
                            ></base-text-editor>
                        </v-col>

                        <v-col cols="12" class="d-flex">
                            <v-btn
                                class="text-capitalize"
                                color="error"
                                depressed
                                :loading="isDeleteDraftStart"
                                :disabled="isSavePostStart || isSaveDraftStart"
                                @click="deleteDraft"
                                v-if="isDraftMode"
                                >Delete Draft</v-btn
                            >

                            <v-spacer></v-spacer>
                            <div>
                                <v-btn
                                    color="secondary"
                                    class="text-capitalize mr-3"
                                    depressed
                                    :loading="isSaveDraftStart"
                                    :disabled="
                                        isSavePostStart || isDeleteDraftStart
                                    "
                                    @click="saveDraft"
                                    >Save
                                    <span class="mx-1 text-lowercase">as</span>
                                    Draft</v-btn
                                >

                                <v-btn
                                    color="primary"
                                    class="text-capitalize"
                                    depressed
                                    :loading="isSavePostStart"
                                    :disabled="
                                        isSaveDraftStart || isDeleteDraftStart
                                    "
                                    @click="savePost"
                                    >Post Item</v-btn
                                >
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="3">
            <v-card outlined>
                <v-list dense>
                    <v-subheader>Posting an Item Rules & Tips</v-subheader>
                    <template v-for="n in 10">
                        <v-list-item :key="n">
                            {{ n }}. Lorem ipsum dolor.
                        </v-list-item>
                        <v-divider v-if="n !== 10"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import BaseTextEditor from '@/components/base/TextEditor';
import {
    GET_ITEM_CATEGORIES,
    GET_ITEM_CONDITIONS,
    GET_ITEM_SECTIONS,
    GET_ITEM_WARRANTIES,
} from '@/store/types/reference';
import { REGISTER } from '@/store/types/authentication';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';
import {
    DELETE_DRAFT_ITEM,
    GET_DRAFT_ITEMS,
    SAVE_DRAFT_ITEM,
    SAVE_POST_ITEM,
} from '@/store/types/item';

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

export default {
    components: { BaseTextEditor },

    mixins: [utilityMixin],

    data() {
        return {
            form: Object.assign({}, defaultForm),

            sections: [],
            categories: [],
            conditions: [],
            warranties: [],
            error: null,

            isSavePostStart: false,
            isSaveDraftStart: false,
            isGetDraftsStart: false,
            isDeleteDraftStart: false,

            drafts: [],
            selectedDraft: null,
        };
    },

    computed: {
        isCreateMode() {
            return this.$route.params.operation === 'create';
        },

        title() {
            return this.isCreateMode ? 'Post an Item' : 'Edit an Item';
        },

        isDraftMode() {
            return !!this.selectedDraft;
        },
    },

    watch: {
        selectedDraft(val) {
            this.error = null;
            if (val) {
                const {
                    item_section_id,
                    name,
                    item_category_id,
                    price,
                    item_condition_id,
                    item_warranty_id,
                    description,
                    id,
                } = val;
                this.form = Object.assign(
                    {},
                    {
                        item_section_id,
                        name,
                        item_category_id,
                        price,
                        item_condition_id,
                        item_warranty_id,
                        description: description.content || null,
                        id,
                    }
                );

                return;
            }
            this.form = Object.assign({}, defaultForm);
        },
    },

    methods: {
        async savePost() {
            this.isSavePostStart = true;
            const { code, message, data } = await this.$store.dispatch(
                SAVE_POST_ITEM,
                this.form
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                await this.getDrafts();
                this.selectedDraft = null;
                return await this.$router.push({
                    name: 'view-item',
                    params: { slug: data.slug },
                });
            }
            this.error = message;
            this.isSavePostStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.error);
            });
        },

        async saveDraft() {
            this.isSaveDraftStart = true;
            const { code, message } = await this.$store.dispatch(
                SAVE_DRAFT_ITEM,
                this.form
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });

                await this.getDrafts();
                this.selectedDraft = null;
                this.form = Object.assign({}, defaultForm);
                this.error = null;
                this.isSaveDraftStart = false;
                this.$nextTick(() => {
                    this.$vuetify.goTo(0);
                });
                return;
            }
            this.error = message;
            this.isSaveDraftStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.error);
            });
        },

        async deleteDraft() {
            this.isDeleteDraftStart = true;
            const { code, message } = await this.$store.dispatch(
                DELETE_DRAFT_ITEM,
                this.selectedDraft.id
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });

                await this.getDrafts();
                this.selectedDraft = null;
                this.form = Object.assign({}, defaultForm);
                this.error = null;
                this.isDeleteDraftStart = false;
                this.$nextTick(() => {
                    this.$vuetify.goTo(0);
                });
                return;
            }
            this.error = message;
            this.isDeleteDraftStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.error);
            });
        },

        async getDrafts() {
            this.isGetDraftsStart = true;
            this.drafts = await this.$store.dispatch(GET_DRAFT_ITEMS);
            this.isGetDraftsStart = false;
        },
    },

    async created() {
        await this.getDrafts();
        this.sections = await this.$store.dispatch(GET_ITEM_SECTIONS);
        this.categories = await this.$store.dispatch(GET_ITEM_CATEGORIES);
        this.conditions = await this.$store.dispatch(GET_ITEM_CONDITIONS);
        this.warranties = await this.$store.dispatch(GET_ITEM_WARRANTIES);
    },
};
</script>
