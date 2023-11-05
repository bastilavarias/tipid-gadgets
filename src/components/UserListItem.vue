<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserInformation } from '@/types/user';

@Component
export default class UserListItem extends Vue {
    @Prop(Object) readonly user: UserInformation | undefined;
    @Prop(Number) readonly inheritedIndex: number | undefined;
}
</script>

<template>
    <b-list-group-item
        class="flex-column align-items-start border-0"
        :style="{
            backgroundColor: inheritedIndex % 2 === 0 ? 'white' : '#f8f9fa',
        }"
    >
        <div class="d-flex w-100 flex-column text-truncate">
            <router-link
                :to="{
                    name: 'User Public Profile View',
                    params: { username: user.username },
                }"
            >
                <span class="h6 text-primary font-weight-bold">
                    {{ user.username }}
                </span>
            </router-link>
            <h6 class="h6 mb-0">
                {{ user.name }}
            </h6>
        </div>
        <div class="d-flex w-100 justify-content-between text-truncate">
            <div>
                <span>
                    Location:
                    <span class="text-black-50 font-weight-bold">{{
                        user.location
                    }}</span>
                </span>
            </div>
        </div>
    </b-list-group-item>
</template>
