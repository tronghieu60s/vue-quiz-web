<template>
  <div class="d-block d-md-flex justify-content-between my-4 mb-5">
    <h1 class="mb-3 mb-md-0" style="font-size: 2em">
      Code: {{ quiz.quiz_code }}
    </h1>
    <div class="d-flex justify-content-center flex-column">
      <div class="my-1">
        <button type="button" class="btn btn-default btn-sm">
          <i class="fa fa-user" aria-hidden="true"></i> {{ users.length }}
        </button>
        <button
          v-if="!question"
          @click="$emit('onQuizStart')"
          type="button"
          class="btn btn-default btn-sm"
          :disabled="users.length === 0"
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
      <div>
        <button v-if="question" type="button" class="btn btn-default btn-sm">
          <i class="fa fa-user" aria-hidden="true"></i>
          {{ quiz.quiz_current }}/{{ questions.length }}
        </button>
        <button
          v-if="question"
          @click="$emit('onQuizNext')"
          type="button"
          class="btn btn-default btn-sm"
        >
          Tiếp theo
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["onQuizStart", "onQuizStop", "onQuizNext"],
  props: {
    quiz: { type: Object },
    users: { type: Object },
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
