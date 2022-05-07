<template>
    <v-card flat outlined>
        <v-list-item three-line>
            <v-list-item-avatar v-if="avatar">
                <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title
                    @click="goToUser(username)"
                    class="primary--text font-weight-bold pointer"
                    >{{ name }}
                </v-list-item-title>
                <v-list-item-subtitle
                    @click="goToUser(username)"
                    class="pointer"
                    >@{{ username }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                    ><span v-if="location"
                        >Location:
                        <span class="font-weight-bold secondary--text">{{
                            location
                        }}</span>
                    </span>
                    <span class="grey--text" v-else>
                        No location included
                    </span></v-list-item-subtitle
                >
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import redirectionMixin from '@/mixins/redirection';

export default {
    name: 'user-preview',

    mixins: [redirectionMixin],

    props: {
        name: String,
        username: String,
        location: String,
        avatar: String,
    },
};
</script>
