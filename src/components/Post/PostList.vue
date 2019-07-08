<template>
  <v-container>
    <v-spacer></v-spacer>
    <template >
      <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
    </template>
    <v-data-table :headers="headers" :items="datas" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.number }}</td>
        <td class="text-xs-center">{{ props.item.titles }}</td>
        <td class="text-xs-center">{{ props.item.wirters }}</td>
        <td class="text-xs-centerF">{{ props.item.date }}</td>
        <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
        <!-- <td class="text-xs-right">{{ props.item.iron }}</td> -->
      </template>
    </v-data-table>
    <v-flex xs12 text-xs-right>
      <v-btn to="/PostWriting">글쓰기</v-btn>
    </v-flex>
  </v-container>
</template><script>
export default {
  data() {
    return {
      headers: [
        { text: "Number", align: "center", value: "number" },
        { text: "Titles", align: "center", value: "titles" },
        { text: "Wirters", align: "center", value: "wirters" },
        { text: "Date", align: "center", value: "date" }
        // { text: "Protein (g)", value: "protein" },
        // { text: "Iron (%)", value: "iron" }
      ],
      datas: [
        {
          number: 1,
          titles: 'printf("Hello World!")',
          wirters: "hyein",
          date: "2019-07-08"
          //   protein: 4.0,
          //   iron: "1%"
        },
        {
          number: 2,
          titles: "  World! ",
          wirters: "teae",
          date: "2019-05-08"
          //   protein: 4.0,
          //   iron: "1%"
        }
      ]
    };
  }
};
</script>