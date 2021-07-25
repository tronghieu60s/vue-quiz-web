<template>
  <questions
    :quiz="quiz"
    :question="question"
    :questions="questions"
    :questionsbase="questionsbase"
    @onActionQuestion="
      (props) => (question ? onUpdateQuestion(props) : onCreateQuestion(props))
    "
    @onDeleteQuestion="onDeleteQuestion"
    @onSetQuestion="(q) => (question = q)"
    @onSetQuestions="(q) => (questions = q)"
  />
</template>

<script>
import Questions from "@components/Questions";
import { getQuizById } from "@models/quizzesModel";
import {
  createQuestion,
  getQuestionsByQuizId,
  updateQuestionById,
  deleteQuestionById,
} from "@models/questionsModel";
export default {
  components: { Questions },
  props: ["quiz_id"],
  data() {
    return {
      quiz: { _id: "", quiz_title: "" },
      question: null,
      questions: [],
      questionsbase: [],
    };
  },
  created() {
    // load quiz item, questions first
    this.$store.dispatch("actLoadingAction", async () => {
      await this.onLoadQuiz();
      await this.onLoadQuestions();
    });
  },
  methods: {
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
    onCreateQuestion(props) {
      this.$store.dispatch("actLoadingAction", async () => {
        const {
          question_content,
          question_answers,
          question_scores,
          question_times,
        } = props;

        // create question, if not exists return fail
        const quiz_id = this.quiz._id;
        const create = {
          quiz_id,
          question_content,
          question_answers,
          question_scores,
          question_times,
        };
        const createItem = await createQuestion(create);
        if (!createItem) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

        // load questions on table
        const questionsbase = this.questionsbase;
        questionsbase.push(createItem);
        this.questionsbase = questionsbase;

        // toast success
        this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);
      });
    },
    onUpdateQuestion(props) {
      this.$store.dispatch("actLoadingAction", async () => {
        const {
          question_content,
          question_answers,
          question_scores,
          question_times,
        } = props;

        // get id and set question = null
        const question_id = this.question._id;
        this.question = null;

        const updateQuestion = await updateQuestionById({
          _id: question_id,
          question_content,
          question_answers,
          question_scores,
          question_times,
        });
        if (!updateQuestion) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

        // load quizzes on table
        const questionsbase = this.questionsbase;
        const questionIndex = questionsbase.findIndex(
          (o) => o._id === question_id
        );
        questionsbase[questionIndex] = updateQuestion;
        this.questionsbase = questionsbase;

        this.$toast.success(this.$store.state.string.S_EDIT_VALUES_SUCCESS);
      });
    },
    onDeleteQuestion(question) {
      this.$store.dispatch("actLoadingAction", async () => {
        // delete question with quiz_id
        const _id = question._id;
        const quiz_id = this.quiz._id;
        const deleteQuestion = await deleteQuestionById({ _id, quiz_id });
        if (!deleteQuestion) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

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
