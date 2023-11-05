<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import authenticationModule, {
    AUTHENTICATION_CHANGE_PASSWORD,
    SET_USER_AUTHENTICATE,
} from '@/store/modules/authentication';
import { UserInformation } from '@/types/user';
import { REFERENCE_GET_LOCATIONS } from '@/store/modules/reference';
import { UPDATE_USER } from '@/store/modules/user';

type PasswordForm = {
    password: string | null;
    password_confirmation: string | null;
    current_password: string | null;
};
const defaultPasswordForm: PasswordForm = {
    password: null,
    password_confirmation: null,
    current_password: null,
};

@Component({
    components: { BaseContentCard },
})
export default class UserProfileView extends Vue {
    userLocal: UserInformation = Object.assign({}, this.user);
    userFormError = null;
    passwordFormError = null;
    locations = [];
    isUpdateUserStart = false;
    isChangePasswordStart = false;
    passwordForm = Object.assign({}, defaultPasswordForm);

    get user() {
        return authenticationModule.state.user;
    }

    async getLocations() {
        const result = await this.$store.dispatch(REFERENCE_GET_LOCATIONS);
        if (result.success) {
            this.locations = result.data;
        }
    }

    async updateUser() {
        this.isUpdateUserStart = true;
        const result = await this.$store.dispatch(UPDATE_USER, this.userLocal);
        if (result.success) {
            this.$store.commit(SET_USER_AUTHENTICATE, this.userLocal);
            window.localStorage.setItem('user', JSON.stringify(this.userLocal));
            this.isUpdateUserStart = false;
            this.userFormError = null;
            this.$bvToast.toast('Information was successfully updated.', {
                title: 'User Profile',
                variant: 'success',
                solid: true,
            });
            return;
        }
        this.userFormError = result.error;
        this.isUpdateUserStart = false;
    }

    async changePassword() {
        this.isChangePasswordStart = true;
        const result = await this.$store.dispatch(
            AUTHENTICATION_CHANGE_PASSWORD,
            this.passwordForm
        );
        if (result.success) {
            this.isChangePasswordStart = false;
            this.passwordFormError = null;
            this.passwordForm = Object.assign({}, defaultPasswordForm);
            this.$bvToast.toast('Password was successfully changed.', {
                title: 'User Profile',
                variant: 'success',
                solid: true,
            });
            return;
        }
        this.passwordFormError = result.error;
        this.isChangePasswordStart = false;
    }

    async created() {
        await this.getLocations();
    }
}
</script>

<template>
    <base-content-card title="My Account">
        <div class="py-5">
            <b-row class="d-flex justify-content-center">
                <b-col cols="12" md="10" lg="8" xl="4">
                    <b-alert show variant="danger" v-if="userFormError">{{
                        userFormError
                    }}</b-alert>

                    <b-form class="mb-4">
                        <b-form-group label="Username">
                            <b-form-input
                                readonly
                                :value="userLocal.username"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="E-mail">
                            <b-form-input
                                readonly
                                :value="userLocal.email"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Name *">
                            <b-form-input
                                v-model="userLocal.name"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="tips-group">
                            The next two fields are optional but if supplied,
                            will appear with your item posts.
                        </b-form-group>

                        <b-form-group label="Contact Number">
                            <b-form-input
                                v-model="userLocal.contact_number"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Location">
                            <b-form-select
                                v-model="userLocal.location"
                                :options="locations"
                            ></b-form-select>
                        </b-form-group>

                        <b-button
                            type="submit"
                            variant="primary"
                            class="text-white"
                            :disabled="isUpdateUserStart"
                            block
                            @click="updateUser"
                        >
                            <b-spinner
                                small
                                label="Loading..."
                                v-if="isUpdateUserStart"
                            ></b-spinner
                            ><span v-else>Update Profile</span>
                        </b-button>
                    </b-form>

                    <b-alert show variant="danger" v-if="passwordFormError">{{
                        passwordFormError
                    }}</b-alert>
                    <b-form class="mb-4">
                        <b-form-group id="tips-group">
                            To keep your current password, leave the following
                            fields empty.
                            <span class="text-danger"
                                >Passwords should be at least 6 characters
                                long.</span
                            >
                        </b-form-group>

                        <b-form-group label="Current Password *">
                            <b-form-input
                                type="password"
                                v-model="passwordForm.current_password"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="New Password *">
                            <b-form-input
                                type="password"
                                v-model="passwordForm.password"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Re-enter new password *">
                            <b-form-input
                                type="password"
                                v-model="passwordForm.password_confirmation"
                            ></b-form-input>
                        </b-form-group>

                        <b-button
                            variant="primary"
                            class="text-white"
                            :disabled="isChangePasswordStart"
                            block
                            @click="changePassword"
                        >
                            <b-spinner
                                small
                                label="Loading..."
                                v-if="isChangePasswordStart"
                            ></b-spinner
                            ><span v-else>Change Password</span>
                        </b-button>
                    </b-form>
                </b-col>
            </b-row>
        </div>
    </base-content-card>
</template>
