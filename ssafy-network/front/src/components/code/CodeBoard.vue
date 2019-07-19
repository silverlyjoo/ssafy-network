<template>
  <div class="pa-5 board">
    <h2 class="board-title">Code Review 게시판</h2>
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:aactivator="{ on }">
          <v-btn v-on="on" class="info write-btn">글 쓰기</v-btn><br><br><br>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.content" label="Content"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="info" flat @click.native="close">취소</v-btn>
            <v-btn class="info" flat @click.native="save">글쓰기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-data-table
      :headers="headers"
      :items="articles"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.content }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            color="teal"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            color="pink"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="info" icon="info">
          게시글이 하나도 없습니다
        </v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Title',
          align: 'center',
          sortable: false,
          value: 'title'
        },
        { text: 'Content', value: 'content' }
      ],
      articles: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        content: '',
      },
      defaultItem: {
        title: '',
        content: '',
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Article' : 'Edit Article'
      }
    },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },

      created () {
        this.initialize()
    },
    methods: {
      initialize () {
        this.articles = [
          {
            title: 'I have a question about python',
            content: 'In python, how can I define function?',
          },
          {
            title: 'Vue, 꼭 해야하나요?',
            content: '다른 사람들 다 앵귤러나 리액트하는데 왜 뷰 해야하는지 모르겠네요',
          },
          {
            title: '알고리즘 시험 대비해서 링크드 리스트 만들 때, 더 쉽게 외우는 방법 없나요?',
            content: '이미 외웠긴 했는데, 더 쉽게 외울 수 있는 방법이 있나 궁금하네요',
          },
          {
            title: '자바 스프링 다 까먹었는데 큰 일이네요 ㅠㅠ',
            content: '다른 분들은 어떠신가요??',
          },
          {
            title: '자소서 한 번도 안 써봤는데 7월 절반이 지나갔네요 ㅠㅠ',
            content: '이번에 안랩하고 인바디 떴던데 이참에 한 번 쓸까봐요',
          },
          {
            title: '면접볼 때 PT 면접 있잖아요, 어떻게 해요? ㅠㅠ',
            content: '제가 발표를 한 번도 해 본 적이 없는데 슬슬 걱정이네요... 다들 발표 잘 하시나요?',
          },
          {
            title: '오늘 조퇴하고 싶네요',
            content: '물론 다음 주 월요일 팀빌딩도 조퇴, 아니 결석하고 싶어요',
          },
          {
            title: '지금 편성된 조에 적응을 잘 못하겠어요ㅠㅠ',
            content: '다음 주 월요일 팀빌딩으로 친해지는 시간 있다는데, 제가 소극적이라서... 친해질 수 있을지 걱정이에요... ㅠㅠ',
          },
          {
            title: 'IT에서 돈 많이 벌려면 뭘 준비해야 할까요',
            content: '역시 실력을 키우는 걸까요? 아니면 로또가 답일까요? 결국엔 치킨집 차릴텐데 휴...',
          },
          {
            title: '삼성 오딧세이 좋네요 하나 사려는데 최저가 아시는 분?',
            content: '소위 말하는 "앱등이"입니다. 오딧세이 사용해보니 좋네요. 오딧세이 올해 최신판으로 사볼까 하는데 조언 부탁드려요',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.articles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.articles.indexOf(item)
        confirm('삭제하시겠습니까?') && this.desserts.splice(index, 1)
      },
      close() {
        this.dialog = false
        setTimeout( () =>  {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.articles[this.editedIndex], this.editedItem)
        } else {
          this.articles.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style>
  .board-title {
    color: grey
  }
  .board {
    height: 100%;
    width: 80%;
    margin-left:auto;
    margin-right:auto;
  }
  .write-btn {
    float: right;
    /* padding-right: 100px; */
  }
</style>