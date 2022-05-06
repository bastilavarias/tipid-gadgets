<template>
    <v-dialog width="500" v-model="isOpenLocal">
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text> {{ description }}</v-card-text>
            <v-card-actions>
                <v-spacer> </v-spacer>
                <v-btn
                    color="dark"
                    text
                    class="text-capitalize"
                    depressed
                    @click="$emit('onCancel')"
                    >Cancel</v-btn
                >
                <v-btn
                    :color="color"
                    :loading="loading"
                    depressed
                    @click="$emit('onProceed')"
                    >Proceed</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'base-alert-dialog',

    props: {
        isOpen: false,
        title: String,
        description: String,
        loading: Boolean,
        theme: String,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
        };
    },

    computed: {
        color() {
            let color = null;
            if (this.theme === 'primary') color = 'primary';
            else if (this.theme === 'success') color = 'success';
            else if (this.theme === 'warning') color = 'error';
            return color;
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },
        isOpenLocal(value) {
            this.$emit('update:isOpen', value);
        },
    },
};
</script>
