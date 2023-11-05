<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ThreadCommentInformation } from '@/types/thread';
import dateMixin from '@/mixins/date';

@Component
export default class ThreadCommentItem extends Vue {
    @Prop(Object) readonly comment: ThreadCommentInformation | undefined;

    get date() {
        return dateMixin.toPostDate(String(this.comment?.created_at));
    }
}
</script>

<template>
    <b-media>
        <div class="mt-0 d-flex justify-content-between">
            <div class="text-truncate">
                <router-link
                    :to="{
                        name: 'User Public Profile View',
                        params: { username: comment.user.username },
                    }"
                >
                    <h5 class="text-primary font-weight-bold">
                        {{ comment.user.username }}
                    </h5>
                </router-link>
                <h6 class="">{{ comment.user.name }}</h6>
            </div>
            <small>{{ date }}</small>
        </div>
        <div v-html="comment.content"></div>
    </b-media>
</template>
