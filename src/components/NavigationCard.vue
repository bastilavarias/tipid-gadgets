<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import NavigationCardButton from '@/components/NavigationCardButton.vue';
import authenticationModule from '@/store/modules/authentication';

interface Navigation {
    text: string;
    to: {
        name: string;
    };
}

@Component({
    components: { NavigationCardButton },
})
export default class NavigationCard extends Vue {
    navigations: Array<Navigation> = [];

    get isAuthenticated() {
        return authenticationModule.state.isAuthenticated;
    }

    defaultNavigations = [
        {
            text: 'Home',
            to: { name: 'Home View' },
        },

        {
            text: 'Visit the Forums',
            to: { name: 'Forum View' },
        },
    ];

    publicNavigations = [
        {
            text: 'Register Now!',
            to: { name: 'Registration View' },
        },

        {
            text: 'Member Log in!',
            to: { name: 'Login View' },
        },
    ];

    privateNavigations = [
        {
            text: 'Post an Item',
            to: {
                name: 'Product Action View',
                query: { action: 'new' },
            },
        },

        {
            text: 'Start a Topic',
            to: {
                name: 'Thread Action View',
                query: { action: 'new' },
            },
        },
    ];

    @Watch('isAuthenticated')
    onAuthenticationChange() {
        this.setNavigations();
    }

    setNavigations() {
        if (this.isAuthenticated) {
            this.navigations = [...this.privateNavigations];
        } else {
            this.navigations = [...this.publicNavigations];
        }

        this.navigations = [...this.defaultNavigations, ...this.navigations];
    }

    created() {
        this.setNavigations();
    }
}
</script>

<template>
    <b-row>
        <template v-for="(navigation, index) in navigations">
            <b-col
                cols="12"
                :class="{
                    'mb-2': index !== navigations.length - 1,
                }"
                :key="index"
            >
                <navigation-card-button :to="navigation.to">{{
                    navigation.text
                }}</navigation-card-button>
            </b-col>
        </template>
    </b-row>
</template>
