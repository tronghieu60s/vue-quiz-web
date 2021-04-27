<template>
  <quiz-filter />
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
      <quiz-item
        v-for="quiz in this.$store.state.quizzes"
        :key="quiz._id"
        :quiz="quiz"
      />
    </tbody>
  </table>
  <pagination />
</template>

<script>
import Pagination from "@components/UI/Pagination.vue";
import QuizFilter from "@components/Admin/Quizzes/QuizFilter.vue";
import QuizItem from "@components/Admin/Quizzes/QuizItem.vue";
export default {
  components: { QuizFilter, Pagination, QuizItem },
};
</script>
