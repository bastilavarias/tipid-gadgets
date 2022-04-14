<template>
    <div class="editor">
        <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
        ></ckeditor>
    </div>
</template>

<script>
import ClassicEditor from '@/assets/builds/ck-editor';

export default {
    name: 'base-text-editor',

    props: {
        value: String,
    },

    data() {
        return {
            editor: ClassicEditor,
            editorData: this.value || '',
            editorConfig: {},
        };
    },

    watch: {
        value(val) {
            this.editorData = val || '';
        },

        editorData(val) {
            this.$emit('input', val);
        },
    },
};
</script>

<style lang="scss" scoped>
.editor::v-deep .ck-editor {
    color: black;
}

.editor::v-deep .ck-editor__editable {
    min-height: 10rem;
}
</style>
