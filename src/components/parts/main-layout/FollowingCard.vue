<template>
    <v-card flat>
        <v-card-title class="secondary caption font-weight-medium white--text">
            Members you follow
        </v-card-title>

        <v-card outlined tile>
            <v-card-text style="max-height: 12rem">
                <div
                    class="fill-height d-flex justify-center align-center"
                    v-if="!isGetUserFollowsStart && users.length === 0"
                >
                    <span class="caption font-italic">No following.</span>
                </div>

                <v-row dense v-else>
                    <template v-for="(user, index) in users">
                        <v-col cols="12" :key="index">
                            <div
                                class="subtitle-2 primary--text text-decoration-underline pointer"
                                @click="goToUser(user.user.username)"
                            >
                                {{ user.user.username }}
                            </div>
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script>
import { GET_USER_FOLLOWS } from '@/store/types/user';
import redirectionMixin from '@/mixins/redirection';

export default {
    name: 'main-layout-following-card',

    mixins: [redirectionMixin],

    data() {
        return {
            users: [],
            isGetUserFollowsStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        async getUserFollows() {
            this.isGetUserFollowsStart = true;
            const payload = {
                page: 1,
                perPage: 5,
                filterBy: 'following',
                userID: this.user.id,
            };
            this.users = await this.$store.dispatch(GET_USER_FOLLOWS, payload);
            this.isGetUserFollowsStart = false;
        },
    },

    async created() {
        await this.getUserFollows();
    },
};
</script>
