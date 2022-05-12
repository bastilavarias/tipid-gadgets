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
                                @click:clear="form.topic_section_id = null"
                                v-model="form.topic_section_id"
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Subject</div>
                            <v-text-field
                                outlined
                                placeholder="Subject"
                                dense
                                color="primary"
                                v-model="form.name"
                            ></v-text-field>
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
import { GET_TOPIC_SECTIONS } from '@/store/types/reference';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import utilityMixin from '@/mixins/utility';
import {
    DELETE_TOPIC,
    GET_DRAFT_TOPICS,
    SAVE_DRAFT_TOPIC,
    SAVE_POST_TOPIC,
} from '@/store/types/topic';

const defaultForm = {
    topic_section_id: null,
    name: null,
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
            return this.isCreateMode ? 'Post an Topic' : 'Edit an Topic';
        },

        isDraftMode() {
            return !!this.selectedDraft;
        },
    },

    watch: {
        selectedDraft(val) {
            this.error = null;
            if (val) {
                const { topic_section_id, name, price, description, id } = val;
                this.form = Object.assign(
                    {},
                    {
                        topic_section_id,
                        name,
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
                SAVE_POST_TOPIC,
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
                    name: 'view-topic',
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
                SAVE_DRAFT_TOPIC,
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
                DELETE_TOPIC,
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
            this.drafts = await this.$store.dispatch(GET_DRAFT_TOPICS);
            this.isGetDraftsStart = false;
        },
    },

    async created() {
        await this.getDrafts();
        this.sections = await this.$store.dispatch(GET_TOPIC_SECTIONS);
    },
};
</script>
