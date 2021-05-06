<template>
  <div class="container" v-if="quiz">
    <quizzes-start-control
      :quiz="quiz"
      :users="users"
      @onQuizStart="onQuizStart"
      @onQuizStop="onSetQuizCurrent(0)"
      @onQuizNext="onQuizNext"
    />
    <quiz-answer
      v-if="quiz.quiz_current"
      :question="questions[quiz.quiz_current - 1]"
      :showAnswer="showAnswer"
    />
    <quizzes-start-users
      v-if="!quiz.quiz_current"
      :users="users"
      @onKickUser="onKickUser"
    />
  </div>
  <footer-custom />
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
      questions: [],
      showAnswer: false,
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
    async onLoadQuiz() {
      const quizItem = await getQuizById(this.quiz_id);
      if (!quizItem) return this.$router.back();
      if (!quizItem.quiz_code) return this.$router.back();
      return (this.quiz = quizItem);
    },
    async onLoadQuestions() {
      const questions = await getQuestionsByQuizId(this.quiz._id);
      this.questions = questions;
    },
    onLoadSocket() {
      // join room with quiz_code (action admin)
      this.$store.state.socket.emit("client-join-control", this.quiz.quiz_code);

      // listener user connected
      this.$store.state.socket.on("server-user-connected", (username) =>
        this.$toast.success(
          username + this.$store.state.string.S_ALERT_USER_JOINED
        )
      );

      // listener user disconnect
      this.$store.state.socket.on("server-user-disconnect", (username) =>
        this.$toast.error(
          username + this.$store.state.string.S_ALERT_USER_OUTED
        )
      );

      // listener user kick
      this.$store.state.socket.on("server-user-kick", (username) =>
        this.$toast.error(
          username + this.$store.state.string.S_ALERT_USER_KICKED
        )
      );

      // listener server send user
      this.$store.state.socket.on(
        "server-send-users",
        (users) => (this.users = users)
      );
    },
    onKickUser(index) {
      this.$store.state.socket.emit("client-kick-user", {
        username: this.users[index],
        quiz_code: this.quiz.quiz_code,
      });
    },
    onQuizStart() {
      if (this.users.length === 0) return;
      this.onSetQuizCurrent(1);
    },
    onQuizNext() {
      if (!this.showAnswer) return (this.showAnswer = true);
      this.showAnswer = false;
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
        this.$store.state.socket.emit("client-send-quiz", {
          quiz_code: this.quiz.quiz_code,
          question: this.questions[this.quiz.quiz_current - 1],
        });
      });
    },
  },
};
</script>
