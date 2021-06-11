<template>
  <table class="table table-striped table-hover table-bordered mt-3">
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
        v-for="(quiz, index) in quizzes"
        :key="index"
        :quiz="quiz"
        @onStartQuiz="$emit('onStartQuiz', quiz)"
        @onStopQuiz="$emit('onStopQuiz', quiz)"
        @onSelectEditQuiz="$emit('onSelectEditQuiz', quiz)"
        @onDeleteQuiz="$emit('onDeleteQuiz', quiz)"
      />
    </tbody>
  </table>
</template>

<script>
import QuizzesItem from "./QuizzesItem.vue";
export default {
  components: { QuizzesItem },
  emits: ["onStartQuiz", "onStopQuiz", "onSelectEditQuiz", "onDeleteQuiz"],
  props: { quizzes: { type: Array } },
};
</script>
