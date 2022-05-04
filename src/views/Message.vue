<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Messages</v-card-title
                >

                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="3">
                            <message-rooms></message-rooms>
                        </v-col>

                        <v-col cols="12" md="9">
                            <v-card outlined rounded height="50rem">
                                <v-card-title class="primary--text"
                                    >bastilavar</v-card-title
                                >
                                <v-card-subtitle
                                    class="secondary--text font-weight-bold"
                                    >Lenovo ideapad L3 15.6inch i3-10110u Ram
                                    8gb Hdd 1TB</v-card-subtitle
                                >

                                <v-card-text
                                    style="height: 40rem; overflow: auto"
                                >
                                    <v-row dense>
                                        <template v-for="n in 10">
                                            <v-col cols="12" :key="n">
                                                <message-chat
                                                    :self="n % 2 === 0"
                                                ></message-chat>
                                            </v-col>
                                        </template>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import MessageChat from '@/components/custom/message/Chat';
import MessageRooms from '@/components/custom/message/Room';

export default {
    components: { MessageRooms, MessageChat },
};
</script>
