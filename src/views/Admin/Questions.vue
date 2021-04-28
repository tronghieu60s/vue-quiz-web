<template>
  <div class="container">
    <header-custom :title="`[${quiz._id}] ${quiz.quiz_title}`">
      <questions-edit-quiz :quiz="quiz" @onLoadQuiz="onLoadQuiz" />
    </header-custom>
    <div class="row px-3 px-md-0">
      <div class="col-md-4">
        <questions-create />
      </div>
      <div class="col-md-8 mt-5 mt-md-0">
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
import { getQuizById } from "@models/quizzes.firebase";
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
    this.$store.dispatch("actAsyncLoading", this.onLoadQuiz);
  },
  methods: {
    async onLoadQuiz() {
      const getQuiz = await getQuizById(this.quiz_id);
      if (getQuiz) return (this.quiz = getQuiz);
      this.$router.push({ name: "Admin" });
    },
  },
};
</script>
