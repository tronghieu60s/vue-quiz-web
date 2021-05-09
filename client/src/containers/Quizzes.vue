<template>
  <div class="container">
    <header-custom title="Trang Chủ" />
    <div class="row px-3 px-md-0">
      <div :class="classLeftCol">
        <quizzes-create @onCreateQuiz="onCreateQuiz" />
      </div>
      <div :class="[classRightCol, 'mt-5 mt-md-0']">
        <quizzes-filter
          @onToggleCreate="isCreate = !isCreate"
          @onInputSearch="(s) => (inputSearch = s)"
        />
        <quizzes-list
          :quizzes="quizzes"
          @onStartQuiz="onStartQuiz"
          @onStopQuiz="onStopQuiz"
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
import {
  createQuiz,
  getQuizzes,
  getQuizzesByUserId,
  deleteQuizById,
  updateQuizById,
} from "@models/quizzes.firebase";
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
      quizzes: [],
      quizzesbase: [],
      inputSearch: "",
      isCreate: false,
    };
  },
  created() {
    // load quizzes first
    this.$store.dispatch("actLoadingAction", this.onLoadQuizzes);
  },
  computed: {
    classLeftCol() {
      return this.isCreate ? "col-lg-4 col-md-5" : "d-none";
    },
    classRightCol() {
      return this.isCreate ? "col-lg-8 col-md-7" : "col-12 col-lg-10 mx-auto";
    },
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
    async onLoadQuizzes() {
      if (!this.$store.state.user) return;
      // get quizzes by database and set to quizzes and quizzesbase
      const quizzes = await getQuizzesByUserId(this.$store.state.user._id);
      quizzes.reverse();
      this.quizzes = quizzes;
      this.quizzesbase = quizzes;
    },
    onCreateQuiz(props) {
      const { quiz_title, quiz_desc } = props;
      const user_id = this.$store.state.user._id;

      this.$store.dispatch("actLoadingAction", async () => {
        // create quiz and check exists (if not exists alert error)
        const quiz = await createQuiz({ quiz_title, quiz_desc, user_id });
        if (!quiz)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        // reload quizzes on table and toast success
        await this.onLoadQuizzes();
        this.$toast.success(this.$store.state.string.S_ADD_VALUES_SUCCESS);
      });
    },
    onDeleteQuiz(quiz) {
      this.$store.dispatch("actLoadingAction", async () => {
        // delete quizzes by id
        const deleteItem = await deleteQuizById(quiz._id);
        if (!deleteItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        // reload quizzes and toast success
        await this.onLoadQuizzes();
        this.$toast.success(this.$store.state.string.S_DELETE_VALUES_SUCCESS);
      });
    },
    onStartQuiz(quiz) {
      if (quiz) if (quiz.quiz_code) return this.routerQuizStart(quiz._id);

      this.$store.dispatch("actLoadingAction", async () => {
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
        const quiz_code = null;
        const updateItem = await updateQuizById(quiz._id, { quiz_code });
        if (!updateItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        await this.onLoadQuizzes();
        this.$store.state.socket.emit("admin-stop-quiz", quiz.quiz_code);
      });
    },
    routerQuizStart(quiz_id) {
      this.$router.push({
        name: "Quizzes-Start",
        params: { quiz_id: quiz_id },
      });
    },
    async generateCodeQuiz(quizzes = null) {
      // random and check if quizzes exists
      const random = Math.random().toString(36).substring(7);
      if (!quizzes) quizzes = await getQuizzes();

      // find code exists on quizzes
      const findCode = quizzes.find((o) => o.quiz_code === random);
      if (findCode) return this.generateCodeQuiz(quizzes);

      // return code
      return random;
    },
  },
};
</script>
