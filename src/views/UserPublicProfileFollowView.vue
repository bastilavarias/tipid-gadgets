<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { UserInformation } from '@/types/user';
import { GET_USER_FOLLOW } from '@/store/modules/user';
import BaseContentCard from '@/components/BaseContentCard.vue';
import UserListItem from '@/components/UserListItem.vue';
@Component({
    components: { UserListItem, BaseContentCard },
})
export default class UserPublicProfileFollView extends Vue {
    @Prop(Object) readonly user: UserInformation | undefined; // It came from Public Profile Layout

    shouldBootPage = false;

    follower = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'follower',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };

    following = {
        loading: false,
        items: [],
        page: 1,
        perPage: 5,
        filterBy: 'following',
        sortBy: 'created_at',
        orderBy: 'desc',
        total: 0,
    };

    get shouldShowFollowerPaginationComponent() {
        return this.shouldBootPage && this.follower.items.length > 0;
    }

    get shouldShowFollowingPaginationComponent() {
        return this.shouldBootPage && this.following.items.length > 0;
    }

    get hasFollowersData() {
        return !this.follower.loading && this.follower.items.length > 0;
    }

    get hasFollowingData() {
        return !this.following.loading && this.following.items.length > 0;
    }

    @Watch('follower.page')
    async onChangeFollowerPage() {
        await this.getFollowers();
    }

    @Watch('following.page')
    async onChangeFollowingPage() {
        await this.getFollowing();
    }

    async getFollowers() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.follower;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.follower.loading = true;
        const result = await this.$store.dispatch(GET_USER_FOLLOW, payload);
        this.follower.items = result.data.data;
        console.log(this.follower.items);
        console.log(this.follower.items);
        this.follower.total = result.data.pagination.total;
        this.follower.loading = false;
    }

    async getFollowing() {
        const { page, perPage, filterBy, sortBy, orderBy } = this.following;
        const payload = {
            page,
            perPage,
            filterBy,
            sortBy,
            orderBy,
            userID: this.user?.id,
        };
        this.following.loading = true;
        const result = await this.$store.dispatch(GET_USER_FOLLOW, payload);
        this.following.items = result.data.data;
        console.log(this.following.items);
        this.following.total = result.data.pagination.total;
        this.following.loading = false;
    }

    async created() {
        await this.getFollowers();
        await this.getFollowing();

        this.shouldBootPage = true;
    }
}
</script>

<template>
    <div>
        <b-row v-if="shouldBootPage">
            <b-col cols="12" class="mb-3">
                <base-content-card title="Followers">
                    <b-list-group class="mb-3" v-if="hasFollowersData">
                        <template v-for="(follower, index) in follower.items">
                            <user-list-item
                                :inherited-index="index"
                                :user="follower.follower"
                                :key="index"
                            ></user-list-item>
                        </template>
                    </b-list-group>

                    <div class="text-center py-4" v-else>
                        <span class="text-black-50">No data.</span>
                    </div>

                    <div
                        class="d-flex justify-content-center"
                        v-if="shouldShowFollowerPaginationComponent"
                    >
                        <b-pagination
                            :total-rows="follower.total"
                            :per-page="follower.perPage"
                            v-model="follower.page"
                        ></b-pagination>
                    </div>
                </base-content-card>
            </b-col>

            <b-col cols="12">
                <base-content-card title="Following">
                    <b-list-group class="mb-3" v-if="hasFollowingData">
                        <template v-for="(following, index) in following.items">
                            <user-list-item
                                :inherited-index="index"
                                :user="following.user"
                                :key="index"
                            ></user-list-item>
                        </template>
                    </b-list-group>

                    <div class="text-center py-4" v-else>
                        <span class="text-black-50">No data.</span>
                    </div>

                    <div
                        class="d-flex justify-content-center"
                        v-if="shouldShowFollowingPaginationComponent"
                    >
                        <b-pagination
                            :total-rows="following.total"
                            :per-page="following.perPage"
                            v-model="following.page"
                        ></b-pagination>
                    </div>
                </base-content-card>
            </b-col>
        </b-row>
    </div>
</template>
