<template>
  <div class="container" v-if="quiz">
    <quizzes-start-control
      :quiz="quiz"
      :users="users"
      :question="question"
      @onQuizStart="onQuizStart"
      @onQuizStop="onSetQuizCurrent(0)"
      @onQuizNext="onQuizNext"
    />
    <quiz-answer
      v-if="question"
      :question="question"
      :showResult="showResult"
    />
    <quizzes-start-users
      v-if="!question"
      :users="users"
      @onKickUser="onKickUser"
    />
    <footer-custom />
  </div>
</template>

<script>
import FooterCustom from "@components/Footer.vue";
import QuizzesStartControl from "@components/QuizzesStart/QuizzesStartControl.vue";
import QuizzesStartUsers from "@components/QuizzesStart/QuizzesStartUsers.vue";
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import { getQuizById, updateQuizById } from "@models/quizzes.firebase";
import { getQuestionsByQuizId } from "@models/questions.firebase";
export default {
  components: {
    FooterCustom,
    QuizzesStartControl,
    QuizzesStartUsers,
    QuizAnswer,
  },
  props: ["quiz_id"],
  data() {
    return {
      quiz: null,
      users: [],
      question: null,
      questions: [],
      showResult: false,
    };
  },
  created() {
    // load quiz item first
    this.$store.dispatch("actLoadingAction", async () => {
      await this.onLoadQuiz();
      await this.onLoadQuestions();
      this.onLoadSocket();
    });
  },
  methods: {
    onLoadSocket() {
      this.$store.state.socket.emit("admin-join-control", this.quiz.quiz_code);

      this.$store.state.socket.on("server-send-users", (users) => {
        const mapUsers = Object.entries(users)
          .map(([name, status]) => ({ name, status }))
          .filter((o) => o.status === "online")
          .map((o) => o.name);
        this.users = mapUsers;
      });

      this.$store.state.socket.on(
        "server-send-question",
        (question) => (this.question = question)
      );

      this.$store.state.socket.on(
        "server-show-result",
        (show) => (this.showResult = show)
      );

      // // CONNECT
      // this.$store.state.socket.on("server-user-connected", (username) =>
      //   this.$toast.success(
      //     username + this.$store.state.string.S_ALERT_USER_JOINED
      //   )
      // );

      // // DISCONNECT
      // this.$store.state.socket.on("server-user-disconnect", (username) =>
      //   this.$toast.error(
      //     username + this.$store.state.string.S_ALERT_USER_OUTED
      //   )
      // );

      // // KICK
      // this.$store.state.socket.on("server-user-kick", (username) =>
      //   this.$toast.error(
      //     username + this.$store.state.string.S_ALERT_USER_KICKED
      //   )
      // );
    },
    async onLoadQuiz() {
      const quizItem = await getQuizById(this.quiz_id);
      if (!quizItem) return this.$router.back();
      if (!quizItem.quiz_code) return this.$router.back();
      return (this.quiz = quizItem);
    },
    async onLoadQuestions() {
      const questions = await getQuestionsByQuizId(this.quiz._id);
      this.questions = questions;
      this.question = questions[this.quiz.quiz_current - 1];
    },
    onKickUser(index) {
      this.$store.state.socket.emit("admin-kick-user", {
        username: this.users[index],
        quiz_code: this.quiz.quiz_code,
      });
    },
    onQuizStart() {
      if (this.users.length === 0) return;
      this.onSetQuizCurrent(1);
    },
    onQuizNext() {
      if (!this.showResult)
        return this.$store.state.socket.emit(
          "admin-show-result",
          this.quiz.quiz_code
        );

      if (this.quiz.quiz_current >= this.questions.length)
        return this.onSetQuizCurrent(0);

      this.onSetQuizCurrent(this.quiz.quiz_current + 1);
    },
    onSetQuizCurrent(quiz_current) {
      this.$store.dispatch("actLoadingAction", async () => {
        const update = { quiz_current };
        const updateItem = await updateQuizById(this.quiz._id, update);
        if (!updateItem)
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );

        this.quiz = updateItem;
        this.$store.state.socket.emit("admin-send-question", {
          quiz_code: this.quiz.quiz_code,
          question: this.questions[this.quiz.quiz_current - 1],
        });
      });
    },
  },
};
</script>
