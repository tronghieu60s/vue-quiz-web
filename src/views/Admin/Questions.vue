<template>
  <div class="container">
    <header-custom :title="`[${quiz._id}] ${quiz.quiz_title}`">
      <questions-edit-quiz :quiz="quiz" @onUpdateQuizzes="onUpdateQuizzes" />
    </header-custom>
    <div class="row px-3 px-md-0">
      <div class="col-lg-4 col-md-5">
        <questions-create
          :questionSelected="questionSelected"
          @onResetSelected="onResetSelected"
          @onLoadQuestions="onLoadQuestions"
        />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <questions-list>
          <questions-item
            v-for="(question, index) in questions"
            :key="question._id"
            :index="index + 1"
            :question="question"
            @onEditQuestion="onEditQuestion"
            @onDeleteQuestion="onClickDeleteQuestion"
          />
        </questions-list>
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
import QuestionsItem from "@components/Admin/Questions/QuestionsItem.vue";
import { getQuestions, deleteQuestionById } from "@models/questions.firebase";
export default {
  components: {
    HeaderCustom,
    FooterCustom,
    QuestionsCreate,
    QuestionsList,
    QuestionsEditQuiz,
    QuestionsItem,
  },
  props: ["quiz_id"],
  data() {
    return {
      quiz: {
        _id: "",
        quiz_name: "",
        quiz_desc: "",
      },
      questions: [],
      questionSelected: null,
    };
  },
  async beforeMount() {
    this.onLoadQuiz(this.$store.state.quizzes);

    const questions = await getQuestions();
    this.onLoadQuestions(questions);
  },
  methods: {
    onResetSelected() {
      this.questionSelected = null;
    },
    onLoadQuiz(quizzes) {
      const findQuiz = quizzes.find((o) => o._id === this.quiz_id);
      if (findQuiz) return (this.quiz = findQuiz);
      this.$router.push({ name: "Admin" });
    },
    onLoadQuestions(questions) {
      this.questions = questions;
      this.questionSelected = null;
    },
    onUpdateQuizzes(quizzes) {
      this.onLoadQuiz(quizzes);
      this.$store.commit("setQuizzes", quizzes);
    },
    onEditQuestion(question) {
      this.questionSelected = question;
    },
    onClickDeleteQuestion(question) {
      const textConfirm = this.$store.state.string.CONFIG_DELETE_VALUES;
      if (confirm(textConfirm))
        this.$store.dispatch("actAsyncLoading", () =>
          this.onDeleteQuestion(question)
        );
    },
    async onDeleteQuestion(question) {
      const item = await deleteQuestionById(question._id);
      if (item) {
        const questions = await getQuestions();
        this.onLoadQuestions(questions);

        this.$toast.success(this.$store.state.string.DELETE_VALUES_SUCCESS);
      }
    },
  },
};
</script>
