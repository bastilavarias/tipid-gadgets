<template>
    <v-card flat color="transparent">
        <v-card-subtitle>Comments (5)</v-card-subtitle>

        <v-card-text>
            <v-row dense>
                <template v-for="n in 5">
                    <v-col cols="12" :key="n">
                        <v-card outlined>
                            <v-list-item three-line>
                                <v-list-item-avatar>
                                    <v-img
                                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="primary--text font-weight-bold"
                                        >bastilavar21</v-list-item-title
                                    >
                                    <v-list-item-subtitle
                                        >Commented 3 hours
                                        ago</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle
                                        >Location:
                                        <span
                                            class="font-weight-bold secondary--text"
                                            >Quezon City, Metro Manila</span
                                        ></v-list-item-subtitle
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Animi, at atque autem
                                blanditiis cum deserunt ea expedita illo labore
                                magnam nemo recusandae repellat, sit ullam ut
                                velit voluptate. Amet eaque est iste iusto saepe
                                sapiente, similique velit veritatis! Animi
                                dolorum eum fugiat molestias, numquam
                                praesentium quae rem reprehenderit soluta
                                voluptatum.
                            </v-card-text>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'forum-comment-list-card',
};
</script>
