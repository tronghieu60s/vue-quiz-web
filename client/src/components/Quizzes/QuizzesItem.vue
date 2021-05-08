<template>
  <tr>
    <td>
      <div class="d-flex justify-content-center">
        <button
          @click="this.$emit('onStartQuiz')"
          type="button"
          class="btn btn-sm btn-primary"
          title="Bắt đầu ngay"
        >
          <i class="fa fa-play" aria-hidden="true"></i>
        </button>
        <button
          v-if="quiz.quiz_code"
          @click="this.$emit('onStopQuiz')"
          type="button"
          class="btn btn-sm btn-danger"
          title="Dừng ngay"
        >
          <i class="fa fa-pause" aria-hidden="true"></i>
        </button>
      </div>
    </td>
    <td>
      <h5>{{ quiz.quiz_title }}</h5>
    </td>
    <td>
      {{ quiz.quiz_desc }}
    </td>
    <td>
      <div v-if="!quiz.quiz_code">
        <button
          @click="$router.push(routerQuestions)"
          type="button"
          class="btn btn-primary btn-sm mb-2"
          title="Sửa"
        >
          <i class="fa fa-pencil-square" aria-hidden="true"></i>
        </button>
        <button
          @click="onDeleteQuiz"
          type="button"
          class="btn btn-danger btn-sm mb-2"
          title="Xóa"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
      <h5 v-else class="text-danger mb-0">[Đang Chạy]</h5>
    </td>
  </tr>
</template>

<script>
export default {
  emits: ["onStartQuiz", "onStopQuiz", "onDeleteQuiz"],
  props: {
    quiz: {
      type: Object,
      default: () => ({
        _id: "",
        quiz_title: "",
        quiz_desc: "",
        quiz_code: "",
      }),
    },
  },
  computed: {
    routerQuestions() {
      return { name: "Questions", params: { quiz_id: this.quiz._id } };
    },
  },
  methods: {
    onDeleteQuiz() {
      const textConfirm = this.$store.state.string.Q_CONFIRM_DELETE_VALUES;
      if (confirm(textConfirm)) this.$emit("onDeleteQuiz");
    },
  },
};
</script>
