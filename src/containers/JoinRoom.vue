<template>
  <div v-if="quiz" class="container">
    <div
      v-if="question"
      class="w-100 d-flex justify-content-center align-items-center mt-5"
    >
      <p v-if="answer && !showResult" class="mb-0 py-5 my-5">
        Câu hỏi:
        <span class="text-primary font-weight-bold"
          >{{ question.question }}.</span
        ><br />
        Bạn đã chọn đáp án:
        <span class="text-danger font-weight-bold">{{ answer.answer }}</span
        >.<br />Vui lòng chờ một chút để người khác trả lời...
      </p>
      <quiz-answer
        v-else
        :question="question"
        :showResult="showResult"
        @onSelectAnswer="(o) => (this.answer = o)"
      />
    </div>
    <div
      v-else
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div>
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
    </div>
  </div>
</template>

<script>
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import { getQuizByQuizCode } from "@models/quizzes.firebase";
export default {
  components: { QuizAnswer },
  props: {
    quiz_code: { type: String },
    username: { type: String },
  },
  data() {
    return {
      answer: null,
      quiz: null,
      question: null,
      showResult: false,
    };
  },
  watch: {
    showResult() {
      const body = document.querySelector("body");
      if (!this.answer) return body.classList.add("bg-danger");

      const correctAnswer = this.question.answers.find((o) => o.isCorrect);
      if (correctAnswer.answer === this.answer.answer)
        body.classList.add("bg-success");
      else body.classList.add("bg-danger");
    },
    question() {
      const body = document.querySelector("body");
      if (!this.answer) return (body.className = "");
    },
  },
  created() {
    this.$store.dispatch("actLoadingAction", async () => {
      const getQuiz = await getQuizByQuizCode(this.quiz_code);
      if (!getQuiz) return this.$router.push({ name: "Home" });
      this.quiz = getQuiz;

      const storage = localStorage.getItem(".quiz_config_user") || "{}";
      if (JSON.parse(storage)[this.quiz_code] !== this.username)
        return this.$router.push({ name: "Home" });

      const payload = { username: this.username, quiz_code: this.quiz_code };
      this.$store.state.socket.emit("client-join-user", payload);
      this.onLoadSocket();
    });
  },
  methods: {
    onLoadSocket() {
      this.$store.state.socket.on(
        "server-show-result",
        (show) => (this.showResult = show)
      );

      this.$store.state.socket.on("server-send-question", (question) => {
        this.question = question;
        this.answer = null;
      });

      this.$store.state.socket.on("server-stop-quiz", () => {
        this.$router.push({ name: "Home" });
        this.onStorageOutRoom();
      });

      // DISCONNECT
      this.$store.state.socket.on("server-user-disconnect", (username) => {
        if (this.username === username) {
          // this.$toast.success(this.$store.state.string.S_ALERT_YOU_OUTED);
          this.onStorageOutRoom();
        }
      });

      // KICK
      this.$store.state.socket.on("server-user-kick", (username) => {
        if (this.username === username) {
          // this.$toast.error(this.$store.state.string.S_ALERT_YOU_KICKED);
          this.onStorageOutRoom();
        }
      });
    },
    onOutRoom() {
      this.$store.state.socket.emit("client-out-user", {
        username: this.username,
        quiz_code: this.quiz_code,
      });
    },
    onStorageOutRoom() {
      const storage = JSON.parse(
        localStorage.getItem(".quiz_config_user") || "{}"
      );
      delete storage[this.quiz_code];
      localStorage.setItem(".quiz_config_user", JSON.stringify(storage));
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
