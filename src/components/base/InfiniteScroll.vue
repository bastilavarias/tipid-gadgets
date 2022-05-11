<template>
    <infinite-loading
        @infinite="action"
        :identifier="identifierLocal"
        :direction="direction"
    >
        <div slot="spinner">
            <slot name="loading"></slot>
        </div>
        <div slot="no-more">
            <slot name="complete"></slot>
        </div>
        <div slot="no-results">
            <slot name="empty"></slot>
        </div>
    </infinite-loading>
</template>

<script>
export default {
    name: 'base-infinite-scroll',

    props: {
        action: Function,
        identifier: [Number, null],
        direction: [String, null],
    },

    data() {
        return {
            identifierLocal: this.identifier,
        };
    },

    watch: {
        identifier(val) {
            this.identifierLocal = val;
        },

        identifierLocal(val) {
            this.$emit('update:identifier', val);
        },
    },
};
</script>
