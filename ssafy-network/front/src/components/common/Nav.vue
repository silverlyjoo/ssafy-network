<template>
  <div>
    <div class="navLayout">
      <div class="navBg">
        <v-container class="navcon">
          <aside>
            <div class="navBtn">
              <router-link to="/index" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">HOME</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <v-divider class="mb-3" style="border-color: rgb(218, 234, 248);"></v-divider>

            <div class="navBtn">
              <v-layout align-center class="pa-2 mb-3" @click="goNote()">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">NOTE</span>
                </v-flex>
              </v-layout>
              <v-treeview
                v-model="tree"
                :open="open"
                :items="items"
                activatable
                item-key="name"
                open-on-click
                v-if="click"
                style="overflow:hidden!important; text-overflow: ellipsis; "
              >
                <template v-slot:prepend="{item, open,selected}">
                  <v-btn flat class="ma-0 pa-0" style="min-width:30px!important;">
                    <v-icon
                      v-if="item.file == 'folder'"
                    >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
                    <v-icon v-else>{{ files[item.file] }}</v-icon>
                  </v-btn>
                </template>
                <template slot="append" slot-scope="{item}">
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

            <div class="navBtn">
              <router-link to="/code/board" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">CODE</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <div class="navBtn">
              <router-link to="/social/list" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">SOCIAL</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <div class="navBtn">
              <router-link to="/note/write" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">Note Write</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>
            <div class="navBtn">
              <router-link to="/admin" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">ADMIN</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>
          </aside>
        </v-container>
      </div>
    </div>
    <div class="navBg"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Nav",
  data() {
    return {
      showNote: false,
      showFolder: false,
      showDelete: false,
      seleteItem: "",
      x: 0,
      y: 0,
      FolderTitle: "",
      NoteTitle: "",
      menuItems: ["파일 추가", "폴더 추가"],
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
      _id: "",
      items: []
    };
  },
  methods: {
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
      this.click = !this.click;
    },
    addNote() {
      alert("파일 추가");
      this.$validator.validateAll("NoteTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          fetch(this.$store.state.dbserver + "/trees/txt", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
          token: this.$session.get("token"),
          parent_id : this.seleteItem._id,
          name : this.NoteTitle,
            })
          })
            .then(res => res.json())
            .then(data => {
              if(data.result == true){
                alert("성공");
              }else{
                alert("실패");
              }
            });
          this.addNoteClose();
        }
      });
    },
    addFolder() {
      this.$validator.validateAll("FolderTitle").then(res => {
        if (!res) {
          alert("값이 유효한지 확인해 주세요.");
        } else {
          fetch(this.$store.state.dbserver + "/trees/folder/", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
          token: this.$session.get("token"),
          parent_id : this.seleteItem._id,
          name : this.FolderTitle
            })
          })
            .then(res => res.json())
            .then(data => {
              if(data.result == true){
                alert("성공");
              }else{
                alert("실패");
              }
            });
          this.addFolderClose();
        }
      });
    },
    getItems() {
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
    updateItems() {
      fetch(this.$store.state.dbserver + "/trees", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this._id,
          token: this.$session.get("token"),
          id: this.$session.get("id"),
          item: this.items
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            console.log("업데이트 성공");
          } else {
            console.log("업데이트 실패");
          }
        });
    },
    deleteItem() {
      console.log(this.seleteItem._id);
      fetch(this.$store.state.dbserver + "/trees/", {
            method: "DELETE",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              _id : this.seleteItem._id,
          token: this.$session.get("token"),
          file: this.seleteItem.file
            })
          })
            .then(res => res.json())
            .then(data => {
              if(data.result == true){
                alert("성공");
              }else{
                alert("실패");
              }
            });
      this.showDelete = false;
      this.closeForm();
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
  mounted() {
    this.getItems();
    this.sortItem();
  },
  computed: mapState(["NoteCheck"]),
  watch: {
    NoteCheck(to, from) {
      if (from == false && to == true) {
        this.$store.state.NoteCheck = true;
      }
    }
  }
};
</script>
<style>
.navcon {
  padding: 15px;
}
.navBtn:hover {
  background: rgba(212, 212, 212, 0.212);
  border-radius: 10px;
}
.navtext {
  font-family: "Raleway";
  font-weight: 900;
  font-size: 16px;
}
.navtcolor {
  color: rgba(233, 233, 233, 0.932);
}
.fold {
  display: flex;
  justify-content: flex-end;
}
.foldbtn:hover {
  background: rgba(211, 211, 211, 0.205);
  border-radius: 15px;
}
.navLayout {
  position: fixed;
  height: 100vh;
  background: rgb(128, 149, 202);
  z-index: 100;
}
.navBg {
  width: 250px;
}
</style>
