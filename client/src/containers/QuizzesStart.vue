<template>
  <animate-quiz v-show="!question" />
  <layout-top v-if="quiz">
    <quizzes-start-control
      :quiz="quiz"
      :players="players"
      :playersOnline="playersOnline"
      :question="question"
      :questions="questions"
      @onKickPlayer="onKickPlayer"
      @onQuizStart="playersOnline.length > 0 && onQuizCurrent(1)"
      @onQuizStop="onQuizCurrent(0)"
      @onQuizNext="onQuizNext"
    />
  </layout-top>
  <div class="container my-5" v-if="quiz">
    <div
      v-if="question"
      class="d-flex justify-content-center align-items-center mb-2"
    >
      <button type="button" class="btn btn-default">
        Thời Gian: {{ "0" + countdown }}
      </button>
      <button
        @click="onQuizNext"
        type="button"
        class="btn btn-default"
        :disabled="countdown !== 0"
      >
        Tiếp theo <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
    <quiz-answer
      v-if="question"
      :countdown="countdown !== 0"
      :question="question"
      :showResult="showResult"
    />
    <quizzes-start-players
      v-if="!question"
      :players="players"
      :playersOnline="playersOnline"
      @onKickPlayer="onKickPlayer"
    />
    <quizzes-start-ranking />
  </div>
</template>

<script>
import QuizzesStartControl from "@components/QuizzesStart/QuizzesStartControl.vue";
import QuizzesStartPlayers from "@components/QuizzesStart/QuizzesStartPlayers.vue";
import QuizzesStartRanking from "@components/QuizzesStart/QuizzesStartRanking.vue";
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import LayoutTop from "@components/Layout/LayoutTop.vue";
import AnimateQuiz from "@components/UI/AnimateQuiz.vue";
import { getQuizByQuizCode, updateQuizById } from "@models/quizzesModel";
import { getQuestionsByQuizId } from "@models/questionsModel";
export default {
  components: {
    QuizzesStartControl,
    QuizzesStartPlayers,
    QuizzesStartRanking,
    QuizAnswer,
    LayoutTop,
    AnimateQuiz,
  },
  props: ["quiz_code"],
  data() {
    return {
      quiz: null,
      players: [],
      playersOnline: [],
      question: null,
      questions: [],
      showResult: false,
      countdown: 0,
    };
  },
  created() {
    // load quiz item first
    this.$store.dispatch("actLoadingAction", async () => {
      await this.onLoadQuiz();
      await this.onLoadQuestions();
      await this.onLoadSocket();
    });
  },
  watch: {
    players() {
      const playersOnline = this.players.filter((o) => o.player_online);
      this.playersOnline = playersOnline;
    },
  },
  methods: {
    /* load pages */
    onLoadSocket() {
      const { quiz_code } = this.quiz;

      this.$store.state.socket.emit("admin-join-quiz", { quiz_code });

      this.$store.state.socket.on("server-send-players", (args) => {
        const { quiz_players } = args;
        this.players = quiz_players;
      });

      this.$store.state.socket.on("server-send-question", (args) => {
        const { quiz_question } = args;
        if (quiz_question) {
          this.countdown = 3;
          this.onCountDownTimer();
        }
        this.question = quiz_question;
      });
    },
    async onLoadQuiz() {
      const getQuiz = await getQuizByQuizCode({ quiz_code: this.quiz_code });
      if (!getQuiz) return this.$router.back();
      return (this.quiz = getQuiz);
    },
    async onLoadQuestions() {
      const quiz_id = this.quiz._id;
      const getQuestions = await getQuestionsByQuizId({ quiz_id });
      this.questions = getQuestions;
      this.question = getQuestions[this.quiz.quiz_current - 1];
    },
    /* methods */
    onKickPlayer(index) {
      const { quiz_code } = this.quiz;
      const { player_username } = this.players[index];
      const payload = { quiz_code, player_username };
      this.$store.state.socket.emit("admin-kick-player", payload);
    },
    onQuizNext() {
      if (!this.showResult) {
        return this.$store.state.socket.emit("admin-show-result", {
          quiz_code: this.quiz.quiz_code,
        });
      }

      if (this.quiz.quiz_current >= this.questions.length) {
        return this.onQuizCurrent(0);
      }

      this.onQuizCurrent(this.quiz.quiz_current + 1);
    },
    onQuizCurrent(quiz_current) {
      this.$store.dispatch("actLoadingAction", async () => {
        const update = { _id: this.quiz._id, quiz_current, quiz_result: false };
        const updateItem = await updateQuizById(update);
        if (!updateItem) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

        this.quiz = updateItem;
        this.$store.state.socket.emit("admin-send-question", {
          quiz_code: this.quiz.quiz_code,
          quiz_question: this.questions[this.quiz.quiz_current - 1],
        });
      });
    },
  },
};
</script>
