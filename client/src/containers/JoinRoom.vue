<template>
  <layout-top>
    <join-room-control
      :player_username="player_username"
      @onOutRoom="onOutRoom"
    />
  </layout-top>
  <div v-show="!question">
    <animate-quiz />
    <join-room-waiting />
  </div>
  <div class="container my-5" v-if="quiz">
    <countdown v-show="countdown" :value="countdown" />
    <div v-if="question && !countdown">
      <join-room-show-result :answer="answer" :result="result" />
      <join-room-waiting-answer v-if="answer && !result" />
      <quiz-answer
        v-else
        :result="result"
        :question="question"
        @onSelectAnswer="(o) => (this.answer = o)"
      />
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import LayoutTop from "@components/Layout/LayoutTop.vue";
import AnimateQuiz from "@components/UI/AnimateQuiz.vue";
import Countdown from "@components/UI/Countdown.vue";
import JoinRoomControl from "@components/JoinRoom/JoinRoomControl.vue";
import JoinRoomShowResult from "@components/JoinRoom/JoinRoomShowResult.vue";
import JoinRoomWaiting from "@components/JoinRoom/JoinRoomWaiting.vue";
import JoinRoomWaitingAnswer from "@components/JoinRoom/JoinRoomWaitingAnswer.vue";
import { getQuizByQuizCode } from "@models/quizzesModel";
export default {
  components: {
    QuizAnswer,
    LayoutTop,
    Countdown,
    AnimateQuiz,
    JoinRoomControl,
    JoinRoomShowResult,
    JoinRoomWaiting,
    JoinRoomWaitingAnswer,
  },
  props: {
    quiz_code: { type: String },
    player_username: { type: String },
  },
  data() {
    return {
      quiz: null,
      question: null,
      answer: null,
      result: null,
      countdown: 0,
    };
  },
  created() {
    this.$store.dispatch("actLoadingAction", this.onLoadFirst);
  },
  watch: {
    $route() {
      this.onOutRoom();
    },
  },
  methods: {
    /* load pages */
    async onLoadFirst() {
      const { quiz_code, player_username } = this;

      const getQuiz = await getQuizByQuizCode({ quiz_code });
      if (!getQuiz) {
        return this.$router.push({ name: "Home" });
      }
      this.quiz = getQuiz;

      try {
        const storage = jwt.verify(
          localStorage.getItem("quizPlayer") || "",
          this.$store.state.jwtToken
        );
        if (storage[quiz_code] !== player_username) {
          return this.$router.push({ name: "Home" });
        }
      } catch (err) {
        return this.$router.push({ name: "Home" });
      }

      this.onLoadSocket();
    },
    onLoadSocket() {
      const { quiz_code, player_username } = this;
      this.$store.state.socket.emit("client-join-room", {
        quiz_code,
        player_username,
      });

      this.$store.state.socket.on("server-out-room", () => {
        this.onStorageOutRoom();
      });

      this.$store.state.socket.on("server-send-question", (args) => {
        const { quiz_question } = args;
        this.answer = null;
        this.result = null;
        this.question = quiz_question;
      });

      this.$store.state.socket.on("server-send-result", (args) => {
        const { quiz_result } = args;
        this.result = quiz_result;
      });
    },
    /* methods */
    onOutRoom() {
      const { quiz_code, player_username } = this;
      const payload = { quiz_code, player_username };
      this.$store.state.socket.emit("client-out-room", payload);
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
  },
};
</script>
