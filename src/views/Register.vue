<template>
    <v-row justify="center">
        <v-col cols="12" md="10" lg="8" xl="6">
            <v-row dense>
                <v-col cols="12">
                    <v-card flat color="transparent">
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <span class="font-weight-bold"
                                >Register to TipidGadgets</span
                            >
                            <v-spacer></v-spacer>
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12" v-if="error">
                    <v-alert border="right" type="error" elevation="2">
                        {{ error }}
                    </v-alert></v-col
                >
                <v-col cols="12">
                    <div class="caption grey--text mb-1">Name</div>
                    <v-text-field
                        placeholder="Name"
                        outlined
                        dense
                        v-model="form.name"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <div class="caption grey--text mb-1">Username</div>
                    <v-text-field
                        placeholder="Username"
                        outlined
                        dense
                        v-model="form.username"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <div class="caption grey--text mb-1">E-mail</div>
                    <v-text-field
                        placeholder="E-mail"
                        outlined
                        dense
                        :rules="[rules.email]"
                        v-model="form.email"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <div class="caption grey--text mb-1">Location</div>
                    <v-autocomplete
                        outlined
                        placeholder="Location"
                        dense
                        color="primary"
                        :items="locations"
                        :loading="isGetLocationsStart"
                        item-text="name"
                        item-value="name"
                        v-model="form.location"
                    ></v-autocomplete>
                </v-col>

                <v-col cols="12">
                    <div class="caption grey--text mb-1">Password</div>
                    <v-text-field
                        placeholder="Password"
                        outlined
                        dense
                        type="password"
                        v-model="form.password"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <div class="caption grey--text mb-1">Confirm Password</div>
                    <v-text-field
                        placeholder="Re type Password"
                        outlined
                        dense
                        type="password"
                        :rules="[
                            rules.sameAs(
                                form.password,
                                passwordConfirmation,
                                'Passwords are not same.'
                            ),
                        ]"
                        v-model="passwordConfirmation"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="primary"
                        block
                        class="text-capitalize"
                        depressed
                        :disabled="!isFormValid"
                        :loading="isRegisterStart"
                        large
                        @click="register"
                        >Register</v-btn
                    >
                </v-col>

                <v-col cols="12" class="my-5">
                    <div class="text-center overline">Or Register Via</div>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="#24292F"
                        block
                        class="text-capitalize"
                        depressed
                        dark
                        large
                        @click="githubLoginRedirection"
                    >
                        <v-icon class="mr-1">mdi-github</v-icon>
                        Git<span class="text-capitalize">H</span>ub
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { GET_LOCATIONS } from '@/store/types/reference';
import inputRuleMixin from '@/mixins/inputRule';
import { REGISTER } from '@/store/types/authentication';
import utilityMixin from '@/mixins/utility';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';

const defaultForm = {
    name: null,
    username: null,
    email: null,
    location: null,
    password: null,
};

export default {
    mixins: [inputRuleMixin, utilityMixin],

    data() {
        return {
            form: Object.assign({}, defaultForm),
            isGetLocationsStart: false,
            locations: [],
            passwordConfirmation: null,
            isRegisterStart: false,
            error: null,
        };
    },

    computed: {
        isFormValid() {
            const { email, password } = this.form;

            return (
                this.rules.email(email) === true &&
                this.rules.sameAs(password, this.passwordConfirmation) === true
            );
        },
    },

    methods: {
        async getLocations() {
            this.isGetLocationsStart = true;
            this.locations = await this.$store.dispatch(GET_LOCATIONS);
            this.isGetLocationsStart = false;
        },

        async register() {
            this.isRegisterStart = true;
            const { code, message } = await this.$store.dispatch(
                REGISTER,
                this.form
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                await this.$router.push({ name: 'login' });
                return;
            }
            this.error = message;
            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                open: true,
                message: 'Something went wrong.',
                color: 'error',
            });
            this.isRegisterStart = false;
        },

        githubLoginRedirection() {
            const githubClientID = process.env.VUE_APP_GITHUB_CLIENT_ID;
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientID}`;
        },
    },

    async created() {
        await this.getLocations();
    },
};
</script>
