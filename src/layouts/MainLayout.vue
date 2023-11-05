<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import NavigationCard from '@/components/NavigationCard.vue';
import SearchCard from '@/components/SearchCard.vue';
import CatalogCard from '@/components/CatalogCard.vue';
import UserActionCard from '@/components/UserActionCard.vue';
import authenticationModule from '@/store/modules/authentication';
import broadcastService from '@/services/broadcast';
import UpdatedThreadCard from '@/components/UpdatedThreadCard.vue';
@Component({
    components: {
        UpdatedThreadCard,
        UserActionCard,
        CatalogCard,
        SearchCard,
        NavigationCard,
    },
})
export default class MainLayout extends Vue {
    get isAuthenticated() {
        return authenticationModule.state.isAuthenticated;
    }

    @Watch('isAuthenticated')
    onIsAuthenticatedChange(value: boolean) {
        if (value) {
            broadcastService.initialize();
        }
    }

    created() {
        if (this.isAuthenticated) {
            broadcastService.initialize();
        }
    }
}
</script>

<template>
    <div>
        <b-navbar variant="secondary">
            <b-container class="py-2">
                <b-navbar-brand href="/">
                    <img
                        :src="require('@/assets/logo.png')"
                        width="250"
                        height="auto"
                        class="d-inline-block align-top"
                        alt="Kitten"
                    />
                </b-navbar-brand>
            </b-container>
        </b-navbar>

        <b-container>
            <b-card class="mb-4"
                ><b-row>
                    <b-col cols="12" md="4" xl="3">
                        <b-row>
                            <b-col cols="12" class="mb-3">
                                <navigation-card></navigation-card>
                            </b-col>
                            <b-col
                                cols="12"
                                class="mb-3"
                                v-if="isAuthenticated"
                            >
                                <user-action-card></user-action-card>
                            </b-col>
                            <b-col cols="12" class="mb-3">
                                <search-card></search-card>
                            </b-col>
                            <b-col cols="12" class="mb-3">
                                <catalog-card></catalog-card>
                            </b-col>
                            <b-col cols="12">
                                <updated-thread-card></updated-thread-card>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="12" md="8" xl="9">
                        <router-view></router-view>
                    </b-col>
                </b-row>
            </b-card>

            <div class="w-100 text-center mb-4">
                <span class="text-white"
                    >© 2022 TipidGadgets.com. All Rights Reserved.</span
                >
            </div>
        </b-container>
    </div>
</template>
