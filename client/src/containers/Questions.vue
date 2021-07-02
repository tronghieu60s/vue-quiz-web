<template>
  <div class="container">
    <header-custom :title="`[${quiz._id.slice(0, 10)}] ${quiz.quiz_title}`" />
    <div class="row">
      <div class="col-lg-4 col-md-5">
        <questions-create
          :question="question"
          @onActionQuestion="onActionQuestion"
          @onResetSelected="this.question = null"
        />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <questions-filter
          :questions="questions"
          @onInputSearch="(s) => (inputSearch = s)"
        />
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
import { searchString } from "@helpers/string";
import { createQuestion, updateQuestionById } from "@models/questions.firebase";
import { getQuizById } from "@models/quizzesModel";
import {
  getQuestionsByQuizId,
  deleteQuestionById,
} from "@models/questionsModel";
export default {
  components: {
    HeaderCustom,
    FooterCustom,
    QuestionsCreate,
    QuestionsList,
    QuestionsFilter,
  },
  props: ["quiz_id"],
  data() {
    return {
      quiz: { _id: "", quiz_title: "" },
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
    onActionQuestion(props) {
      this.$store.dispatch(
        "actLoadingAction",
        this.question
          ? () => this.onUpdateQuestion(props)
          : () => this.onCreateQuestion(props)
      );
    },
    async onLoadQuiz() {
      const quizItem = await getQuizById({ _id: this.quiz_id });
      if (!quizItem) return this.$router.back();
      if (quizItem.quiz_code) return this.$router.back();
      return (this.quiz = quizItem);
    },
    async onLoadQuestions() {
      const quiz_id = this.quiz_id;
      const questions = [...(await getQuestionsByQuizId({ quiz_id }))];
      this.questions = questions;
      this.questionsbase = questions;
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

      // load questions on table
      const questionsbase = this.questionsbase;
      questionsbase.push(createItem);
      this.questionsbase = questionsbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);
    },
    async onUpdateQuestion(props) {
      const { question, answers } = props;

      // get id and update item
      const questionId = this.question._id;
      const update = { question, answers };
      const updateItem = await updateQuestionById(questionId, update);
      if (!updateItem)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      // load quizzes on table
      const questionsbase = this.questionsbase;
      const questionIndex = questionsbase.findIndex(
        (o) => o._id === questionId
      );
      questionsbase[questionIndex] = updateItem;
      this.questionsbase = questionsbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_EDIT_VALUES_SUCCESS);
    },
    async onDeleteQuestion(question) {
      this.$store.dispatch("actLoadingAction", async () => {
        // delete question with quiz_id
        const _id = question._id;
        const quiz_id = this.quiz._id;
        const deleteItem = await deleteQuestionById({ _id, quiz_id });
        if (!deleteItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        // load questions on table
        this.question = null;
        const questionsbase = this.questionsbase;
        const questionIndex = questionsbase.findIndex((o) => o._id === _id);
        questionsbase.splice(questionIndex, 1);
        this.questionsbase = questionsbase;

        // toast success
        this.$toast.success(this.$store.state.string.S_DELETE_VALUES_SUCCESS);
      });
    },
  },
};
</script>
