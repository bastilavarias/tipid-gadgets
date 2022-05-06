<template>
    <v-dialog width="700" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Write a review to {{ reviewee.username }}</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-radio-group label="Rating" v-model="form.rating">
                            <v-radio
                                label="Positive"
                                value="positive"
                            ></v-radio>
                            <v-radio
                                label="Negative"
                                value="negative"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            no-resize
                            label="Review"
                            outlined
                            v-model="form.content"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    class="text-capitalize"
                    depressed
                    :loading="isCreateStart"
                    :disabled="!isFormValid"
                    @click="create"
                    >Post Review</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import utilityMixin from '@/mixins/utility';
import { WRITE_REVIEW } from '@/store/types/user';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';

const defaultForm = {
    rating: null,
    content: null,
};

export default {
    name: 'message-conversation-review-editor-dialog',

    mixins: [utilityMixin],

    props: {
        transactionID: null,
        isOpen: false,
        reviewee: Object,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            form: Object.assign({}, defaultForm),
            isCreateStart: false,
        };
    },

    computed: {
        isFormValid() {
            const { rating, content } = this.form;
            return rating && content;
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },
        isOpenLocal(value) {
            this.$emit('update:isOpen', value);
        },
    },

    methods: {
        async create() {
            const payload = {
                user_id: this.reviewee.id,
                transaction_id: this.transactionID,
                content: this.form.content,
                rating: this.form.rating,
            };
            this.isCreateStart = true;
            const { code, message } = await this.$store.dispatch(
                WRITE_REVIEW,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message: message,
                    color: 'success',
                });
                this.isOpenLocal = false;
                this.isCreateStart = false;
            }
            this.isCreateStart = false;
        },
    },
};
</script>
