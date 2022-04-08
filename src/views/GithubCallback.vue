<template>
    <v-row justify="center" align-content="center">
        <div class="text-center py-10">
            <v-icon :size="150" color="primary">mdi-github</v-icon>
            <div style="margin-bottom: 2rem"></div>
            <h1 class="display-1 mb-5 font-weight-bold primary--text">
                Connecting to GitHub...
            </h1>
            <v-progress-circular
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
    </v-row>
</template>

<script>
import { GITHUB_AUTHENTICATION } from '@/store/types/authentication';
import utilityMixin from '@/mixins/utility';
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';

export default {
    mixins: [utilityMixin],

    async created() {
        const { code } = this.$route.query;
        if (code) {
            const result = await this.$store.dispatch(GITHUB_AUTHENTICATION, {
                code,
            });
            if (this.isHTTPRequestSuccess(result.code)) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: true,
                    message: result.message,
                    color: 'success',
                });
                return await this.$router.push({ name: 'home' });
            }
            this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                open: true,
                message: result.message,
                color: 'error',
            });
        }
        await this.$router.push({ name: 'login' });
    },
};
</script>
