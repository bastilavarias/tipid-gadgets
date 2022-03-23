<template>
    <v-row justify="center">
        <v-col cols="12" md="10" lg="8" xl="6">
            <v-row dense>
                <v-col cols="12">
                    <v-card flat color="transparent">
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <span class="font-weight-bold"
                                >Login to TipidGadgets</span
                            >
                            <v-spacer></v-spacer>
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <div class="caption grey--text mb-1">Username</div>
                    <v-text-field
                        placeholder="Username"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <div class="caption grey--text mb-1">Password</div>
                    <v-text-field
                        placeholder="Password"
                        outlined
                        dense
                        type="password"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="primary"
                        block
                        class="text-capitalize"
                        depressed
                        >Login</v-btn
                    >
                </v-col>

                <v-col cols="12" class="my-5">
                    <div class="text-center overline">Or Login VIa</div>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        color="#24292F"
                        block
                        class="text-capitalize"
                        depressed
                        dark
                    >
                        <v-icon class="mr-1">mdi-github</v-icon>
                        Git<span class="text-capitalize">H</span>ub
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
