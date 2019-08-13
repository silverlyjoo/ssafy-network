<template>
  <v-layout class="pa-5" column>
    <v-flex>
      <v-card grid-list-md style="width:80%; margin-left:auto; margin-right:auto;">
        <v-card-text>
          <v-container>
            <v-layout wrap column>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  v-model="notetitle"
                  v-validate="'required|min:2|max:10'"
                  data-vv-name="제목"
                  :error-messages="errors.collect('제목')"
                  ref="notetitle"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select :items="languages" v-model="notelanguage" label="선택 언어" single-line></v-select>
              </v-flex>
              <v-flex xs12>
                <codemirror v-model="notesource" :options="customOption"></codemirror>
              </v-flex>
              <br />
              <v-flex xs12>
                <v-textarea label="내용" v-model="notecontent"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex class="text-xs-right ma-5">
      <v-btn color="grey darken-2"
                    class="white--text" @click="close()">취소</v-btn>
      <v-btn color="grey darken-2"
                    class="white--text" @click="updateCodeNote()">수정</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "CodeNoteUpdate",
  props: {
    data: { type: Object }
  },
  data() {
    return {
      notetitle: "",
      notesource: "",
      notecontent: "",
      notelanguage: "",
      languages: [{ text: "JavaScript" }, { text: "Python" }, { text: "Vue" }],
      customOption: {},
      cmOptionJs: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: "text/javascript",
        hintOptions: {
          completeSingle: false
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" }
      },
      cmOptionPy: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-python",
        theme: "mbo"
      },
      cmOptionVue: {
        autoCloseBrackets: true,
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "sublime",
        mode: "text/x-vue",
        theme: "base16-dark",
        extraKeys: {
          F11(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          Esc(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
      }
    };
  },
  watch: {
    notelanguage(to, from) {
      if (to == "JavaScript") {
        this.customOption = this.cmOptionJs;
      } else if (to == "Python") {
        this.customOption = this.cmOptionPy;
      } else if (to == "Vue") {
        this.customOption = this.cmOptionVue;
      }
    }
  },
  mounted() {
    this.notetitle = this.data.name;
    this.notesource = this.data.source;
    this.notecontent = this.data.content;
    this.notelanguage = this.data.language;

    if (this.data.language == "JavaScript") {
      this.customOption = this.cmOptionJs;
    } else if (this.data.language == "Python") {
      this.customOption = this.cmOptionPy;
    } else if (this.data.language == "Vue") {
      this.customOption = this.cmOptionVue;
    }
  },
  methods: {
    close() {
      this.$validator.reset();
      this.$router.push("/note/detail/" + this.data._id);
    },
    updateCodeNote() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        }
        // 중복 체크
        var course = this.data.course.split(".");
        var courSize = course[course.length - 1].length + 1;
        var parentCourse = this.data.course.slice(0, Number("-" + courSize));
        fetch(
          this.$store.state.dbserver +
            "/notes/" +
            this.$session.get("id") +
            "/" +
            this.notetitle +
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
            // 중복이 없다면
            if (data.result == false || data._id == this.data._id) {
              fetch(this.$store.state.dbserver + "/notes/txt", {
                method: "PUT",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  _id: this.data._id,
                  token: this.$session.get("token"),
                  name: this.notetitle,
                  content: this.notecontent,
                  language: this.notelanguage,
                  source: this.notesource,
                  editor: "code"
                })
              })
                .then(res => res.json())
                .then(data => {
                  if (data.result == true) {
                    this.$validator.reset();
                    this.$store.state.NoteCheck = true;
                    this.$router.push("/note/detail/" + this.data._id);
                  } else {
                    alert("수정 실패..");
                  }
                });
            } else {
              alert("이미 존재하는 이름입니다.");
              this.notetitle = this.data.name;
              this.$refs.notetitle.focus();
            }
          });
      });
    }
  }
};
</script>
