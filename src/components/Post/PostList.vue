<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.titles" label="Titles"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.writers" label="Writers"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-textarea v-model="editedItem.contents" label="contents"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <v-data-table :headers="headers" :items="datas" class="elevation-1">
        <template v-slot:items="props">
          <router-link
            style="text-decoration:none!important"
            :to="{name:'Postdetail', params:{titles : props.item.data.title, writers : props.item.data.writer ,date : props.item.data.date , contents : props.item.data.content}}"
          >
            <td class="text-xs-right">{{ props.item.data.title }}</td>
          </router-link>

          <td class="text-xs-right">{{ props.item.data.writer }}</td>
          <td class="text-xs-right">{{ props.item.data.date }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Titles", align: "center", value: "titles" },
      { text: "Writers", align: "center", value: "writers" },
      { text: "Actions", value: "name", sortable: false }
    ],
    datas: [],
    editedIndex: -1,
    editedItem: {
      titles: "",
      writers: "",
      contents: ""
    },
    defaultItem: {
      titles: "",
      writers: "",
      contents: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // this.datas = [
      //   {
      //     titles: 'printf("Hello World!")',
      //     writers: "hyein",
      //     date: "2019-07-08",
      //     contents:
      //       "가나다라마바사아자차카타파하하하하하하가나다라마바사아자차카타파하"
      //   },
      //   {
      //     titles: "  World! ",
      //     writers: "teae",
      //     date: "2019-05-08",
      //     contents:
      //       "아에이오우아에ㅇ이오우아에이오우아에이오우아에이오우아에이오우아에이오우어ㅏ에이오우"
      //   }
      // ];
      this.getPosts();
    },
    async getPosts(){
      this.datas = await FirebaseService.getPost();
    },
    editItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.datas.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.datas.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      FirebaseService.addPost(this.editedItem.titles,this.editedItem.contents,this.editedItem.writers);
      this.close();
    }
  }
};
</script>
