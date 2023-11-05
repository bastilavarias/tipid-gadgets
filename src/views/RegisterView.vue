<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { REFERENCE_GET_LOCATIONS } from '@/store/modules/reference';
import { AUTHENTICATION_REGISTER } from '@/store/modules/authentication';

const defaultForm = {
    name: null,
    username: null,
    email: null,
    location: null,
    password: null,
    password_confirmation: null,
    contact_number: null,
};

@Component({
    components: { BaseContentCard },
})
export default class RegisterView extends Vue {
    form = Object.assign({}, defaultForm);
    locations = [];
    error = null;
    isActionStart = false;
    isAgree = false;

    async getLocations() {
        const result = await this.$store.dispatch(REFERENCE_GET_LOCATIONS);
        if (result.success) {
            this.locations = result.data;
        }
    }

    async register(event: any) {
        event.preventDefault();
        this.isActionStart = true;
        const result = await this.$store.dispatch(
            AUTHENTICATION_REGISTER,
            this.form
        );
        if (result.success) {
            this.$bvToast.toast('You will be directed in the Login page.', {
                title: 'Registration Complete',
                variant: 'success',
                solid: true,
            });
            setTimeout(
                async () => await this.$router.push({ name: 'Login View' }),
                2000
            );
            return;
        }
        this.isAgree = false;
        this.error = result.error;
        this.isActionStart = false;
    }

    async created() {
        await this.getLocations();
    }
}
</script>

<template>
    <section>
        <base-content-card title="New Account Registration">
            <div class="py-5">
                <b-row class="d-flex justify-content-center">
                    <b-col cols="12" md="10" lg="8" xl="4">
                        <b-alert show variant="danger" v-if="error">{{
                            error
                        }}</b-alert>
                        <b-form class="mb-4" @submit="register">
                            <b-form-group label="Name">
                                <b-form-input
                                    v-model="form.name"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group label="Username">
                                <b-form-input
                                    v-model="form.username"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group label="E-mail">
                                <b-form-input
                                    required
                                    type="email"
                                    v-model="form.email"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group label="Location">
                                <b-form-select
                                    v-model="form.location"
                                    :options="locations"
                                ></b-form-select>
                            </b-form-group>

                            <b-form-group label="Password">
                                <b-form-input
                                    type="password"
                                    required
                                    v-model="form.password"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group label="Confirm Password">
                                <b-form-input
                                    type="password"
                                    required
                                    v-model="form.password_confirmation"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group label="Contact Number">
                                <b-form-input
                                    required
                                    v-model="form.contact_number"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="confirm-password-group">
                                <b-form-checkbox
                                    id="checkbox-1"
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    v-model="isAgree"
                                >
                                    I agree and will abide by TipidGadget.com's
                                    <a href="#">rules</a> and
                                    <a href="#">policies</a>, and the site's
                                    <a href="#">terms</a> of use and
                                    <a href="#">privacy policies</a>. Create my
                                    account now!
                                </b-form-checkbox>
                            </b-form-group>

                            <b-button
                                type="submit"
                                variant="primary"
                                class="text-white"
                                :disabled="isActionStart || !isAgree"
                                block
                            >
                                <b-spinner
                                    small
                                    label="Loading..."
                                    v-if="isActionStart"
                                ></b-spinner
                                ><span v-else>Register</span>
                            </b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </div>
        </base-content-card>
    </section>
</template>
