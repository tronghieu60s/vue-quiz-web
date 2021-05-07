<template>
  <div class="container">
    <header-custom :title="`[${quiz._id}] ${quiz.quiz_title}`">
      <questions-edit-quiz :quiz="quiz" @onUpdateQuizzes="onUpdateQuizzes" />
    </header-custom>
    <div class="row px-3 px-md-0">
      <div class="col-lg-4 col-md-5">
        <questions-create
          :question="question"
          @onActionQuestion="onActionQuestion"
          @onResetSelected="this.question = null"
        />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <questions-filter @onInputSearch="(s) => (inputSearch = s)" />
        <questions-list
          :questions="questions"
          @onDeleteQuestion="onDeleteQuestion"
          @onSelectEditQuestion="(q) => (question = q)"
        />
      </div>
    </div>
    <footer-custom />
  </div>
</template>

<script>
import HeaderCustom from "@components/Header.vue";
import FooterCustom from "@components/Footer.vue";
import QuestionsCreate from "@components/Questions/QuestionsCreate.vue";
import QuestionsFilter from "@components/Questions/QuestionsFilter.vue";
import QuestionsList from "@components/Questions/QuestionsList.vue";
import QuestionsEditQuiz from "@components/Questions/QuestionsEditQuiz.vue";
import { searchString } from "@helpers/string";
import {
  getQuestionsByQuizId,
  createQuestion,
  deleteQuestionById,
  updateQuestionById,
} from "@models/questions.firebase";
import { getQuizById, updateQuizById } from "@models/quizzes.firebase";
export default {
  components: {
    HeaderCustom,
    FooterCustom,
    QuestionsCreate,
    QuestionsList,
    QuestionsEditQuiz,
    QuestionsFilter,
  },
  props: ["quiz_id"],
  data() {
    return {
      quiz: { _id: "", quiz_title: "", quiz_desc: "" },
      question: null,
      questions: [],
      questionsbase: [],
      inputSearch: "",
    };
  },
  created() {
    // load quiz item, questions first
    this.$store.dispatch("actLoadingAction", async () => {
      await this.onLoadQuiz();
      await this.onLoadQuestions();
    });
  },
  watch: {
    inputSearch() {
      // check input empty get questionsbase to questions
      if (this.inputSearch.length === 0)
        return (this.questions = this.questionsbase);

      // filter questionsbase to questions by search funtion
      this.questions = this.questionsbase.filter((o) =>
        searchString(o.question, this.inputSearch)
      );
    },
  },
  methods: {
    async onLoadQuiz() {
      const quizItem = await getQuizById(this.quiz_id);
      if (!quizItem) return this.$router.back();
      if (quizItem.quiz_code) return this.$router.back();
      return (this.quiz = quizItem);
    },
    async onLoadQuestions() {
      const questions = await getQuestionsByQuizId(this.quiz_id);
      questions.reverse();
      this.questions = questions;
      this.questionsbase = questions;
    },
    async onUpdateQuizzes(props) {
      this.$store.dispatch("actLoadingAction", async () => {
        const updateItem = await updateQuizById(this.quiz._id, { ...props });
        if (!updateItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        this.quiz = updateItem;
        this.$toast.success(this.$store.state.string.S_EDIT_VALUES_SUCCESS);
      });
    },
    onActionQuestion(props) {
      this.$store.dispatch(
        "actLoadingAction",
        this.question
          ? () => this.onEditQuestion(props)
          : () => this.onCreateQuestion(props)
      );
    },
    async onCreateQuestion(props) {
      const { question, answers } = props;
      // create question, if not exists return fail
      const quiz_id = this.quiz._id;
      const createItem = await createQuestion({ question, answers, quiz_id });
      if (!createItem)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      await this.onLoadQuestions();
      this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);
    },
    async onDeleteQuestion(question) {
      this.$store.dispatch("actLoadingAction", async () => {
        const deleteItem = await deleteQuestionById(question._id);
        if (!deleteItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        await this.onLoadQuestions();
        this.$toast.success(this.$store.state.string.S_DELETE_VALUES_SUCCESS);
      });
    },
    async onEditQuestion(props) {
      const { question, answers } = props;
      const update = { question, answers };
      const updateItem = await updateQuestionById(this.question._id, update);
      if (!updateItem)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      await this.onLoadQuestions();
      this.$toast.success(this.$store.state.string.S_EDIT_VALUES_SUCCESS);
    },
  },
};
</script>
