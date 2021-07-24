<template>
  <quizzes
    :quiz="quiz"
    :quizzes="quizzes"
    :quizzesbase="quizzesbase"
    @onStartQuiz="onStartQuiz"
    @onStopQuiz="onStopQuiz"
    @onActionQuiz="
      (props) => (quiz ? onUpdateQuiz(props) : onCreateQuiz(props))
    "
    @onDeleteQuiz="onDeleteQuiz"
    @onSetQuiz="(q) => (quiz = q)"
    @onSetQuizzes="(q) => (quizzes = q)"
  />
</template>

<script>
import Quizzes from "@components/Quizzes";
import { getQuestionsByQuizId } from "@models/questionsModel";
import {
  getQuizzesByUserId,
  createQuiz,
  deleteQuizById,
  updateQuizById,
} from "@models/quizzesModel";

export default {
  components: { Quizzes },
  data() {
    return {
      quiz: null,
      quizzes: [],
      quizzesbase: [],
    };
  },
  created() {
    this.onLoadQuizzes();
    this.onLoadSocket();
  },
  watch: {
    "$store.state.user"() {
      this.onLoadQuizzes();
    },
  },
  methods: {
    onLoadSocket() {
      this.$store.state.socket.on("server-start-quiz-failed", () => {
        this.$toast.error(this.$store.state.string.E_UNKNOWN_ERROR_DETECT);
      });

      this.$store.state.socket.on("server-start-quiz-success", (args) => {
        const { quiz } = args;
        this.$router.push({
          name: "Quizzes-Start",
          params: { quiz_code: quiz.quiz_code },
        });
      });

      this.$store.state.socket.on("server-stop-quiz-failed", () => {
        this.$toast.error(this.$store.state.string.E_UNKNOWN_ERROR_DETECT);
      });

      this.$store.state.socket.on("server-stop-quiz-success", (args) => {
        const { quiz } = args;
        const quizzesbase = this.quizzesbase;
        const quizIndex = quizzesbase.findIndex((o) => o._id === quiz._id);
        quizzesbase[quizIndex] = quiz;
        this.quizzesbase = quizzesbase;
      });
    },
    async onLoadQuizzes() {
      this.$store.commit("setIsLoadingAction", true);

      if (!this.$store.state.user) return;

      // get quizzes by database and set to quizzes and quizzesbase
      const user_id = this.$store.state.user._id;
      const getQuizzes = [...(await getQuizzesByUserId({ user_id }))];
      getQuizzes.reverse();

      // set quizzes to base
      this.quizzes = getQuizzes;
      this.quizzesbase = getQuizzes;

      this.$store.commit("setIsLoadingAction", false);
    },
    async onCreateQuiz(args) {
      this.$store.commit("setIsLoadingAction", true);

      const { quiz_title, quiz_desc } = args;
      const user_id = this.$store.state.user._id;

      // create quiz and check exists (if not exists alert error)
      const aCreateQuiz = await createQuiz({
        quiz_title,
        quiz_desc,
        user_id,
      });
      if (!aCreateQuiz) {
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );
      }

      // load quizzes on table
      const quizzesbase = this.quizzesbase;
      quizzesbase.unshift(aCreateQuiz);
      this.quizzesbase = quizzesbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);

      this.$store.commit("setIsLoadingAction", false);
    },
    async onUpdateQuiz(args) {
      this.$store.commit("setIsLoadingAction", true);

      const { quiz_title, quiz_desc } = args;
      const quiz_id = this.quiz._id;
      this.quiz = null;

      // update quiz
      const updateQuiz = await updateQuizById({
        _id: quiz_id,
        quiz_title,
        quiz_desc,
      });
      if (!updateQuiz) {
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );
      }

      // load quizzes on table
      const quizzesbase = this.quizzesbase;
      const quizIndex = quizzesbase.findIndex((o) => o._id === quiz_id);
      quizzesbase[quizIndex] = updateQuiz;
      this.quizzesbase = quizzesbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_EDIT_VALUES_SUCCESS);

      this.$store.commit("setIsLoadingAction", false);
    },
    async onDeleteQuiz(args) {
      this.$store.commit("setIsLoadingAction", true);

      const { _id } = args;
      // delete quizzes by id
      const user_id = this.$store.state.user._id;
      const deleteQuiz = await deleteQuizById({ _id, user_id });
      if (!deleteQuiz) {
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );
      }

      // load quizzes
      this.quiz = null;
      const quizzesbase = this.quizzesbase;
      const quizIndex = quizzesbase.findIndex((o) => o._id === _id);
      quizzesbase.splice(quizIndex, 1);
      this.quizzesbase = quizzesbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_DELETE_VALUES_SUCCESS);

      this.$store.commit("setIsLoadingAction", false);
    },
    async onStartQuiz(args) {
      this.$store.commit("setIsLoadingAction", true);

      const { _id: quiz_id, quiz_code } = args;

      if (quiz_code) {
        return this.$router.push({
          name: "Quizzes-Start",
          params: { quiz_code },
        });
      }

      const questions = await getQuestionsByQuizId({ quiz_id });
      if (questions.length === 0) {
        return this.$toast.error(
          this.$store.state.string.E_QUESTIONS_NOT_FOUND
        );
      }

      this.$store.state.socket.emit("admin-start-quiz", { quiz_id });

      this.$store.commit("setIsLoadingAction", false);
    },
    async onStopQuiz(args) {
      this.$store.commit("setIsLoadingAction", true);

      const quiz_id = args._id;
      this.$store.state.socket.emit("admin-stop-quiz", { quiz_id });

      this.$store.commit("setIsLoadingAction", false);
    },
  },
};
</script>
