<!-- tiptap 버전 -->
<template>
<v-container>
  <div>

  </div>
   <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive}">
      <div class="menubar">
        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
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
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
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
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
           H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
           H3
        </button>

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

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <icon name="hr" />
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </button>

      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
  </v-container>
</template>

<script>
import Icon from '@/components/note/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
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

export default {
    components: {
    EditorContent,
    EditorMenuBar,
    Icon
  },
  props:{
    title:""
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
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
        content: `
         <h2>
            하하하하
          </h2>
          <p>
           진짜 힘들다...
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              리스트 1
            </li>
            <li>
              리스트 2
            </li>
          </ul>
          <blockquote>
            어렵다...
            <br />
            -- svg loader...
          </blockquote>

          <h2>
            이미지 첨부 해보자
          </h2>
          <p>
            잘되네
          </p>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD///8lJSX8/Pzy8vK1tbXs7OykpKTp6elgYGDGxsb29vbT09Pi4uLe3t7l5eV5eXmJiYmampqpqamwsLC6urpqamqQkJBVVVU7OzvPz89ISEh/f3/Y2NhJSUlvb28SEhIdHR0sLCwiIiIzMzOOjo5BQUFjY2OCJAuRAAADhElEQVR4nO3c20LqMBBGYULL+SByEhAEdSPv/4a7oCLFpgU7dYa6vlt7Mb+UJpmkVCoAAAAAAAAAAAAAAAAAAAAAAPwt1elMu4QiDdod52raVRRmMwrcXmkTNtyHsXYlxZh1PgO6hnYthTh+gJF77WKK0D4J6Oba1RRgcRrQaVdTgFosYFu7HHnLWEA30K5H3Es8YAlv0lU84Ei7HnHr0n+E9XjA8g33u3jAULseefGh0JVw5RQPONQuR158LJxol1OAWtkDxgbDEt6ika9VYdDSrqUYx4ClbV18fgNftAspTBh0+rW1dhW4VHW6fBhuB2/eCzbrRrsXhvXVZDj9xbpkbO7bx8dmsNg+f79i3ujFRv/+sPr7Zf7YLNZp2uuereQf7s6viCxuZZb6uEqo3gXj4+26+/YPOP4j/mkWfqmar3zXbOxeq+txx3uBu4WJzjxMq/8CXe0EGaY580Wa2hlSLbMDZKtrp0gxkAgYDRzaObxmMgENT8uDsifsSgW0unIU+hK60OzsTegetfskHcoENNwilgnozN6ila1MQMPrxKTV0PUMd1DnIgED7RgpGtnlX+BBO0aKvkRAyx+hzJPU8oZ3SySh5RaGyHBvdzZTSevNXMHqiuIgsbt2LdMn+OrZ9Wezumg6EFlX2J2SVoQGC+0QqUhIwgPLA75Mwp12ijQiCbfaKdKkbiddyvScpimR0HATSqoZbPkIylgkoeXTtDLN0o52jBQCG6N7S+0cfs8yCS0/a2QSWv4mLrKrv8ijdhAvmX6p5YfNk1BCd6edxEtsh9vsMQXvQa6rNTfaWZKJnKR5Z/UEuFxCq6sMsZMYe4HF3qngbbpn8SV92YQWD9OK7F18Mjnyv0kmtDlBFdkH/rDRDpPo/A3fHKy+oy+yA3XwpB3FQ+rsnltpJ/GS+hAtDhXvhNo1lo/ri+x2m/45F5HDX4YPt0VG+QOaPhkVyfvKjHPW37/M3bBZaCfIlLPrZv0e3ct3ltb0RvCHap6ANvsX53LMwG2/t/bl57uJpo9FnfppV8poGzFJLztNAsPbh995H6iB/9iGxQ5iioQ5eL/Rej38bb6cJGxz3Nwv053NUMNh/FcHpmc7jqHdnUOvp5Mv4yLhbZ+X0dcHGdh/ST1RaxIt+oN6+37ju2DUrXfC3uTmblAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+OP+A6Y+Jr772V2mAAAAAElFTkSuQmCC" />
        `,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
  }
}
</script>


<style lang="scss">
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

    word-wrap: break-word;

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
