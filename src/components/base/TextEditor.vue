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

    data() {
        return {
            editor: ClassicEditor,
            editorData: null,
            editorConfig: {},
        };
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
