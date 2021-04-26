<template>
  <div class="container">
    <header-custom />
    <div class="row px-3 px-md-0">
      <div class="col-md-4">
        <quiz-create />
      </div>
      <div class="col-md-8 mt-5 mt-md-0">
        <quiz-list />
      </div>
    </div>
    <footer-custom />
  </div>
</template>

<script>
import HeaderCustom from "@components/Header.vue";
import FooterCustom from "@components/Footer.vue";
import QuizList from "@components/Admin/Quizzes/QuizList.vue";
import QuizCreate from "@components/Admin/Quizzes/QuizCreate.vue";
export default {
  components: { HeaderCustom, FooterCustom, QuizList, QuizCreate },
};
</script>
