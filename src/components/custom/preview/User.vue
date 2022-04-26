<template>
    <v-card flat outlined>
        <v-list-item three-line>
            <v-list-item-avatar v-if="avatar">
                <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="primary--text font-weight-bold"
                    >{{ name }}
                </v-list-item-title>
                <v-list-item-subtitle>@{{ username }} </v-list-item-subtitle>
                <v-list-item-subtitle
                    ><span v-if="location">
                        Location:
                        <span class="font-weight-bold secondary--text">{{
                            location
                        }}</span>
                    </span>
                    <span class="grey--text" v-else>
                        No location included
                    </span></v-list-item-subtitle
                >
            </v-list-item-content>
            <v-list-item-action>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-message-text</v-icon>
                        </v-btn>
                    </template>
                    <span>Inquire</span>
                </v-tooltip>
            </v-list-item-action>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
    name: 'user-preview',

    props: {
        name: String,
        username: String,
        location: String,
        avatar: String,
    },
};
</script>
