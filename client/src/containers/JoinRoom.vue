<template>
  <layout-top>
    <h1 class="mb-0">{{ player_username }}</h1>
    <!-- <div class="bg-dark text-light font-weight-bold rounded-lg px-3 py-1">
      790
    </div> -->
    <div>
      <button @click="onOutRoom" type="button" class="btn btn-default btn-sm">
        Rời Khỏi Phòng
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  </layout-top>
  <div v-show="!question">
    <animate-quiz />
    <div class="mb-0 py-5 my-5 d-flex flex-column align-items-center">
      <loading-action-icon />
      <div class="mt-5">Vui lòng chờ người khác vào...</div>
      <h1 class="mt-2 mb-0">Bạn có thấy tên của mình chưa nhỉ?</h1>
    </div>
  </div>
  <div class="container my-5" v-if="quiz">
    <countdown v-show="countdown" :value="countdown" />
    <div v-if="question && !countdown">
      <div v-show="showResult">
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
      <div
        v-if="answer && !showResult"
        class="mb-0 py-5 my-5 d-flex flex-column align-items-center"
      >
        <loading-action-icon />
        <div class="mt-5 text-center">
          <h1 class="mb-0">Awesome</h1>
          Bạn đã chọn đáp án:
          <span class="text-primary font-weight-bold">
            {{ answer.answer_content }} </span
          >. <br />
          Vui lòng chờ một chút để người khác trả lời...
        </div>
      </div>
      <quiz-answer
        v-else
        :question="question"
        :showResult="showResult"
        @onSelectAnswer="(o) => (this.answer = o)"
      />
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import LayoutTop from "@components/Layout/LayoutTop.vue";
import Firework from "@components/UI/Firework.vue";
import AnimateQuiz from "@components/UI/AnimateQuiz.vue";
import Countdown from "@components/UI/Countdown.vue";
import LoadingActionIcon from "@components/UI/LoadingActionIcon.vue";
import { getQuizByQuizCode } from "@models/quizzesModel";
export default {
  components: {
    QuizAnswer,
    LayoutTop,
    Firework,
    Countdown,
    AnimateQuiz,
    LoadingActionIcon,
  },
  props: { quiz_code: { type: String }, username: { type: String } },
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
      await this.onLoadFirst();
      await this.onLoadSocket();
    });
  },
  watch: {
    showResult() {
      if (!this.answer) return (this.answerStatus = "nochoose");
      const correctAnswer = this.question.question_answers.find(
        (o) => o.answer_isCorrect
      );
      if (correctAnswer.answer_content === this.answer.answer_content)
        return (this.answerStatus = "correct");
      this.answerStatus = "incorrect";
    },
    $route() {
      this.onOutRoom();
    },
  },
  methods: {
    onLoadSocket() {
      this.$store.state.socket.on("server-show-result", (args) => {
        const { quiz_result } = args;
        this.showResult = quiz_result;
      });

      this.$store.state.socket.on("server-send-question", (args) => {
        const { question } = args;
        this.question = question;
        this.answer = null;
      });

      // STOP QUIZ
      this.$store.state.socket.on("server-stop-quiz", () => {
        this.onStorageOutRoom();
      });

      // DISCONNECT
      this.$store.state.socket.on("server-player-disconnect", (args) => {
        const { player_username } = args;
        if (this.player_username === player_username) {
          // this.$toast.success(this.$store.state.string.S_ALERT_YOU_OUTED);
          this.onStorageOutRoom();
        }
      });

      // KICK
      this.$store.state.socket.on("server-player-kick", (args) => {
        const { player_username } = args;
        if (this.player_username === player_username) {
          // this.$toast.error(this.$store.state.string.S_ALERT_YOU_KICKED);
          this.onStorageOutRoom();
        }
      });
    },
    async onLoadFirst() {
      const { quiz_code, username: player_username } = this;

      const getQuiz = await getQuizByQuizCode({ quiz_code });
      if (!getQuiz) return this.$router.push({ name: "Home" });
      this.quiz = getQuiz;

      try {
        const storage = jwt.verify(
          localStorage.getItem("quizPlayer") || "",
          this.$store.state.jwtToken
        );
        if (storage[quiz_code] !== player_username)
          return this.$router.push({ name: "Home" });
      } catch (err) {
        return this.$router.push({ name: "Home" });
      }

      const payload = { quiz_code, player_username };
      this.$store.state.socket.emit("client-join-user", payload);
    },
    onOutRoom() {
      const { quiz_code, username: player_username } = this;
      const payload = { quiz_code, player_username };
      this.$store.state.socket.emit("client-out-user", payload);
    },
    onStorageOutRoom() {
      try {
        const storage = jwt.verify(
          localStorage.getItem("quizPlayer"),
          this.$store.state.jwtToken
        );
        delete storage[this.quiz_code];
        const tokenStorage = jwt.sign(storage, this.$store.state.jwtToken);
        localStorage.setItem("quizPlayer", tokenStorage);
      } catch (err) {
        //empty
        localStorage.removeItem("quizPlayer");
      }
      this.$router.push({ name: "Home" });
    },
    onCountDownTimer() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.onCountDownTimer();
        }, 1000);
      }
    },
  },
};
</script>
