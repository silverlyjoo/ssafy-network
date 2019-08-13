<!-- tiptap 버전 -->
<template>
<v-container >
  <div style="margin-top: 20px; margin-left:30px;">
    <h1>{{title}}</h1>
  </div>
   <div class="editor">
    <editor-content class="editor__content" :editor="editor"/>
  </div>
  <v-flex text-xs-right>
  <v-btn color="grey darken-2"
                    class="white--text" @click="updateNote()">수정</v-btn>
  </v-flex>
  </v-container>
</template>

<script>
import Icon from '@/components/note/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  CodeBlockHighlight,
  Image,
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

export default {
    components: {
    EditorContent,
    EditorMenuBar,
    Icon
  },
  props:{
      data:{type:Object}
  },
  data() {
    return {
      editor: {type:Object},
        title:"",
        content:"",
    }
  },
  beforedestroy() {
    this.editor.destroy()
  },
  methods: {
    updateNote(){
      this.$router.push({name:"markdownupdate",params:{data:this.data , title:this.title , content:this.content} })
    },
    close(){
       this.$router.push("/note/calendar")
    },
    settingEditor(){
     this.content=this.data.content;
               this.title=this.data.name;
               this.editor = new Editor({
                   editable: false,
        extensions: [new CodeBlockHighlight({
            languages: {
              javascript,
              css,
            },
          }),
          new Image(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: this.data.content,
      });     
    }
  },created(){
    this.settingEditor();
  },updated(){
  },
  watch:{
    data(to,from){
      this.editor.destroy();
      this.settingEditor();
    }
  },

}
</script>


<style lang="scss">
pre {
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    .hljs-comment,
    .hljs-quote {
      color: #999999;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f2777a;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #f99157;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #99cc99;
    }
    .hljs-title,
    .hljs-section {
      color: #ffcc66;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #6699cc;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
}
.menubar{
  
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    background: transparent;
    border: 0;
    color: black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(black, 0.05);
    }

    &.is-active {
      background-color: rgba(black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
.button {
  font-weight: bold;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: black;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(black, 0.1);

  &:hover {
    background-color: rgba(black, 0.15);
  }
}
.editor {
  position: relative;
  max-width: 50rem;
  margin: 4rem auto 4rem auto;
  
  &__content {
    padding: 20px;
    word-wrap: break-word;
    background: rgb(236, 236, 236);
    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: black!important;
      color: white!important;
      overflow-x: auto;
      code {
        font-family: monospace!important;
        font-weight: 100;
         display: inline-block!important;
        padding: 0 0.4rem!important;
        border-radius: 5px!important;
        font-size:1rem!important;
        background: rgba(black, 0.1)!important;
        color: rgba(white, 0.9)!important;
      }
    }


    ul,
    ol {
      padding-left: 1rem;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      color: inherit;
    }

    blockquote {
      border-left: 3px solid rgba(black, 0.1);
      color: rgba(black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td, th {
        min-width: 1em;
        border: 2px solid gray;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0; right: 0; top: 0; bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px; top: 0; bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }

  }
}
</style>
