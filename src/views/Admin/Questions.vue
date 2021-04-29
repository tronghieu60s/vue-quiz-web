<template>
  <div class="container">
    <header-custom :title="`[${quiz._id}] ${quiz.quiz_title}`">
      <questions-edit-quiz :quiz="quiz" @onUpdateQuizzes="onUpdateQuizzes" />
    </header-custom>
    <div class="row px-3 px-md-0">
      <div class="col-lg-4 col-md-5">
        <questions-create />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <questions-list />
      </div>
    </div>
    <footer-custom />
  </div>
</template>

<script>
import HeaderCustom from "@components/Header.vue";
import FooterCustom from "@components/Footer.vue";
import QuestionsCreate from "@components/Admin/Questions/QuestionsCreate.vue";
import QuestionsList from "@components/Admin/Questions/QuestionsList.vue";
import QuestionsEditQuiz from "@components/Admin/Questions/QuestionsEditQuiz.vue";
export default {
  components: {
    HeaderCustom,
    FooterCustom,
    QuestionsCreate,
    QuestionsList,
    QuestionsEditQuiz,
  },
  props: ["quiz_id"],
  data() {
    return {
      quiz: {
        _id: "",
        quiz_name: "",
        quiz_desc: "",
      },
    };
  },
  beforeMount() {
    this.onLoadQuiz(this.$store.state.quizzes);
  },
  methods: {
    onLoadQuiz(quizzes) {
      const findQuiz = quizzes.find((o) => o._id === this.quiz_id);
      if (findQuiz) return (this.quiz = findQuiz);
      this.$router.push({ name: "Admin" });
    },
    onUpdateQuizzes(quizzes) {
      this.onLoadQuiz(quizzes);
      this.$store.commit("setQuizzes", quizzes);
    },
  },
};
</script>
