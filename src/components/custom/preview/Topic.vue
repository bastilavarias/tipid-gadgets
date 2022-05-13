<template>
    <v-card flat :color="isEven(index) ? '#EEEEEE' : 'white'">
        <v-list-item :three-line="hasOperations" :two-line="!hasOperations">
            <v-list-item-content>
                <v-list-item-title>
                    <router-link
                        class="primary--text font-weight-bold"
                        :to="{ name: 'view-topic', params: { slug } }"
                        style="text-decoration: none"
                        >{{ name }}</router-link
                    >
                </v-list-item-title>

                <v-list-item-subtitle>
                    <router-link
                        style="text-decoration: none"
                        :to="{
                            name: 'search',
                            query: {
                                type: 'forum_topics',
                                sectionID: section.id,
                            },
                        }"
                    >
                        <span class="primary--text">{{ section.name }}</span>
                    </router-link>
                    <span class="grey--text"> - posted by</span>
                    <span
                        class="primary--text pointer"
                        @click="goToUser(user.username)"
                    >
                        {{ user.username }}</span
                    >
                    <span class="grey--text">
                        last updated {{ toPostDate(updatedAt) }} —
                        {{ commentsCount }} comments</span
                    >
                </v-list-item-subtitle>

                <v-list-item-subtitle
                    class="d-flex justify-space-around"
                    v-if="hasOperations"
                >
                    <v-spacer></v-spacer>
                    <v-btn
                        small
                        text
                        class="text-capitalize text-decoration-underline"
                        :to="{
                            name: 'forum/topic-editor',
                            params: { operation: 'edit' },
                            query: { slug },
                        }"
                        >Edit</v-btn
                    >
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
import dateMixin from '@/mixins/date';
import redirectionMixin from '@/mixins/redirection';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import { DELETE_TOPIC } from '@/store/types/topic';
import BaseAlertDialog from '@/components/base/AlertDialog';

export default {
    name: 'topic-preview',
    components: { BaseAlertDialog },
    mixins: [utilityMixin, dateMixin, redirectionMixin],

    props: {
        index: Number,
        topicID: Number,
        name: String,
        section: Object,
        user: Object,
        createdAt: String,
        slug: String,
        commentsCount: Number,
        updatedAt: String,
        hasOperations: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isDeleteStart: false,
            isDeleteDialogOpen: false,
            deleteDialog: {
                theme: 'success',
                title: null,
                description: null,
            },
        };
    },

    methods: {
        async deleteItem() {
            this.isDeleteStart = true;
            const { code, message } = await this.$store.dispatch(
                DELETE_TOPIC,
                this.topicID
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                this.isDeleteStart = false;
                this.$emit('onDelete', this.topicID);
                this.isDeleteDialogOpen = false;
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
                        'Deleting this topic has no turning back. Please proceed if you are sure.',
                }
            );
            this.isDeleteDialogOpen = true;
        },
    },
};
</script>
