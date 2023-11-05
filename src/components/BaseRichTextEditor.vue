<script lang="ts">
import { Component, Vue, VModel, Prop } from 'vue-property-decorator';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

@Component({
    components: { quillEditor },
})
export default class BaseRichTextEditor extends Vue {
    @VModel({ type: String }) name!: string;
    @Prop() readonly placeholder!: string;

    editorOption = {
        modules: {
            toolbar: [
                [
                    { size: [false, 'large'] },
                    'bold',
                    'italic',
                    'underline',
                    { list: 'ordered' },
                    { list: 'bullet' },
                    'link',
                    'image',
                ],
            ],
        },
        placeholder: this.placeholder,
        theme: 'snow',
    };
}
</script>

<template>
    <div class="editor">
        <quill-editor v-model="name" :options="editorOption"> </quill-editor>
    </div>
</template>

<style lang="scss" scoped>
.editor::v-deep .ql-editor {
    min-height: 10rem;
    color: black;
}
</style>
