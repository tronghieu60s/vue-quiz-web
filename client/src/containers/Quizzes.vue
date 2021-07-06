<template>
  <div class="container">
    <header-custom title="Bộ Câu Hỏi" />
    <div class="row">
      <div class="col-lg-4 col-md-5">
        <quizzes-create
          :quiz="quiz"
          @onActionQuiz="onActionQuiz"
          @onResetSelected="this.quiz = null"
        />
      </div>
      <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
        <quizzes-filter
          :quizzes="quizzes"
          @onInputSearch="(s) => (inputSearch = s)"
        />
        <quizzes-list
          :quizzes="quizzes"
          @onStartQuiz="onStartQuiz"
          @onStopQuiz="onStopQuiz"
          @onSelectEditQuiz="(q) => (quiz = q)"
          @onDeleteQuiz="onDeleteQuiz"
        />
      </div>
    </div>
    <footer-custom />
  </div>
</template>

<script>
import HeaderCustom from "@components/Header.vue";
import FooterCustom from "@components/Footer.vue";
import QuizzesCreate from "@components/Quizzes/QuizzesCreate.vue";
import QuizzesList from "@components/Quizzes/QuizzesList.vue";
import QuizzesFilter from "@components/Quizzes/QuizzesFilter.vue";
import { searchString } from "@helpers/string";
import { getQuestionsByQuizId } from "@models/questionsModel";
import {
  getQuizzesByUserId,
  createQuiz,
  deleteQuizById,
  updateQuizById,
} from "@models/quizzesModel";
export default {
  components: {
    HeaderCustom,
    FooterCustom,
    QuizzesCreate,
    QuizzesList,
    QuizzesFilter,
  },
  data() {
    return {
      quiz: null,
      quizzes: [],
      quizzesbase: [],
      inputSearch: "",
    };
  },
  created() {
    this.onLoadQuizzes();
    this.onLoadSocket();
  },
  watch: {
    inputSearch() {
      // check input empty get quizzesbase to quizzes
      if (this.inputSearch.length === 0)
        return (this.quizzes = this.quizzesbase);

      // filter quizzesbase to quizzes by search funtion
      this.quizzes = this.quizzesbase.filter((o) =>
        searchString(o.quiz_title, this.inputSearch)
      );
    },
    "$store.state.user"() {
      this.onLoadQuizzes();
    },
  },
  methods: {
    moveQuizzesStart(quiz_code) {
      this.$router.push({ name: "Quizzes-Start", params: { quiz_code } });
    },
    onActionQuiz(props) {
      this.quiz ? this.onUpdateQuiz(props) : this.onCreateQuiz(props);
    },
    onLoadSocket() {
      this.$store.state.socket.on("server-start-quiz-failed", () => {
        this.$toast.error(this.$store.state.string.E_UNKNOWN_ERROR_DETECT);
      });

      this.$store.state.socket.on("server-start-quiz-success", (args) => {
        const { quiz } = args;
        this.moveQuizzesStart(quiz.quiz_code);
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
    // load - create - update - delete
    onLoadQuizzes() {
      this.$store.dispatch("actLoadingAction", async () => {
        if (!this.$store.state.user) return;

        // get quizzes by database and set to quizzes and quizzesbase
        const user_id = this.$store.state.user._id;
        const getQuizzes = [...(await getQuizzesByUserId({ user_id }))];
        getQuizzes.reverse();

        // set quizzes to base
        this.quizzes = getQuizzes;
        this.quizzesbase = getQuizzes;
      });
    },
    onCreateQuiz(props) {
      this.$store.dispatch("actLoadingAction", async () => {
        const { quiz_title, quiz_desc } = props;
        const user_id = this.$store.state.user._id;

        // create quiz and check exists (if not exists alert error)
        const createQuizz = await createQuiz({
          quiz_title,
          quiz_desc,
          user_id,
        });
        if (!createQuizz) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

        // load quizzes on table
        const quizzesbase = this.quizzesbase;
        quizzesbase.unshift(createQuizz);
        this.quizzesbase = quizzesbase;

        // toast success
        this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);
      });
    },
    onUpdateQuiz(props) {
      this.$store.dispatch("actLoadingAction", async () => {
        const { quiz_title, quiz_desc } = props;
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
      });
    },
    onDeleteQuiz(quiz) {
      this.$store.dispatch("actLoadingAction", async () => {
        // delete quizzes by id
        const user_id = this.$store.state.user._id;
        const deleteQUiz = await deleteQuizById({ _id: quiz._id, user_id });
        if (!deleteQUiz) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

        // load quizzes
        this.quiz = null;
        const quizzesbase = this.quizzesbase;
        const quizIndex = quizzesbase.findIndex((o) => o._id === quiz._id);
        quizzesbase.splice(quizIndex, 1);
        this.quizzesbase = quizzesbase;

        // toast success
        this.$toast.success(this.$store.state.string.S_DELETE_VALUES_SUCCESS);
      });
    },
    // action quiz
    onStartQuiz(quiz) {
      this.$store.dispatch("actLoadingAction", async () => {
        const { _id: quiz_id, quiz_code } = quiz;

        if (quiz_code) {
          return this.moveQuizzesStart(quiz_code);
        }

        const questions = await getQuestionsByQuizId({ quiz_id });
        if (questions.length === 0) {
          return this.$toast.error(
            this.$store.state.string.E_QUESTIONS_NOT_FOUND
          );
        }

        this.$store.state.socket.emit("admin-start-quiz", { quiz_id });
      });
    },
    onStopQuiz(quiz) {
      this.$store.dispatch("actLoadingAction", async () => {
        const quiz_id = quiz._id;
        this.$store.state.socket.emit("admin-stop-quiz", { quiz_id });
      });
    },
  },
};
</script>
