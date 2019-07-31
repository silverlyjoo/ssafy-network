<template>
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
      v-if="click"
      style="overflow:hidden!important; text-overflow: ellipsis; "
    >
      <template v-slot:prepend="{item, open,selected}">
        <v-btn flat class="ma-0 pa-0" style="min-width:30px!important;">
          <v-icon
            v-if="item.file == 'folder'"
            open-on-click
          >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          <v-icon v-else @click="NoteDetail(item._id)">{{ files[item.file] }}</v-icon>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      width: 200,
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
                alert("성공");
              } else {
                alert("실패");
              }
              this.addFolderClose();
            });
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
  mounted() {
    this.getItems();
  },
  computed: mapState(["NoteCheck"]),
  watch: {
    NoteCheck(to, from) {
      if (from == false && to == true) {
        this.getItems();
        this.$store.state.NoteCheck = false;
      }
    }
  }
};
</script>

<style>
</style>
