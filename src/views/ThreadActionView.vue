<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import BaseRichTextEditor from '@/components/BaseRichTextEditor.vue';
import { REFERENCE_GET_THREAD_SECTIONS } from '@/store/modules/reference';
import {
    CREATE_THREAD,
    GET_THREAD,
    UPDATE_THREAD,
} from '@/store/modules/thread';
import { ThreadInformation } from '@/types/thread';
import authenticationModule from '@/store/modules/authentication';
import { UserInformation } from '@/types/user';

const defaultForm = {
    topic_section_id: null,
    name: null,
    description: null,
    id: null,
};

@Component({
    components: { BaseRichTextEditor, BaseContentCard },
})
export default class ThreadActionView extends Vue {
    form = Object.assign({}, defaultForm);
    thread: ThreadInformation | null = null;
    error = null;
    isActionStart = false;
    sections = [];

    get operation() {
        const action = this.$route.query.action;
        return {
            create: action === 'new',
            update: action === 'edit',
        };
    }

    get cardTitle() {
        let title = 'Post a Topic';
        if (this.operation.update) {
            title = 'Update a Topic';
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
        const result = await this.$store.dispatch(CREATE_THREAD, this.form);
        if (result.success) {
            this.$bvToast.toast('Topic was successfully posted.', {
                title: 'Thread Topic Complete',
                variant: 'success',
                solid: true,
            });
            setTimeout(() => window.open('/forum', '_self'), 2000); // for the meantime it should be redirected in Home View but if the user items page are ready it will be then.
            return;
        }
        this.error = result.error;
        this.isActionStart = false;
    }

    async onUpdate() {
        this.isActionStart = true;
        const result = await this.$store.dispatch(UPDATE_THREAD, this.form);
        if (result.success) {
            this.$bvToast.toast('Topic was successfully updated.', {
                title: 'Thread Topic Complete',
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

    async save() {
        if (this.operation.create) {
            await this.onCreate();
            return;
        }
        await this.onUpdate();
    }

    async getSections() {
        const result = await this.$store.dispatch(
            REFERENCE_GET_THREAD_SECTIONS
        );
        if (result.success) {
            this.sections = result.data;
        }
    }

    async getThread() {
        const slug = this.$route.query.slug;
        const result = await this.$store.dispatch(GET_THREAD, slug);
        if (result.success) {
            const { id, description, topic_section_id, name } = result.data;
            this.form = Object.assign(
                {},
                {
                    id,
                    description: description.content,
                    topic_section_id,
                    name,
                }
            );
            this.thread = Object.assign({}, result.data);
            return;
        }
        await this.$router.go(-1);
    }

    validateIfAuthor() {
        let isAuthor = false;
        if (!this.user) {
            return isAuthor;
        }
        if (this.user.id !== this.thread?.user.id) {
            return isAuthor;
        }
        isAuthor = true;
        return isAuthor;
    }

    async created() {
        if (this.operation.update) {
            await this.getThread();
            const isAuthor = this.validateIfAuthor();
            if (!isAuthor) {
                this.$router.go(-1);
            }
        }
        await this.getSections();
    }
}
</script>

<template>
    <section>
        <base-content-card :title="cardTitle">
            <div class="py-5">
                <b-row class="d-flex justify-content-center">
                    <b-col cols="12" md="10" lg="8">
                        <b-alert show variant="danger" v-if="error">{{
                            error
                        }}</b-alert>
                        <b-form class="mb-4">
                            <b-form-group id="tips-group">
                                Got something you'd like to discuss or ask?
                                search the forum first, the topic you have in
                                mind might already have been discussed. If not,
                                start your topic by completing and submitting
                                the form below. ...
                                <span class="text-danger">
                                    and Please do not to post in UPPERCASE, it
                                    implies shouting, uppercase post will be
                                    removed immediately without warning
                                </span>
                            </b-form-group>

                            <b-form-group label="Section">
                                <b-form-select
                                    v-model="form.topic_section_id"
                                    :options="sections"
                                ></b-form-select>
                            </b-form-group>

                            <b-form-group label="Subject">
                                <b-form-input
                                    required
                                    v-model="form.name"
                                ></b-form-input>
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
                                ><span v-else>Post Topic</span>
                            </b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </div>
        </base-content-card>
    </section>
</template>
