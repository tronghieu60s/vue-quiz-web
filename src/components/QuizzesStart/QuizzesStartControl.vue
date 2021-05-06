<template>
  <div class="d-block d-md-flex justify-content-between my-4">
    <h1 class="mb-3 mb-md-0" style="font-size: 2em">
      Code: {{ quiz.quiz_code }}
    </h1>
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <button type="button" class="btn btn-default btn-sm mb-2">
          <i class="fa fa-user" aria-hidden="true"></i> {{ users.length }}
        </button>
        <button
          v-if="quiz.quiz_current === 0"
          @click="$emit('onQuizStart')"
          type="button"
          class="btn btn-default btn-sm mb-2"
          :disabled="users.length === 0"
        >
          Bắt Đầu Ngay
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
        <button
          v-if="quiz.quiz_current > 0"
          @click="onQuizStop"
          type="button"
          class="btn btn-danger btn-sm mb-2"
        >
          Dừng Lại Ngay
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        <button
          v-if="quiz.quiz_current > 0"
          @click="$emit('onQuizNext')"
          type="button"
          class="btn btn-default btn-sm mb-2"
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
  },
  methods: {
    onQuizStop() {
      if (confirm(this.$store.state.string.Q_CONFIRM_STOP_QUIZ))
        this.$emit("onQuizStop");
    },
  },
};
</script>
