<template>
  <countdown v-if="countdown" :value="countdown" />
  <layout-top>
    <h1 class="mb-0">{{ username }}</h1>
    <!-- <div class="bg-dark text-light font-weight-bold rounded-lg px-3 py-1">
      790
    </div> -->
  </layout-top>
  <layout-center v-if="quiz">
    <div v-if="question">
      <div v-if="showResult">
        <firework v-show="answerStatus === 'correct'" />
        <h1
          :class="{
            'text-success': answerStatus === 'correct',
            'text-danger': answerStatus === 'incorrect',
            'text-warning': answerStatus === 'nochoose',
            'text-center': true,
          }"
        >
          {{ answerStatus === "correct" ? "✔️ Chính Xác" : "" }}
          {{ answerStatus === "incorrect" ? "❌ Sai Mất Rồi" : "" }}
          {{ answerStatus === "nochoose" ? "🤔 Bạn Chưa Chọn Đáp Án Nào" : "" }}
        </h1>
      </div>
      <div v-if="answer && !showResult" class="mb-0 py-5 my-5">
        <h1 class="mb-0">Awesome</h1>
        Bạn đã chọn đáp án:
        <span class="text-primary font-weight-bold"> {{ answer.answer }} </span
        >. <br />
        Vui lòng chờ một chút để người khác trả lời...
      </div>
      <quiz-answer
        v-else
        :question="question"
        :showResult="showResult"
        @onSelectAnswer="(o) => (this.answer = o)"
      />
    </div>
    <div v-else>
      <div>Vui lòng chờ người khác vào...</div>
      <h1 class="mt-2 mb-0">Bạn có thấy tên mình chưa nhỉ?</h1>
      <button
        @click="onOutRoom"
        type="button"
        class="btn btn-default btn-sm mt-3"
      >
        Rời khỏi phòng
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  </layout-center>
</template>

<script>
import jwt from "jsonwebtoken";
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import LayoutCenter from "@components/Layout/LayoutCenter.vue";
import LayoutTop from "@components/Layout/LayoutTop.vue";
import Firework from "../components/UI/Firework.vue";
import Countdown from "../components/UI/Countdown.vue";
import { getQuizByQuizCode } from "@models/quizzes.firebase";
export default {
  components: { QuizAnswer, LayoutCenter, LayoutTop, Firework, Countdown },
  props: {
    quiz_code: { type: String },
    username: { type: String },
  },
  data() {
    return {
      answer: null,
      answerStatus: null,
      quiz: null,
      question: null,
      showResult: false,
      countdown: 0,
    };
  },
  created() {
    this.$store.dispatch("actLoadingAction", async () => {
      const getQuiz = await getQuizByQuizCode(this.quiz_code);
      if (!getQuiz) return this.$router.push({ name: "Home" });
      this.quiz = getQuiz;

      try {
        const storage = jwt.verify(
          localStorage.getItem(".quiz_config_user") || "",
          this.$store.state.jwtToken
        );
        if (storage[this.quiz_code] !== this.username)
          return this.$router.push({ name: "Home" });
      } catch (err) {
        return this.$router.push({ name: "Home" });
      }

      const payload = { username: this.username, quiz_code: this.quiz_code };
      this.$store.state.socket.emit("client-join-user", payload);
      this.onLoadSocket();
    });
  },
  watch: {
    showResult() {
      if (!this.answer) return (this.answerStatus = "nochoose");
      const correctAnswer = this.question.answers.find((o) => o.isCorrect);
      if (correctAnswer.answer === this.answer.answer)
        return (this.answerStatus = "correct");
      this.answerStatus = "incorrect";
    },
    $route() {
      this.onOutRoom();
    },
  },
  methods: {
    onCountDownTimer() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.onCountDownTimer();
        }, 1000);
      }
    },
    onLoadSocket() {
      this.$store.state.socket.on(
        "server-show-result",
        (show) => (this.showResult = show)
      );

      this.$store.state.socket.on("server-send-question", (question) => {
        if (question) {
          this.countdown = 3;
          this.onCountDownTimer();
        }

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
      try {
        const storage = jwt.verify(
          localStorage.getItem(".quiz_config_user"),
          this.$store.state.jwtToken
        );
        delete storage[this.quiz_code];
        const tokenStorage = jwt.sign(storage, this.$store.state.jwtToken);
        localStorage.setItem(".quiz_config_user", tokenStorage);
      } catch (err) {
        //empty
        localStorage.removeItem(".quiz_config_user");
      }
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
