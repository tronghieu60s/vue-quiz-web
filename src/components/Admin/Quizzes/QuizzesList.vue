<template>
  <div class="d-flex justify-content-between align-items-center">
    <div></div>
    <search @onInputSearch="onInputSearch" />
  </div>
  <table
    class="table table-striped table-hover table-bordered table-responsive-lg mt-3"
  >
    <thead class="thead-inverse">
      <tr>
        <th style="width: 10%"></th>
        <th style="width: 25%">Tiêu Đề</th>
        <th style="width: 45%">Mô Tả</th>
        <th style="width: 20%">Hành Động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-show="quizzes.length === 0">
        <td class="text-center" colspan="4">Không có quiz nào.</td>
      </tr>
      <quizzes-item v-for="quiz in quizzes" :key="quiz._id" :quiz="quiz" />
    </tbody>
  </table>
</template>

<script>
import Search from "@components/UI/Search.vue";
import QuizzesItem from "./QuizzesItem.vue";
export default {
  components: { QuizzesItem, Search },
  data() {
    return {
      quizzes: "",
      inputSearch: "",
    };
  },
  beforeMount() {
    this.quizzes = this.$store.state.quizzes;
  },
  watch: {
    "$store.state.quizzes"() {
      this.onInputSearch(this.inputSearch);
    },
  },
  methods: {
    onInputSearch(value) {
      this.inputSearch = value;
      if (value.length === 0) return (this.quizzes = this.$store.state.quizzes);
      const newQuizzes = this.$store.state.quizzes.filter(
        (o) => o.quiz_title.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      this.quizzes = newQuizzes;
    },
  },
};
</script>
