<template>
  <div class="container">
    <div
      v-if="question"
      class="w-100 d-flex justify-content-center align-items-center mt-5"
    >
      <quiz-answer :question="question" :showAnswer="showAnswer" />
    </div>
    <div
      v-else
      class="w-100 d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div>
        <div v-if="username">
          <div>Vui lòng chờ người khác vào...</div>
          <h1 class="mt-2 mb-0">Tên của bạn là: {{ username }}</h1>
          <button
            @click="onOutRoom"
            type="button"
            class="btn btn-default btn-sm mt-3"
          >
            Rời khỏi phòng
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
        <form v-else @submit.prevent="onSubmit">
          <div class="form-group" style="width: 350px">
            <input
              v-model.trim="inputCode"
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="Nhập mã cuộc thi..."
              required
            />
            <small id="helpId" class="form-text text-muted mt-2"
              >Nhập mã cuộc thi để tham gia các câu hỏi trực tuyến cùng chúng
              tôi.</small
            >
            <button type="submit" class="btn btn-primary btn-block mt-2">
              Tham Gia
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import QuizAnswer from "../components/Home/QuizAnswer.vue";
import { getQuizByQuizCode } from "@models/quizzes.firebase";
export default {
  components: { QuizAnswer },
  data() {
    return {
      inputCode: "",
      username: "",
      question: null,
      showAnswer: false,
    };
  },
  created() {
    this.$store.state.socket.on(
      "server-show-answer",
      (show) => (this.showAnswer = show)
    );

    // listener quizzes
    this.$store.state.socket.on(
      "server-send-question",
      (question) => (this.question = question)
    );

    this.$store.state.socket.on("server-username-exists", () =>
      this.$toast.error(this.$store.state.string.S_ALERT_USERNAME_EXISTS)
    );

    // CONNECT
    this.$store.state.socket.on(
      "server-user-connected",
      (username) => (this.username = username)
    );

    // DISCONNECT
    this.$store.state.socket.on("server-user-disconnect", (username) => {
      if (this.username === username) {
        this.username = null;
        this.$toast.success(this.$store.state.string.S_ALERT_YOU_OUTED);
      }
    });

    // KICK
    this.$store.state.socket.on("server-user-kick", (username) => {
      if (this.username === username) {
        this.username = null;
        this.$toast.error(this.$store.state.string.S_ALERT_YOU_KICKED);
      }
    });
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("actLoadingAction", async () => {
        const quizItem = await getQuizByQuizCode(this.inputCode);
        if (!quizItem)
          return this.$toast.error(this.$store.state.string.E_NOT_FOUND_QUIZ);

        if (quizItem.quiz_current > 0)
          return this.$toast.error(this.$store.state.string.E_QUIZ_IS_RUNNING);

        // input user name and send to user
        const username = prompt("Nhập tên của bạn để tiếp tục.");
        const payload = { username, quiz_code: quizItem.quiz_code };
        this.$store.state.socket.emit("client-join-user", payload);
      });
    },
    onOutRoom() {
      this.$store.state.socket.emit("client-out-user", {
        username: this.username,
        quiz_code: this.inputCode,
      });
    },
  },
};
</script>
