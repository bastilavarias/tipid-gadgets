<template>
    <v-row>
        <v-col cols="12" lg="8" xl="9">
            <v-row dense>
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

            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Password</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
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
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div
                                class="d-flex justify-space-between align-center"
                            >
                                <v-spacer></v-spacer>
                                <v-btn color="primary" depressed>
                                    <span class="text-capitalize mr-1"
                                        >Change Password</span
                                    >
                                    <v-icon>mdi-lock-reset</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" lg="4" xl="3"> </v-col>
    </v-row>
</template>

<script>
import { GET_LOCATIONS } from '@/store/types/reference';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
import { UPDATE_USER } from '@/store/types/user';
import { SET_USER_INFORMATION } from '@/store/types/authentication';
import utilityMixin from '@/mixins/utility';

export default {
    mixins: [utilityMixin],

    data() {
        return {
            information: {
                name: null,
                location: null,
            },
            locations: [],
            isUpdateStart: false,
            updateError: null,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user || null;
        },

        isInformationValid() {
            const { name, location } = this.information;

            return name && location;
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
                console.log(data);
                this.$store.commit(SET_USER_INFORMATION, data);
                this.updateError = null;
                this.isUpdateStart = false;
                this.$nextTick(() => {
                    this.$vuetify.goTo(0);
                });
                return;
            }
            this.updateError = message;
            this.isUpdateStart = false;
            this.$nextTick(() => {
                this.$vuetify.goTo(this.$refs.updateError);
            });
        },
    },

    async created() {
        const { name, location } = this.user;
        this.information = Object.assign({}, { name, location });
        this.locations = await this.$store.dispatch(GET_LOCATIONS);
    },
};
</script>
