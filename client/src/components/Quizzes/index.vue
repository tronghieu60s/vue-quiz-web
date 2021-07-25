<template>
  <layout title="Bộ Câu Hỏi">
    <div class="row">
      <div class="col-lg-4 col-md-5">
        <quizzes-create
          :quiz="quiz"
          @onActionQuiz="(q) => $emit('onActionQuiz', q)"
          @onSetQuiz="(q) => $emit('onSetQuiz', q)"
        />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <quizzes-filter
          :quizzes="quizzes"
          @onInputSearch="(s) => (inputSearch = s)"
        />
        <quizzes-list
          :quizzes="quizzes"
          @onSetQuiz="(q) => $emit('onSetQuiz', q)"
          @onStartQuiz="(q) => $emit('onStartQuiz', q)"
          @onStopQuiz="(q) => $emit('onStopQuiz', q)"
          @onDeleteQuiz="(q) => $emit('onDeleteQuiz', q)"
        />
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@components/Layout";
import QuizzesCreate from "@components/Quizzes/QuizzesCreate.vue";
import QuizzesList from "@components/Quizzes/QuizzesList.vue";
import QuizzesFilter from "@components/Quizzes/QuizzesFilter.vue";
import { searchString } from "@helpers/commonFunctions";

export default {
  components: {
    Layout,
    QuizzesCreate,
    QuizzesList,
    QuizzesFilter,
  },
  props: ["quiz", "quizzes", "quizzesbase"],
  emits: [
    "onStartQuiz",
    "onStopQuiz",
    "onActionQuiz",
    "onDeleteQuiz",
    "onSetQuiz",
    "onSetQuizzes",
  ],
  data() {
    return { inputSearch: "" };
  },
  watch: {
    inputSearch() {
      let quizzes = [];
      if (this.inputSearch.length === 0) {
        quizzes = this.quizzesbase;
      } else {
        quizzes = this.quizzesbase.filter((o) => {
          return searchString(o.quiz_title, this.inputSearch);
        });
      }
      this.$emit("onSetQuizzes", quizzes);
    },
  },
};
</script>
