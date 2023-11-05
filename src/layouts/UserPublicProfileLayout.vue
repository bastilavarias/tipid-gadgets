<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseContentCard from '@/components/BaseContentCard.vue';
import { UserInformation } from '@/types/user';
import {
    CHECK_USER_FOLLOWING_STATUS,
    FOLLOW_USER,
    GET_USER,
} from '@/store/modules/user';
import dateMixin from '@/mixins/date';
import authenticationModule from '@/store/modules/authentication';

@Component({
    components: {
        BaseContentCard,
    },
})
export default class UserPublicProfileLayout extends Vue {
    shouldBootPage = false;
    shouldDisplayUserNotFound = false;
    shouldDisplayFollowButton = false;
    user: UserInformation | null = null;
    isFollowed = false;
    isFollowStart = false;

    get username() {
        return this.$route.params.username;
    }

    get memberSince() {
        return dateMixin.toPostDate(String(this.user?.created_at));
    }

    get lastOnline() {
        return dateMixin.toPostDate(String(this.user?.updated_at));
    }

    get isYou() {
        // @ts-ignore
        const user: UserInformation = authenticationModule.state.user;
        return user?.id === this.user?.id;
    }

    get isAuthenticated() {
        return authenticationModule.state.isAuthenticated;
    }

    get shouldShowFollowButton() {
        return (
            this.shouldDisplayFollowButton &&
            this.isAuthenticated &&
            !this.isFollowed
        );
    }

    get shouldShowUnFollowButton() {
        return (
            this.shouldDisplayFollowButton &&
            this.isAuthenticated &&
            this.isFollowed
        );
    }

    @Watch('$route.params.username')
    onRouteUsernameParamChange(value: string) {
        if (value && value !== this.user?.username) {
            window.open(`/user/${value}`, '_self');
        }
    }

    async getUser() {
        const result = await this.$store.dispatch(GET_USER, this.username);
        if (result.success) {
            this.user = Object.assign({}, result.data);
            return;
        }
        this.shouldDisplayUserNotFound = true;
    }

    async getFollowingStatus() {
        const result = await this.$store.dispatch(
            CHECK_USER_FOLLOWING_STATUS,
            this.user?.id
        );
        if (result.success) {
            this.isFollowed = result.data;
            return;
        }
    }

    async follow() {
        const payload = {
            user_id: this.user?.id,
        };
        this.isFollowStart = true;
        const result = await this.$store.dispatch(FOLLOW_USER, payload);
        if (result.success) {
            this.isFollowed = !this.isFollowed;
            this.$bvToast.toast(
                `You ${
                    this.isFollowed ? 'followed' : 'un-followed'
                } this user.`,
                {
                    title: String(this.user?.username),
                    variant: 'success',
                    solid: true,
                }
            );
            this.isFollowStart = false;
            return;
        }
        this.isFollowStart = false;
    }

    async created() {
        if (!this.username) {
            await this.$router.go(-1);
        }
        await this.getUser();
        if (this.isYou) {
            await this.$router.push({ name: 'User Profile View' });
        }
        if (this.isAuthenticated) {
            await this.getFollowingStatus();
            this.shouldDisplayFollowButton = true;
        }
        this.shouldBootPage = true;
    }
}
</script>

<template>
    <div>
        <b-row v-if="shouldBootPage && !shouldDisplayUserNotFound">
            <b-col cols="12" class="mb-3">
                <base-content-card title="User">
                    <b-card-body>
                        <b-row>
                            <b-col cols="12" class="mb-3">
                                <div
                                    class="d-flex justify-content-between align-content-center"
                                >
                                    <div
                                        class="d-flex w-100 flex-column text-truncate"
                                    >
                                        <span
                                            class="h6 text-primary font-weight-bold"
                                        >
                                            {{ user.username }}
                                        </span>
                                        <h6 class="h6">
                                            {{ user.name }}
                                        </h6>
                                    </div>
                                    <div>
                                        <b-button
                                            variant="primary"
                                            class="text-white"
                                            @click="follow"
                                            v-if="shouldShowUnFollowButton"
                                            >Unfollow</b-button
                                        >
                                        <b-button
                                            variant="primary"
                                            class="text-white"
                                            @click="follow"
                                            v-if="shouldShowFollowButton"
                                            >Follow</b-button
                                        >
                                    </div>
                                </div>
                            </b-col>

                            <b-col cols="12">
                                <b-list-group-item
                                    class="flex-column align-items-start border-0"
                                    :style="{
                                        backgroundColor: '#f8f9fa',
                                    }"
                                >
                                    <div>Member Since: {{ memberSince }}</div>
                                    <div>Last Online: {{ lastOnline }}</div>
                                    <div>
                                        Location:
                                        <span class="font-weight-bold">{{
                                            user.location
                                        }}</span>
                                    </div>
                                    <div>
                                        Mobile Number:
                                        {{
                                            user.contact_number
                                                ? user.contact_number
                                                : 'N/A'
                                        }}
                                    </div>
                                </b-list-group-item>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </base-content-card>
            </b-col>

            <b-col cols="12" class="mb-3">
                <b-navbar toggleable="lg" variant="white" class="px-0">
                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item
                                :to="{
                                    name: 'User Public Profile View',
                                    params: { username: user.username },
                                }"
                                class="font-weight-bold"
                                exact
                                exact-active-class="text-primary "
                                >Posts</b-nav-item
                            >
                            <b-nav-item
                                :to="{
                                    name: 'User Public Profile Follow View',
                                    params: { username: user.username },
                                }"
                                exact
                                class="font-weight-bold"
                                exact-active-class="text-primary "
                                >Follower/Following</b-nav-item
                            >
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </b-col>

            <b-col cols="12">
                <router-view :user="user"></router-view>
            </b-col>
        </b-row>

        <div v-if="shouldDisplayUserNotFound">User not found.</div>
    </div>
</template>
