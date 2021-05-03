<template>
  <div class="container">
    <div class="row">
      <quizzes-start-control :quiz="quiz" :users="users" />
      <quizzes-start-users :users="users" @onKickUser="onKickUser" />
    </div>
    <footer-custom />
  </div>
</template>

<script>
import FooterCustom from "@components/Footer.vue";
import QuizzesStartControl from "@components/QuizzesStart/QuizzesStartControl.vue";
import QuizzesStartUsers from "@components/QuizzesStart/QuizzesStartUsers.vue";
import { getQuizById } from "@models/quizzes.firebase";
export default {
  components: { FooterCustom, QuizzesStartControl, QuizzesStartUsers },
  props: ["quiz_id"],
  data() {
    return {
      quiz: { _id: "", quiz_title: "", quiz_desc: "" },
      users: [],
    };
  },
  created() {
    // load quiz item first
    this.$store.dispatch("actLoadingAction", async () => {
      await this.onLoadQuiz();
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
  },
};
</script>
