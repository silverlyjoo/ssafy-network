<template>
  <div>
    <v-responsive>
      <v-container class="text-xs-center">
        <v-layout align-center>
          <v-flex aspect-ratio="1.7">
            <h2 class="display-2" style="text-align:left">{{titles}}</h2>
            <br />

            <v-layout>
              <v-flex xs10 align-self-center style="text-align:left">
                <span class="subheading">{{writers}}</span>
                <span class="body-2 grey--text">{{date}}</span>
              </v-flex>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">edit</v-icon>
                  <pre></pre>
                  <v-icon @click="remove()">delete</v-icon>
                </template>
                <v-card>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model=" titles" label="Titles"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model=" writers" label="Writers"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="date" label="Date"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-textarea v-model="contents" label="contents"></v-textarea>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-divider class="my-3"></v-divider>

            <p>{{contents}}</p>
            <br />
            <br />

            <div>
              <v-btn color="primary" dark class="mb-2" @click="back()" exact>목록보기</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>
<script>
export default {
  name: "Postdetail",
  props: {
    date: { type: String },
    titles: { type: String },
    writers: { type: String },
    contents: { type: String }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    back() {
      this.$router.push("/post");
    },
    remove() {
      confirm("Are you sure you want to delete this item?")  ;
    },
    save() {}
  }
};
</script>
<style>
</style>