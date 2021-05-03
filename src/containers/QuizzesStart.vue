<template>
  <div class="container">
    <div class="row">
      <quizzes-start-control :quiz="quiz" />
      <quizzes-start-users />
    </div>
    <footer-custom />
  </div>
</template>

<script>
import FooterCustom from "@components/Footer.vue";
import QuizzesStartControl from "@components/QuizzesStart/QuizzesStartControl.vue";
import QuizzesStartUsers from "@components/QuizzesStart/QuizzesStartUsers.vue";
import { getQuizById } from "@models/quizzes.firebase";
export default {
  components: { FooterCustom, QuizzesStartControl, QuizzesStartUsers },
  props: ["quiz_id"],
  data() {
    return {
      quiz: { _id: "", quiz_title: "", quiz_desc: "" },
    };
  },
  created() {
    // load quiz item first
    this.$store.dispatch("actLoadingAction", this.onLoadQuiz);
  },
  methods: {
    async onLoadQuiz() {
      const quizItem = await getQuizById(this.quiz_id);
      if (!quizItem) return this.$router.back();
      if (!quizItem.quiz_code) return this.$router.back();
      return (this.quiz = quizItem);
    },
  },
};
</script>
