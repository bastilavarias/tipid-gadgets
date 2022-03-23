<template>
    <v-card flat color="transparent">
        <v-card-subtitle>Comment to Reply</v-card-subtitle>

        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <base-text-editor></base-text-editor>
                </v-col>

                <v-col cols="12">
                    <div class="d-flex justify-space-between">
                        <v-spacer></v-spacer>
                        <v-btn
                            depressed
                            color="secondary"
                            class="text-capitalize"
                            >Post</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import BaseTextEditor from '@/components/base/TextEditor';
export default {
    name: 'forum-comment-reply-card',
    components: { BaseTextEditor },
};
</script>
