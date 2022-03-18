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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: null,
            editorConfig: {
                removePlugins: ['Heading'],
            },
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
