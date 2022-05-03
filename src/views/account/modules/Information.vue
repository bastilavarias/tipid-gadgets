<template>
    <v-row v-if="user">
        <v-col cols="12" lg="8" xl="9">
            <v-row dense v-if="isOwnAccount">
                <v-col cols="12">
                    <div class="subtitle-1">General Information</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <v-col ref="updateError" cols="12" v-if="updateError">
                            <v-alert border="right" type="error" elevation="2">
                                {{ updateError }}
                            </v-alert></v-col
                        >

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Name</div>
                            <v-text-field
                                outlined
                                placeholder="Name"
                                dense
                                color="primary"
                                v-model="information.name"
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
                                item-text="name"
                                item-value="name"
                                v-model="information.location"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12">
                    <div class="d-flex justify-space-between align-center">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            depressed
                            :loading="isUpdateStart"
                            :disabled="!isInformationValid"
                            @click="update"
                        >
                            <span class="text-capitalize mr-1">Update</span>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

            <v-row dense v-if="isOwnAccount">
                <v-col cols="12">
                    <div class="subtitle-1">Password</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <v-col
                            ref="changePasswordError"
                            cols="12"
                            v-if="changePasswordError"
                        >
                            <v-alert border="right" type="error" elevation="2">
                                {{ changePasswordError }}
                            </v-alert></v-col
                        >
                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                Current Password
                            </div>
                            <v-text-field
                                outlined
                                placeholder="Current Password"
                                dense
                                color="primary"
                                type="password"
                                v-model="password.current"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                New Password
                            </div>
                            <v-text-field
                                outlined
                                placeholder="New Password"
                                dense
                                color="primary"
                                type="password"
                                :rules="[
                                    rules.counter(6, password.newPassword),
                                ]"
                                v-model="password.newPassword"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                Confirm Password
                            </div>
                            <v-text-field
                                outlined
                                placeholder="Confirm Password"
                                dense
                                color="primary"
                                type="password"
                                :rules="[
                                    rules.sameAs(
                                        password.newPassword,
                                        password.confirmation,
                                        'Password confirmation is incorrect.'
                                    ),
                                    rules.counter(6, password.confirmation),
                                ]"
                                v-model="password.confirmation"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div
                                class="d-flex justify-space-between align-center"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    depressed
                                    :disabled="!isPasswordValid"
                                    :loading="isChangePasswordStart"
                                    @click="changePassword"
                                >
                                    <span class="text-capitalize mr-1"
                                        >Change</span
                                    >
                                    <v-icon>mdi-lock-reset</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row dense v-if="!isOwnAccount">
                <v-col cols="12">
                    <v-card color="#f0f0f0" flat outlined>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <span class="font-weight-bold">Name: </span>
                                    <span>{{ user.name }}</span>
                                </v-col>

                                <v-col cols="12">
                                    <span class="font-weight-bold"
                                        >Location:
                                    </span>
                                    <span>{{ user.location }}</span>
                                </v-col>

                                <v-col cols="12">
                                    <span class="font-weight-bold"
                                        >Contact Number:
                                    </span>
                                    <span>{{
                                        user.contact_number || 'No Data'
                                    }}</span>
                                </v-col>

                                <v-col cols="12">
                                    <span class="font-weight-bold"
                                        >Member Since:
                                    </span>
                                    <span>{{
                                        toPostDate(user.created_at)
                                    }}</span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" lg="4" xl="3"> </v-col>
    </v-row>
</template>

<script>
import { GET_LOCATIONS } from '@/store/types/reference';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import { GET_USER_BY_USERNAME, UPDATE_USER } from '@/store/types/user';
import {
    CHANGE_PASSWORD,
    SET_USER_INFORMATION,
} from '@/store/types/authentication';
import utilityMixin from '@/mixins/utility';
import inputRuleMixin from '@/mixins/inputRule';
import dateMixin from '@/mixins/date';

export default {
    mixins: [utilityMixin, inputRuleMixin, dateMixin],

    data() {
        return {
            information: {
                name: null,
                location: null,
            },

            locations: [],
            isUpdateStart: false,
            updateError: null,

            password: {
                current: null,
                newPassword: null,
                confirmation: null,
            },
            changePasswordError: null,
            isChangePasswordStart: false,

            user: null,
        };
    },

    computed: {
        isOwnAccount() {
            const name = 'my-account/information';
            return this.$route.name === name;
        },

        isInformationValid() {
            const { name, location } = this.information;
            return name && location;
        },

        isPasswordValid() {
            const { newPassword, current, confirmation } = this.password;
            return (
                newPassword &&
                current &&
                confirmation &&
                newPassword === confirmation &&
                newPassword.length >= 6 &&
                confirmation.length >= 6
            );
        },
    },

    methods: {
        async update() {
            this.isUpdateStart = true;
            const { code, message, data } = await this.$store.dispatch(
                UPDATE_USER,
                this.information
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                this.$store.commit(SET_USER_INFORMATION, data);
                this.updateError = null;
                this.isUpdateStart = false;
                return;
            }
            this.updateError = message;
            this.isUpdateStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.updateError);
            });
        },

        async changePassword() {
            const payload = {
                password: this.password.newPassword,
                password_confirmation: this.password.confirmation,
                current_password: this.password.current,
            };
            this.isChangePasswordStart = true;
            const { code, message, data } = await this.$store.dispatch(
                CHANGE_PASSWORD,
                payload
            );
            if (this.isHTTPRequestSuccess(code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message,
                    color: 'success',
                });
                this.password = Object.assign(
                    {},
                    {
                        current: null,
                        newPassword: null,
                        confirmation: null,
                    }
                );
                this.changePasswordError = null;
                this.isChangePasswordStart = false;
                return;
            }
            this.changePasswordError = message;
            this.isChangePasswordStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.changePasswordError);
            });
        },

        async getUser() {
            const username = this.$route.params.username;
            return await this.$store.dispatch(GET_USER_BY_USERNAME, username);
        },
    },

    async created() {
        let user;
        if (this.isOwnAccount) {
            user = this.$store.state.authentication.user || null;
        } else {
            user = await this.getUser();
        }
        if (!user) return this.$router.go(-1);
        this.user = Object.assign({}, user);

        const { name, location } = this.user;
        this.information = Object.assign({}, { name, location });
        this.locations = await this.$store.dispatch(GET_LOCATIONS);
    },
};
</script>
