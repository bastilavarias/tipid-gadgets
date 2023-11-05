<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { AUTHENTICATION_LOGIN } from '@/store/modules/authentication';

const defaultForm = {
    username: null,
    password: null,
};

@Component({
    components: { BaseContentCard },
})
export default class LoginView extends Vue {
    form = Object.assign({}, defaultForm);
    error = null;
    isActionStart = false;

    async login(event: any) {
        event.preventDefault();
        this.isActionStart = true;
        const result = await this.$store.dispatch(
            AUTHENTICATION_LOGIN,
            this.form
        );
        if (result.success) {
            await this.$router.push({ name: 'Home View' });
            return;
        }
        this.error = result.error;
        this.isActionStart = false;
    }
}
</script>

<template>
    <section>
        <base-content-card title="Account Login">
            <div class="py-5">
                <b-row class="d-flex justify-content-center">
                    <b-col cols="12" md="10" lg="8" xl="4">
                        <b-alert show variant="danger" v-if="error">{{
                            error
                        }}</b-alert>
                        <b-form class="mb-4" @submit="login">
                            <b-form-group label="Username">
                                <b-form-input
                                    v-model="form.username"
                                    required
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group label="Password">
                                <b-form-input
                                    type="password"
                                    required
                                    v-model="form.password"
                                ></b-form-input>
                            </b-form-group>
                            <b-button
                                type="submit"
                                variant="primary"
                                class="text-white"
                                :disabled="isActionStart"
                                block
                            >
                                <b-spinner
                                    small
                                    label="Loading..."
                                    v-if="isActionStart"
                                ></b-spinner
                                ><span v-else>Login</span>
                            </b-button>
                        </b-form>

                        <div class="w-100 text-center">
                            <a href="#">Forgot Password?</a>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </base-content-card>
    </section>
</template>
