<!-- tiptap 버전 -->
<template>
  <v-container>
    <div style="margin-top: 20px; margin-left:30px;">
      <h1>
        <v-text-field
          v-model="name"
          v-validate="'required|min:2|max:10'"
          data-vv-name="제목"
          :error-messages="errors.collect('제목')"
          ref="NoteName"
        ></v-text-field>
      </h1>
    </div>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive}">
        <div class="menubar">
          <button class="menubar__button" @click="showImagePrompt(commands.image)">
            <Icon name="image" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <icon name="bold" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <icon name="italic" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <icon name="strike" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <icon name="underline" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <icon name="paragraph" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <icon name="ul" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <icon name="ol" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <icon name="quote" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <icon name="code" />
          </button>

          <button class="menubar__button" @click="commands.horizontal_rule">
            <icon name="hr" />
          </button>

          <button class="menubar__button" @click="commands.undo">
            <icon name="undo" />
          </button>

          <button class="menubar__button" @click="commands.redo">
            <icon name="redo" />
          </button>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" />
    </div>
    <v-flex text-xs-right>
      <v-btn color="grey darken-2"
                    class="white--text" @click="close()">취소</v-btn>
      <v-btn color="grey darken-2"
                    class="white--text" @click="writeNote()">작성</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import Icon from "@/components/note/Icon";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  CodeBlockHighlight,
  Image,
  Blockquote,
  // CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  // Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

export default {
  name: "MarkdownEditor",
  $_veeValidate: {
    validator: "new"
  },
  components: {
    EditorContent,
    EditorMenuBar,
    Icon
  },
  props: {
    data: { type: Object },
    title: { type: String }
  },
  data() {
    return {
      changeContent: "",
      name: "",
      editor: new Editor({
        extensions: [
          new CodeBlockHighlight({
            languages: {
              javascript,
              css
            }
          }),
          new Image(),
          new Blockquote(),
          new BulletList(),
          // new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          // new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        onUpdate: ({ getHTML }) => {
          const newContent = getHTML();
          this.changeContent = newContent;
        },
        content: ""
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("이미지 url을 입력해주세요.");
      if (src !== null) {
        command({ src });
      }
    },
    writeNote() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        }
        var course = this.data.course.split(".");
        var courSize = course[course.length - 1].length + 1;
        var parentCourse = this.data.course.slice(0, Number("-" + courSize));
        // 중복 체크
        fetch(
          this.$store.state.dbserver +
            "/notes/txt/" +
            this.$session.get("id") +
            "/" +
            this.name +
            "/" +
            parentCourse +
            "/" +
            this.$session.get("token"),
          {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.result == false || data._id == this.data._id) {
              // 중복 X
              fetch(this.$store.state.dbserver + "/notes/txt", {
                method: "PUT",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  _id: this.data._id,
                  token: this.$session.get("token"),
                  name: this.name,
                  content: this.changeContent,
                  editor: "markdown"
                })
              })
                .then(res => res.json())
                .then(data => {
                  if (data.result == true) {
                    this.$store.state.NoteCheck = true;
                  } else {
                    alert("작성 실패..");
                  }
                  this.$router.push("/note/detail/" + this.data._id);
                });
            } else {
              alert("이미 존재하는 이름입니다.");
              this.name = this.title;
              this.$refs.NoteName.focus();
            }
          });
      });
    },
    close() {
      this.$router.push("/note/detail/" + this.data._id);
    }
  },
  created() {
    this.name = this.title;
  }
};
</script>


<style lang="scss">
.menubar {
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
      background: black !important;
      color: white !important;
      overflow-x: auto;
      code {
        font-family: monospace !important;
        font-weight: 100;
        display: inline-block !important;
        padding: 0 0.4rem !important;
        border-radius: 5px !important;
        font-size: 1rem !important;
        background: rgba(black, 0.1) !important;
        color: rgba(white, 0.9) !important;
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

      td,
      th {
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
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
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
