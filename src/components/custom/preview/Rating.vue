<template>
    <v-card outlined>
        <v-list-item two-line>
            <v-list-item-avatar>
                <v-img
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                    >bastilavar21</v-list-item-title
                >
                <v-list-item-subtitle
                    >on May 14, 2021 01:05 PM</v-list-item-subtitle
                >
            </v-list-item-content>
            <v-card-actions>
                <rating-status-chip :rating="rating"></rating-status-chip>
            </v-card-actions>
        </v-list-item>

        <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            dolorem eaque earum excepturi fuga hic ipsa magni maxime neque
            praesentium provident, temporibus? Distinctio facere modi neque
            officiis voluptatibus. Adipisci animi dolore est et harum hic magni,
            minus nulla, perferendis, repudiandae tempore voluptate. Ducimus
            inventore ipsum libero nemo! Dolorum, minima molestiae!
        </v-card-text>
    </v-card>
</template>

<script>
import RatingStatusChip from '@/components/custom/RatingStatusChip';
export default {
    name: 'rating-preview',

    components: { RatingStatusChip },

    props: {
        rating: String,
    },
};
</script>
