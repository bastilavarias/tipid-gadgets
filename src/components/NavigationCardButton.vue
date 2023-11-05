<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavigationCardButton extends Vue {
    @Prop(Object) readonly to: object | undefined;
}
</script>

<template>
    <b-button
        block
        variant="primary"
        class="text-white font-weight-bold"
        :to="to"
        ><slot></slot
    ></b-button>
</template>
