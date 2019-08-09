<template>
  <div class="navBtn mb-3">
    <v-layout align-center class="pa-2" @click="goNote()">
      <v-flex xs7 text-xs-center @click="showRoot=true">
        <span class="navtext navtcolor">NOTE</span>
      </v-flex>
      <v-flex v-if="overlay">
        <v-progress-circular indeterminate color="white" size="15"></v-progress-circular>
      </v-flex>
      <v-flex justify-end text-xs-right v-if="showRoot">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
              @click="addNoteOpen('root')"
              small
              class="ma-0 pa-0"
              style="min-width:10px!important;"
            >
              <v-icon small>note_add</v-icon>
            </v-btn>
          </template>
          <span>파일 추가</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              flat
              @click="addFolderOpen('root')"
              small
              class="ma-0 pa-0"
              style="min-width:10px!important;"
            >
              <v-icon small>add_box</v-icon>
            </v-btn>
          </template>
          <span>폴더 추가</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
    <v-treeview
      v-model="tree"
      :open="open"
      :items="items"
      activatable
      item-key="name"
      v-if="click"
      style="overflow:hidden!important; text-overflow: ellipsis; "
      class="treecss"
    >
      <template v-slot:prepend="{item, open,selected}">
        <v-btn flat class="ma-0 pa-0" style="min-width:30px!important;" open-on-click>
          <v-icon
            class="iconn"
            v-if="item.file == 'folder'"
          >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          <v-icon v-else @click="NoteDetail(item._id)" class="iconn">{{ files[item.file] }}</v-icon>
        </v-btn>
      </template>
      <template slot="label" slot-scope="{ item }" open-on-click>
        <label v-if="item.file == 'folder'">{{ item.name }}</label>
        <label v-else @click="NoteDetail(item._id)">{{ item.name }}</label>
      </template>
      <template slot="append" slot-scope="{item}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
              @click="FolderEdit(item)"
              v-if="item.file != 'txt'"
              small
              class="ma-0 pa-0"
              style="min-width:10px!important;"
            >
              <v-icon small>edit</v-icon>
            </v-btn>
          </template>
          <span>폴더 수정</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
              @click="addNoteOpen(item)"
              v-if="item.file != 'txt'"
              small
              class="ma-0 pa-0"
              style="min-width:10px!important;"
            >
              <v-icon small>note_add</v-icon>
            </v-btn>
          </template>
          <span>파일 추가</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              flat
              @click="addFolderOpen(item)"
              v-if="item.file != 'txt'"
              small
              class="ma-0 pa-0"
              style="min-width:10px!important;"
            >
              <v-icon small>add_box</v-icon>
            </v-btn>
          </template>
          <span>폴더 추가</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
              @click="DeleteOpen(item)"
              small
              class="ma-0 pa-0"
              style="min-width:10px!important;"
            >
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
          <span>삭제</span>
        </v-tooltip>
      </template>
    </v-treeview>
    <v-dialog v-model="showNote" max-width="300">
      <v-card class="pa-2">
        <v-card-title class="headline justify-center">파일 추가</v-card-title>
        <v-card-actions class="text-xs-center">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-text-field
                  label="파일 제목"
                  v-model="NoteTitle"
                  v-validate="'required|min:2'"
                  data-vv-name="NoteTitle"
                  data-vv-scope="NoteTitle"
                  :error-messages="errors.collect('NoteTitle')"
                  ref="NoteTitle"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-btn color="green darken-1" flat="flat" @click="addNoteClose()">취소</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="addNote()">추가</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showFolder" max-width="300">
      <v-card class="pa-2">
        <v-card-title class="headline justify-center">폴더 추가</v-card-title>
        <v-card-actions class="text-xs-center">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-text-field
                  label="폴더 제목"
                  v-model="FolderTitle"
                  v-validate="'required|min:2'"
                  data-vv-name="FolderTitle"
                  data-vv-scope="FolderTitle"
                  :error-messages="errors.collect('FolderTitle')"
                  ref="FolderTitle"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-btn color="green darken-1" flat="flat" @click="addFolderClose()">취소</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="addFolder()">추가</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showFolderEdit" max-width="300">
      <v-card class="pa-2">
        <v-card-title class="headline justify-center">폴더 이름 수정</v-card-title>
        <v-card-actions class="text-xs-center">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-text-field
                  label="폴더 제목"
                  v-model="FolderTitle"
                  v-validate="'required|min:2'"
                  data-vv-name="FolderTitle"
                  data-vv-scope="FolderTitle"
                  :error-messages="errors.collect('FolderTitle')"
                  ref="FolderEdit"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-btn color="green darken-1" flat="flat" @click="FolderEditClose()">취소</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="FolderUpdate()">수정</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDelete" max-width="700">
      <v-card class="pa-2">
        <v-card-title class="justify-center">
          <span class="headline" v-if="selectItem.file == 'folder' ">
            선택된 폴더에
            <span
              style="color:red; font-weight:bold;"
            >{{deleteItemFolder}}개의 폴더와 {{deleteItemTxt}}개의 파일</span>이 있습니다.
          </span>
          <br />
          <span class="headline" v-if="selectItem.file == 'txt' ">파일을</span>&nbsp;&nbsp;
          <span class="headline">삭제하시겠습니까?</span>
        </v-card-title>
        <v-card-actions class="text-xs-center">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="deleteItemClose()">아니오</v-btn>
          <v-btn v-if="selectItem.file == 'folder' " color="green darken-1" flat="flat" @click="deleteFolder()">예</v-btn>
          <v-btn v-if="selectItem.file == 'txt' " color="green darken-1" flat="flat" @click="deleteTxt()">예</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showRoot: false,
      overlay: false,
      showNote: false,
      showFolder: false,
      showDelete: false,
      deleteItemFolder: 0,
      deleteItemTxt: 0,
      showFolderEdit: false,
      selectItem: "",
      FolderTitle: "",
      NoteTitle: "",
      foldflag: this.$store.state.navFoldFlag,
      click: false,
      open: [],
      files: {
        html: "mdi-language-html5",
        js: "mdi-nodejs",
        json: "mdi-json",
        md: "mdi-markdown",
        pdf: "mdi-file-pdf",
        png: "mdi-file-image",
        txt: "mdi-file-document-outline",
        xls: "mdi-file-excel"
      },
      tree: [],
      items: []
    };
  },
  methods: {
    FolderEdit(item) {
      this.selectItem = item;
      this.FolderTitle = item.name;
      this.showFolderEdit = true;
    },
    FolderUpdate() {
      const parent = this.selectItem.course.slice(0, -2);
      fetch(
        this.$store.state.dbserver +
          "/notes/" +
          this.$session.get("id") +
          "/" +
          this.FolderTitle +
          "/" +
          parent +
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
          if (data.result == false) {
            // 중복 X
            fetch(this.$store.state.dbserver + "/notes/folder", {
              method: "PUT",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                _id: this.selectItem._id,
                token: this.$session.get("token"),
                name: this.FolderTitle
              })
            })
              .then(res => res.json())
              .then(data => {
                if (data.result == true) {
                } else {
                  alert("폴더 이름 수정 실패..");
                }
                this.FolderEditClose();
              });
          } else {
            // 중복이 있으면
            if (data.course == this.selectItem.course) {
              // 자기 자신이라면
              this.FolderEditClose();
            } else {
              alert("중복되는 이름이 있습니다.");
              this.FolderTitle = this.selectItem.name;
              this.$refs.FolderEdit.focus();
            }
          }
        });
    },
    FolderEditClose() {
      this.showFolderEdit = false;
      this.FolderTitle = "";
      this.closeForm();
    },
    NoteDetail(id) {
      this.$router.push("/note/detail/" + id);
    },
    addNoteOpen(item) {
      this.showNote = true;
      this.NoteTitle = "";
      this.selectItem = item;
    },
    addFolderOpen(item) {
      this.showFolder = true;
      this.FolderTitle = "";
      this.selectItem = item;
    },
    DeleteOpen(item) {
      this.showDelete = true;
      this.selectItem = item;
      for (let i in this.selectItem.children) {
        if (this.selectItem.children[i].file == "folder") {
          this.deleteItemFolder++;
        } else {
          this.deleteItemTxt++;
        }
      }
    },
    deleteItemClose() {
      this.showDelete = false;
      this.deleteItemFolder = 0;
      this.deleteItemTxt = 0;
    },
    addNoteClose() {
      this.showNote = false;
      this.NoteTitle = "";
      this.closeForm();
    },
    addFolderClose() {
      this.showFolder = false;
      this.FolderTitle = "";
      this.closeForm();
    },
    closeForm() {
      this.selectItem = "";
      this.$validator.reset();
      this.getItems();
    },
    goNote() {
      this.$router.push("/note/calendar");
      this.click = true;
      this.$store.state.notetreefoldflag = true;
      this.getItems();
    },
    addNote() {
      this.$validator.validateAll("NoteTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          // 같은 폴더내에 이름이 같은 파일이 존재하는지 체크
          var course = this.selectItem.course;
          const name = this.NoteTitle;
          const id = this.$session.get("id");
          const tokenid = this.$session.get("token");
          // 루트 일때
          if (this.selectItem == "root") {
            var checkName = false;
            for (let i in this.items) {
              if (this.items[i].name == this.NoteTitle) {
                checkName = true;
                break;
              }
            }
            // 중복이 아니라면
            if (checkName == false) {
              course = "0." + this.items.length;
              fetch(this.$store.state.dbserver + "/notes/txt/", {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  token: tokenid,
                  id: id,
                  name: name,
                  course: course
                })
              })
                .then(res => res.json())
                .then(data => {
                  if (data.result == true) {
                    // 폴더 추가 성공 시 objectid 값을 찾아야됨
                    fetch(
                      this.$store.state.dbserver +
                        "/notes/" +
                        id +
                        "/" +
                        name +
                        "/" +
                        "0" +
                        "/" +
                        tokenid,
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
                        if (data.result == false) {
                          // 파일 없음..
                          alert("파일이 없습니다.");
                        } else {
                          this.$router.push({
                            name: "notewrite",
                            params: { _id: data._id, title: data.name }
                          });
                        }
                        this.addNoteClose();
                      });
                  } else {
                    alert("파일 추가 실패");
                    this.addNoteClose();
                  }
                });
            } else {
              // 중복이라면
              alert("이미 존재하는 파일 이름입니다.");
              this.NoteTitle = "";
              this.$refs.NoteTitle.focus();
            }
          } else {
            // 루트가 아닐 때
            fetch(
              this.$store.state.dbserver +
                "/notes/" +
                id +
                "/" +
                name +
                "/" +
                course +
                "/" +
                tokenid,
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
                course = course + "." + this.selectItem.children.length;
                if (data.result == false) {
                  // 중복 안됨 -- 파일 추가 실행
                  fetch(this.$store.state.dbserver + "/notes/txt/", {
                    method: "POST",
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      token: tokenid,
                      id: id,
                      name: name,
                      course: course
                    })
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data.result == true) {
                        // 파일 추가 성공시 objectid 값 가져와서 write 폼으로 넘겨줌
                        fetch(
                          this.$store.state.dbserver +
                            "/notes/" +
                            id +
                            "/" +
                            name +
                            "/" +
                            this.selectItem.course +
                            "/" +
                            tokenid,
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
                            if (data.result == false) {
                              // 파일 없음..
                              alert("파일이 없습니다.");
                            } else {
                              this.$router.push({
                                name: "notewrite",
                                params: { _id: data._id, title: data.name }
                              });
                            }
                            this.addNoteClose();
                          });
                      } else {
                        // 파일 추가 실패시
                        alert("파일 추가 실패...");
                        this.addNoteClose();
                      }
                    });
                } else {
                  alert("이미 존재하는 파일 이름입니다.");
                  this.NoteTitle = "";
                  this.$refs.NoteTitle.focus();
                  this.addNoteClose();
                }
              });
          }
        }
      });
    },
    addFolder() {
      this.$validator.validateAll("FolderTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          // root 일때
          var cour = "";
          if (this.selectItem == "root") {
            var checkName = false;
            for (let i in this.items) {
              if (this.items[i].name == this.FolderTitle) {
                checkName = true;
                break;
              }
            }
            // 중복이 아니라면
            if (checkName == false) {
              cour = "0." + this.items.length;
              fetch(this.$store.state.dbserver + "/notes/folder/", {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  token: this.$session.get("token"),
                  id: this.$session.get("id"),
                  name: this.FolderTitle,
                  course: cour
                })
              })
                .then(res => res.json())
                .then(data => {
                  if (data.result == true) {
                  } else {
                    alert("폴더 추가 실패");
                  }
                  this.addFolderClose();
                });
            } else {
              // 중복이면
              alert("이미 존재하는 폴더 이름입니다.");
              this.FolderTitle = "";
              this.$refs.FolderTitle.focus();
            }
          } else {
            // root 가 아닐때 selectItem(부모)가 course가 존재, course로 중복체크
            fetch(
              this.$store.state.dbserver +
                "/notes/" +
                this.$session.get("id") +
                "/" +
                this.FolderTitle +
                "/" +
                this.selectItem.course +
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
                if (data.result == false) {
                  cour =
                    this.selectItem.course +
                    "." +
                    this.selectItem.children.length;
                  fetch(this.$store.state.dbserver + "/notes/folder/", {
                    method: "POST",
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      token: this.$session.get("token"),
                      id: this.$session.get("id"),
                      name: this.FolderTitle,
                      course: cour
                    })
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data.result == true) {
                      } else {
                        alert("폴더 추가 실패");
                      }
                      this.addFolderClose();
                    });
                } else {
                  alert("이미 존재하는 폴더이름입니다");
                  this.FolderTitle = "";
                  this.$refs.FolderTitle.focus();
                }
              });
          }
        }
      });
    },
    getItems() {
      this.overlay = !this.overlay;
      fetch(
        this.$store.state.dbserver +
          "/notes/" +
          this.$session.get("id") +
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
          this.items = data.item;
        });
    },
    deleteFolder(){
       fetch(this.$store.state.dbserver + "/notes/folder", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.$session.get("id"),
          token: this.$session.get("token"),
          course : this.selectItem.course
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
          } else {
            alert("삭제 실패...");
          }
          this.deleteItemClose();
          this.$router.push("/note/calendar");
          this.closeForm();
        });
    },
    deleteTxt() {
      fetch(this.$store.state.dbserver + "/notes/", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.selectItem._id,
          token: this.$session.get("token")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
          } else {
            alert("삭제 실패...");
          }
          this.deleteItemClose();
          this.$router.push("/note/calendar");
          this.closeForm();
        });
    }
  },
  mounted() {},
  updated() {
    this.$store.state.heightflag = true;
  },
  computed: mapState(["NoteCheck", "notetreefoldflag"]),
  watch: {
    NoteCheck(to, from) {
      if (from == false && to == true) {
        this.getItems();
        this.$store.state.NoteCheck = false;
      }
    },
    notetreefoldflag(to, from) {
      this.click = this.$store.state.notetreefoldflag;
      this.showRoot = this.click;
    },
    overlay(to, from) {
      if (to == true && from == false) {
        setTimeout(() => {
          this.overlay = false;
        }, 500);
      }
    }
  }
};
</script>


<style>
.iconn {
  color: white !important;
  /* background-color: white !important; */
}
.navBtn label {
  color: white;
  font-size: 16px;
  font-weight: 100;
  font-family: "Nanum Gothic Coding";
}
.treecss {
  padding: 10px;
  background-color: rgb(117, 117, 117);
  border-radius: 10px;
}
</style>
