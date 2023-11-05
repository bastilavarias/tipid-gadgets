<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';

@Component
export default class BaseInfiniteScroll extends Vue {
    @Prop(Function) readonly action: any;
    @PropSync('identifier', { type: Number }) identifierLocal!: number;
    @Prop(String) readonly direction: string | undefined;
}
</script>

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
