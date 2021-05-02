<template>
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
        <td class="text-center" colspan="4">Không có bộ câu hỏi nào.</td>
      </tr>
      <quizzes-item
        v-for="quiz in quizzes"
        :key="quiz._id"
        :quiz="quiz"
        @onDeleteQuiz="$emit('onDeleteQuiz', quiz._id)"
      />
    </tbody>
  </table>
</template>

<script>
import QuizzesItem from "./QuizzesItem.vue";
export default {
  components: { QuizzesItem },
  emits: ["onDeleteQuiz"],
  props: { quizzes: { type: Array } },
};
</script>
