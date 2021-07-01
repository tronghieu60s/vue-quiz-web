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
import { updateQuizById } from "@models/quizzes.firebase";
import { getQuestionsByQuizId } from "@models/questions.firebase";
import {
  getAllQuizzes,
  getQuizzesByUserId,
  createQuiz,
  deleteQuizById,
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
    // load quizzes first
    this.$store.dispatch("actLoadingAction", this.onLoadQuizzes);
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
      this.$store.dispatch("actLoadingAction", this.onLoadQuizzes);
    },
  },
  methods: {
    onActionQuiz(props) {
      this.$store.dispatch(
        "actLoadingAction",
        this.quiz
          ? () => this.onUpdateQuiz(props)
          : () => this.onCreateQuiz(props)
      );
    },
    routerQuizStart(quiz_id) {
      this.$router.push({
        name: "Quizzes-Start",
        params: { quiz_id: quiz_id },
      });
    },
    // load - create - update - delete
    async onLoadQuizzes() {
      if (!this.$store.state.user) return;

      // get quizzes by database and set to quizzes and quizzesbase
      const user_id = this.$store.state.user._id;
      const quizzes = [...(await getQuizzesByUserId({ user_id }))];
      quizzes.reverse();

      // set quizzes to base
      this.quizzes = quizzes;
      this.quizzesbase = quizzes;
    },
    async onCreateQuiz(props) {
      const { quiz_title, quiz_desc } = props;
      const user_id = this.$store.state.user._id;

      // create quiz and check exists (if not exists alert error)
      const createItem = await createQuiz({ quiz_title, quiz_desc, user_id });
      if (!createItem)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      // load quizzes on table
      const quizzesbase = this.quizzesbase;
      quizzesbase.unshift(createItem);
      this.quizzesbase = quizzesbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);
    },
    async onUpdateQuiz(props) {
      const quizId = this.quiz._id;
      const updateItem = await updateQuizById(quizId, { ...props });
      if (!updateItem)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      // load quizzes on table
      const quizzesbase = this.quizzesbase;
      const quizIndex = quizzesbase.findIndex((o) => o._id === quizId);
      quizzesbase[quizIndex] = updateItem;
      this.quizzesbase = quizzesbase;

      // toast success
      this.$toast.success(this.$store.state.string.S_EDIT_VALUES_SUCCESS);
    },
    async onDeleteQuiz(quiz) {
      this.$store.dispatch("actLoadingAction", async () => {
        // delete quizzes by id
        const user_id = this.$store.state.user._id;
        const deleteItem = await deleteQuizById({ _id: quiz._id, user_id });
        if (!deleteItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

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
    async onStartQuiz(quiz) {
      if (quiz) if (quiz.quiz_code) return this.routerQuizStart(quiz._id);

      this.$store.dispatch("actLoadingAction", async () => {
        const questions = await getQuestionsByQuizId(quiz._id);
        if (questions.length === 0)
          return this.$toast.error(
            this.$store.state.string.E_QUESTIONS_NOT_FOUND
          );

        const quiz_code = await this.generateCodeQuiz();
        const updateItem = await updateQuizById(quiz._id, { quiz_code });
        if (!updateItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        this.routerQuizStart(quiz._id);
      });
    },
    async onStopQuiz(quiz) {
      this.$store.dispatch("actLoadingAction", async () => {
        const update = { quiz_code: null, quiz_current: 0 };
        const updateItem = await updateQuizById(quiz._id, update);
        if (!updateItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        // load quizzes on table
        const quizzesbase = this.quizzesbase;
        const quizIndex = quizzesbase.findIndex((o) => o._id === quiz._id);
        quizzesbase[quizIndex] = updateItem;
        this.quizzesbase = quizzesbase;

        // request server stop quiz
        this.$store.state.socket.emit("admin-stop-quiz", quiz.quiz_code);
      });
    },
    async generateCodeQuiz(quizzes = null) {
      // random and check if quizzes exists
      const random = Math.random().toString(36).substring(7);
      if (!quizzes) quizzes = await getAllQuizzes();

      // find code exists on quizzes
      const findCode = quizzes.find((o) => o.quiz_code === random);
      if (findCode) return this.generateCodeQuiz(quizzes);

      // return code
      return random;
    },
  },
};
</script>
