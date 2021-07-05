<template>
  <animate-quiz v-show="!question" />
  <layout-top v-if="quiz">
    <quizzes-start-control
      :quiz="quiz"
      :users="users"
      :question="question"
      :questions="questions"
      @onQuizStart="users.length > 0 && onSetQuizCurrent(1)"
      @onQuizStop="onSetQuizCurrent(0)"
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
    <quizzes-start-users
      v-if="!question"
      :users="users"
      @onKickUser="onKickUser"
    />
  </div>
</template>

<script>
import QuizzesStartControl from "@components/QuizzesStart/QuizzesStartControl.vue";
import QuizzesStartUsers from "@components/QuizzesStart/QuizzesStartUsers.vue";
import QuizAnswer from "@components/Home/QuizAnswer.vue";
import LayoutTop from "@components/Layout/LayoutTop.vue";
import AnimateQuiz from "@components/UI/AnimateQuiz.vue";
import { getQuizById, updateQuizById } from "@models/quizzesModel";
import { getQuestionsByQuizId } from "@models/questionsModel";
export default {
  components: {
    QuizzesStartControl,
    QuizzesStartUsers,
    QuizAnswer,
    LayoutTop,
    AnimateQuiz,
  },
  props: ["quiz_id"],
  data() {
    return {
      quiz: null,
      users: [],
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
  methods: {
    onLoadSocket() {
      const { quiz_code } = this.quiz;
      // admin join room control
      this.$store.state.socket.emit("admin-join-control", { quiz_code });

      // request server send players
      this.$store.state.socket.on("server-send-players", (args) => {
        const { quiz_players } = args;
        const players = quiz_players
          .filter((o) => o.player_online)
          .map((o) => o.player_username);
        this.users = players;
      });
    },
    async onLoadQuiz() {
      const getQuiz = await getQuizById({ _id: this.quiz_id });
      if (!getQuiz) return this.$router.back();
      if (!getQuiz.quiz_code) return this.$router.back();
      return (this.quiz = getQuiz);
    },
    async onLoadQuestions() {
      const getQuestions = await getQuestionsByQuizId({
        quiz_id: this.quiz._id,
      });
      this.questions = getQuestions;
      this.question = getQuestions[this.quiz.quiz_current - 1];
    },
    onKickUser(index) {
      this.$store.state.socket.emit("admin-kick-player", {
        quiz_code: this.quiz.quiz_code,
        player_username: this.users[index],
      });
    },
    onQuizNext() {
      if (!this.showResult) {
        return this.$store.state.socket.emit("admin-show-result", {
          quiz_code: this.quiz.quiz_code,
        });
      }

      if (this.quiz.quiz_current >= this.questions.length) {
        return this.onSetQuizCurrent(0);
      }

      this.onSetQuizCurrent(this.quiz.quiz_current + 1);
    },
    onSetQuizCurrent(quiz_current) {
      this.$store.dispatch("actLoadingAction", async () => {
        const update = { _id: this.quiz._id, quiz_current };
        const updateItem = await updateQuizById(update);
        if (!updateItem) {
          return this.$toast.error(
            this.$store.state.string.E_UNKNOWN_ERROR_DETECT
          );
        }

        this.quiz = updateItem;
        this.$store.state.socket.emit("admin-send-question", {
          quiz_code: this.quiz.quiz_code,
          question: this.questions[this.quiz.quiz_current - 1],
        });
      });
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
