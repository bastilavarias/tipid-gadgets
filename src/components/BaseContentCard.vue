<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseContentCard extends Vue {
    @Prop(String) readonly title: string | undefined;
}
</script>

<template>
    <b-card
        border-variant="secondary"
        header-border-variant="secondary"
        :header="title"
        header-bg-variant="secondary"
        header-text-variant="white"
        align="left"
        class="border-0"
        no-body
    >
        <slot></slot>
    </b-card>
</template>
