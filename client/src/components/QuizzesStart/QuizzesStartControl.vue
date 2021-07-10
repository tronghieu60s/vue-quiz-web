<template>
  <h1 class="mb-0 mr-4">
    Code: {{ quiz.quiz_code }}<br />
    <h5 v-if="quiz.quiz_current > 0" class="mb-0">
      {{ quiz.quiz_current }} trên {{ questions.length }} câu hỏi
    </h5>
  </h1>
  <div class="d-flex justify-content-center flex-column my-2 my-sm-0">
    <div class="my-1">
      <quizzes-start-players-model
        :players="players"
        :playersOnline="playersOnline"
        @onKickPlayer="(index) => $emit('onKickPlayer', index)"
      />
      <button
        v-if="!question"
        @click="$emit('onQuizStart')"
        type="button"
        class="btn btn-default btn-sm"
        :disabled="playersOnline.length === 0"
      >
        Bắt Đầu Ngay
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
      <button
        v-if="question"
        @click="onQuizStop"
        type="button"
        class="btn btn-danger btn-sm"
      >
        Dừng Lại Ngay
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import QuizzesStartPlayersModel from "./QuizzesStartPlayersModel.vue";
export default {
  components: { QuizzesStartPlayersModel },
  emits: ["onQuizStart", "onQuizStop", "onQuizNext", "onKickPlayer"],
  props: {
    quiz: { type: Object },
    players: { type: Object },
    playersOnline: { type: Array },
    question: { type: Object },
    questions: { type: Array },
  },
  methods: {
    onQuizStop() {
      if (confirm(this.$store.state.string.Q_CONFIRM_STOP_QUIZ))
        this.$emit("onQuizStop");
    },
  },
};
</script>
