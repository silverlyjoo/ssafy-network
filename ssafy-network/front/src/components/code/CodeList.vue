<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="codes"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.index }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.writer }}</td>
        <td class="text-xs-right">{{ props.item.hit }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'No',
            align: 'left',
            sortable: true,
            value: 'index'
          },
          { text: 'Title', value: 'title' },
          { text: 'Writer', value: 'writer' },
          { text: 'Hit', value: 'hit' },
        ],
        desserts: [
          {
            no: 1,
            title: '파이썬 질문 있어요',
            writer: '파이썬마스터',
            hit: 5,
          },
          {
            no: 2,
            title: 'Vue, 꼭 해야하나요?',
            writer: '앵귤러와리액트',
            hit: 98,
          },
          {
            no: 3,
            title: '알고리즘 시험 대비해서 링크드 리스트 만들 때, 더 쉽게 외우는 방법 없나요?',
            writer: 'SW등급EXPERT',
            hit: 25,
          },
          {
            no: 4,
            title: '자바 스프링 다 까먹었는데 큰 일이네요 ㅠㅠ',
            writer: '자바의신',
            hit: 15,
          },
          {
            no: 5,
            title: '자소서 한 번도 안 써봤는데 7월 절반이 지나갔네요 ㅠㅠ',
            writer: '웹경력3년',
            hit: 55,
          },
          {
            no: 6,
            title: '면접볼 때 PT 면접 있잖아요, 어떻게 해요? ㅠㅠ',
            writer: 'PT의신',
            hit: 33,
          },
          {
            no: 7,
            title: '오늘 조퇴하고 싶네요',
            writer: '재택근무',
            hit: 11,
          },
          {
            no: 8,
            title: '지금 편성된 조에 적응을 잘 못하겠어요ㅠㅠ',
            writer: '핵인싸',
            hit: 38,
          },
          {
            no: 9,
            title: 'IT에서 돈 많이 벌려면 뭘 준비해야 할까요',
            writer: '금수저',
            hit: 3,
          },
          {
            no: 10,
            title: '삼성 오딧세이 좋네요 하나 사려는데 최저가 아시는 분?',
            writer: '앱등이',
            hit: 21,
          }
        ]
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  }
</script>