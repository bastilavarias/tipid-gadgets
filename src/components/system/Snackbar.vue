<template>
    <v-snackbar v-model="configs.open" :color="configs.color" :timeout="3000">
        {{ configs.message }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="configs.open = false"
            >
                Close
            </v-btn>
        </template></v-snackbar
    >
</template>

<script>
import { CONFIGURE_SYSTEM_SNACKBAR } from '@/store/types/system';
export default {
    name: 'system-snackbar',

    data() {
        return {
            configs: Object.assign({}, this.snackbarConfigs),
        };
    },

    computed: {
        snackbarConfigs() {
            return this.$store.state.system.snackbar;
        },
    },

    watch: {
        snackbarConfigs({ open, message, color }) {
            if (open && message && color) {
                this.configs = Object.assign({}, { open, message, color });
            }
        },

        configs(value) {
            if (!value.open) {
                this.$store.commit(CONFIGURE_SYSTEM_SNACKBAR, {
                    open: false,
                    message: null,
                    color: false,
                });
            }
        },
    },
};
</script>
