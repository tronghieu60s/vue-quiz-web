<template>
  <div class="container">
    <header-custom title="Trang Chủ" />
    <div class="row px-3 px-md-0">
      <div class="col-lg-4 col-md-5">
        <quizzes-create />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <quizzes-list />
      </div>
    </div>
    <footer-custom />
  </div>
</template>

<script>
import HeaderCustom from "@components/Header.vue";
import FooterCustom from "@components/Footer.vue";
import QuizzesCreate from "@components/Admin/Quizzes/QuizzesCreate.vue";
import QuizzesList from "@components/Admin/Quizzes/QuizzesList.vue";
export default {
  components: { HeaderCustom, FooterCustom, QuizzesCreate, QuizzesList },
};
</script>
