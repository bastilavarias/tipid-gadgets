<template>
    <v-row>
        <v-col cols="12" lg="8" xl="9">
            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">General Information</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Name</div>
                            <v-text-field
                                outlined
                                placeholder="Name"
                                dense
                                color="primary"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div class="caption grey--text mb-1">Location</div>
                            <v-autocomplete
                                outlined
                                placeholder="Location"
                                dense
                                color="primary"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12">
                    <div class="d-flex justify-space-between align-center">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" depressed>
                            <span class="text-capitalize mr-1">Update</span>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

            <v-row dense>
                <v-col cols="12">
                    <div class="subtitle-1">Password</div>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                Current Password
                            </div>
                            <v-text-field
                                outlined
                                placeholder="Current Password"
                                dense
                                color="primary"
                                type="password"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                New Password
                            </div>
                            <v-text-field
                                outlined
                                placeholder="New Password"
                                dense
                                color="primary"
                                type="password"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption grey--text mb-1">
                                Confirm Password
                            </div>
                            <v-text-field
                                outlined
                                placeholder="Confirm Password"
                                dense
                                color="primary"
                                type="password"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div
                                class="d-flex justify-space-between align-center"
                            >
                                <v-spacer></v-spacer>
                                <v-btn color="primary" depressed>
                                    <span class="text-capitalize mr-1"
                                        >Change Password</span
                                    >
                                    <v-icon>mdi-lock-reset</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" lg="4" xl="3"> </v-col>
    </v-row>
</template>
