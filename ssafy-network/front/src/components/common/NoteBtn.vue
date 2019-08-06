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
              @click="addRootNoteOpen()"
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
              @click="addRootFolderOpen()"
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
        <v-btn flat class="ma-0 pa-0" style="min-width:30px!important;">
          <v-icon
            class="iconn"
            v-if="item.file == 'folder'"
            open-on-click
          >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          <v-icon v-else @click="NoteDetail(item._id)" class="iconn">{{ files[item.file] }}</v-icon>
        </v-btn>
      </template>
      <template slot="label" slot-scope="{ item }">
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
    <v-dialog v-model="showRootNote" max-width="300">
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
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-btn color="green darken-1" flat="flat" @click="closeRoot()">취소</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="addRootNote()">추가</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showRootFolder" max-width="300">
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
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-btn color="green darken-1" flat="flat" @click="closeRoot()">취소</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="addRootFolder()">추가</v-btn>
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
    <v-dialog v-model="showDelete" max-width="400">
      <v-card class="pa-2">
        <v-card-title class="headline justify-center">삭제 하시겠습니까?</v-card-title>
        <v-card-actions class="text-xs-center">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="showDelete = false">아니오</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="deleteItem()">예</v-btn>
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
      rootid: "",
      overlay: false,
      showNote: false,
      showRootNote: false,
      showFolder: false,
      showRootFolder: false,
      showDelete: false,
      showFolderEdit: false,
      seleteItem: "",
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
    closeRoot() {
      this.showRootNote = false;
      this.showRootFolder = false;
      this.rootid = "";
      this.closeForm();
    },
    addRootNoteOpen() {
      this.showRootNote = true;
      this.NoteTitle = "";
      fetch(
        this.$store.state.dbserver +
          "/trees/super/" +
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
          if (data.result == false) {
            alert("root 폴더가 없습니다...");
          } else {
            this.rootid = data._id;
          }
        });
    },
    addRootNote() {
      this.$validator.validateAll("NoteTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          // 같은 폴더내에 이름이 같은 파일이 존재하는지 체크
          const pid = this.rootid;
          const title = this.NoteTitle;
          const tokenid = this.$session.get("token");
          fetch(
            this.$store.state.dbserver +
              "/trees/txt/" +
              pid +
              "/" +
              title +
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
                // 존재 하지 않는다면 post 로 추가한다.
                fetch(this.$store.state.dbserver + "/trees/txt", {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    token: tokenid,
                    parent_id: pid,
                    name: title
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.result == true) {
                      // 만약 추가가 성공한다면 그 id 값을 조회해서 writeForm 으로 보내준다.
                      fetch(
                        this.$store.state.dbserver +
                          "/trees/txt/" +
                          pid +
                          "/" +
                          title +
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
                            alert("추가를 실패하였습니다...");
                          } else {
                            this.$router.push({
                              name: "notewrite",
                              params: { title: data.name, _id: data._id }
                            });
                          }
                        });
                    } else {
                      alert("실패");
                    }
                  });
              } else {
                alert("이미 존재하는 파일입니다. (실패...)");
              }
              this.closeRoot();
            });
        }
      });
    },
    addRootFolderOpen() {
      this.showRootFolder = true;
      this.FolderTitle = "";
      fetch(
        this.$store.state.dbserver +
          "/trees/super/" +
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
          if (data.result == false) {
            alert("root 폴더가 없습니다...");
          } else {
            this.rootid = data._id;
          }
        });
    },
    addRootFolder() {
      this.$validator.validateAll("FolderTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          fetch(
            this.$store.state.dbserver +
              "/trees/folder/" +
              this.rootid +
              "/" +
              this.FolderTitle +
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
                fetch(this.$store.state.dbserver + "/trees/folder", {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    token: this.$session.get("token"),
                    parent_id: this.rootid,
                    name: this.FolderTitle
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.result == true) {
                      alert("폴더 추가 성공!");
                    } else {
                      alert("폴더 추가 실패...");
                    }
                  });
              } else {
                alert("이미 폴더 이름이 존재합니다...");
              }
              this.closeRoot();
            });
        }
      });
    },
    FolderEdit(item) {
      this.seleteItem = item;
      this.FolderTitle = item.name;
      this.showFolderEdit = true;
    },
    FolderUpdate() {
      fetch(this.$store.state.dbserver + "/trees/folder", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.seleteItem._id,
          token: this.$session.get("token"),
          name: this.FolderTitle
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("폴더 이름 수정 성공");
          } else {
            alert("폴더 이름 수정 실패..");
          }
          this.FolderEditClose();
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
      this.seleteItem = item;
    },
    addFolderOpen(item) {
      this.showFolder = true;
      this.FolderTitle = "";
      this.seleteItem = item;
    },
    DeleteOpen(item) {
      this.showDelete = true;
      this.seleteItem = item;
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
      this.seleteItem = "";
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
          const pid = this.seleteItem._id;
          const title = this.NoteTitle;
          const tokenid = this.$session.get("token");
          fetch(
            this.$store.state.dbserver +
              "/trees/txt/" +
              pid +
              "/" +
              title +
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
                // 존재 하지 않는다면 post 로 추가한다.
                fetch(this.$store.state.dbserver + "/trees/txt", {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    token: tokenid,
                    parent_id: pid,
                    name: title
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.result == true) {
                      // 만약 추가가 성공한다면 그 id 값을 조회해서 writeForm 으로 보내준다.
                      fetch(
                        this.$store.state.dbserver +
                          "/trees/txt/" +
                          pid +
                          "/" +
                          title +
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
                            alert("추가를 실패하였습니다...");
                          } else {
                            this.$router.push({
                              name: "notewrite",
                              params: { title: data.name, _id: data._id }
                            });
                          }
                        });
                    } else {
                      alert("실패");
                    }
                  });
              } else {
                alert("이미 존재하는 파일입니다. (실패...)");
              }
              this.addNoteClose();
            });
        }
      });
    },
    addFolder() {
      this.$validator.validateAll("FolderTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          fetch(
            this.$store.state.dbserver +
              "/trees/folder/" +
              this.seleteItem._id +
              "/" +
              this.FolderTitle +
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
                fetch(this.$store.state.dbserver + "/trees/folder/", {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    token: this.$session.get("token"),
                    parent_id: this.seleteItem._id,
                    name: this.FolderTitle
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.result == true) {
                      alert("폴더 추가 성공");
                    } else {
                      alert("폴더 추가 실패");
                    }
                  });
              } else {
                alert("이미 존재하는 폴더이름입니다");
              }
              this.addFolderClose();
            });
        }
      });
    },
    getItems() {
      this.overlay = !this.overlay;
      fetch(
        this.$store.state.dbserver +
          "/trees/" +
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
    deleteItem() {
      fetch(this.$store.state.dbserver + "/trees/", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.seleteItem._id,
          token: this.$session.get("token"),
          file: this.seleteItem.file
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("성공");
          } else {
            alert("실패");
          }
          this.showDelete = false;
          this.$router.push("/note/calendar");
          this.closeForm();
        });
    },
    compare(a, b) {
      if (a.children && b.children) {
        a.children.sort(this.compare);
        b.children.sort(this.compare);
        return 0;
      } else if (a.children && !b.children) {
        a.children.sort(this.compare);
        return -1;
      } else if (!a.children && b.children) {
        b.children.sort(this.compare);
        return 1;
      } else {
        return 0;
      }
    },
    sortItem() {
      this.items.sort(this.compare);
    }
  },
  mounted() {},
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
        }, 3000);
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
