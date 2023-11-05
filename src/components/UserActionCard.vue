<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PURGE_AUTHENTICATION } from '@/store/modules/authentication';
@Component
export default class UserActionCard extends Vue {
    actions = [
        {
            text: 'Profile',
            to: { name: 'User Profile View' },
        },

        {
            text: 'Ratings',
            to: { name: 'User Rating View' },
        },

        {
            text: 'Posts',
            to: { name: 'User Post View' },
        },

        {
            text: 'Bookmarks',
            to: { name: 'User Bookmark View' },
        },

        {
            text: 'Messages',
            to: { name: 'User Message View' },
        },
    ];

    logout() {
        this.$router.push({ name: 'Login View' });
        this.$store.commit(PURGE_AUTHENTICATION);
    }
}
</script>

<template>
    <b-card class="border-0" no-body>
        <div class="mb-2">
            <span class="text-black-50">User Actions:</span>
        </div>
        <b-list-group>
            <template v-for="(action, index) in actions">
                <b-list-group-item class="py-1" :to="action.to" :key="index"
                    ><a href="#">
                        <span class="text-primary" style="font-size: 0.9rem">{{
                            action.text
                        }}</span>
                    </a></b-list-group-item
                >
            </template>
            <b-list-group-item class="py-1" @click="logout">
                <span
                    class="text-primary"
                    style="font-size: 0.9rem; cursor: pointer"
                >
                    Logout</span
                >
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>
