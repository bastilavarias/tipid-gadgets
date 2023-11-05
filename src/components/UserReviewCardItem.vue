<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ReviewInformation } from '@/types/review';
import dateMixin from '@/mixins/date';
import ProductListItem from '@/components/ProductListItem.vue';
@Component({
    components: { ProductListItem },
})
export default class UserReviewCardItem extends Vue {
    @Prop(Object) readonly review: ReviewInformation | undefined;

    get date() {
        return dateMixin.toChatDate(String(this.review?.created_at));
    }
}
</script>

<template>
    <b-card>
        <div class="d-flex w-100 justify-content-between text-truncate">
            <router-link
                :to="{
                    name: 'User Public Profile View',
                    params: { username: review.reviewer.username },
                }"
            >
                <span class="h6 text-primary font-weight-bold mb-0">
                    {{ review.reviewer.username }}
                </span>
            </router-link>
            <small>{{ date }}</small>
        </div>
        <div class="d-flex w-100 justify-content-between text-truncate mb-2">
            <b-form-rating
                variant="primary"
                :value="review.rating"
                no-border
                inline
                readonly
                style="padding-left: 0"
            ></b-form-rating>
        </div>
        <div class="mb-2">
            <product-list-item
                :inherited-index="1"
                :product="review.transaction.item"
                read-only
                v-if="review.transaction.item"
            ></product-list-item>
        </div>
        <div class="d-flex w-100 justify-content-between text-truncate">
            <span class="text-black-50">
                {{ review.content }}
            </span>
        </div>
    </b-card>
</template>
