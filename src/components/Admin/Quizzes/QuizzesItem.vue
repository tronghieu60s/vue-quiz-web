<template>
  <tr>
    <td>
      <button type="button" class="btn btn-primary btn-sm" title="Bắt đầu ngay">
        <i class="fa fa-play" aria-hidden="true"></i>
      </button>
    </td>
    <td>
      <router-link
        :to="{ name: 'Questions', params: { quiz_id: this.quiz._id } }"
      >
        <h6 v-if="quiz.quiz_trash" class="mb-0 text-uppercase">[Deleted]</h6>
        {{ quiz.quiz_title }}
      </router-link>
    </td>
    <td>
      {{ quiz.quiz_desc }}
    </td>
    <td>
      <button
        @click="onClickEdit"
        type="button"
        class="btn btn-primary btn-sm mb-2"
        title="Sửa"
      >
        <i class="fa fa-pencil-square" aria-hidden="true"></i>
      </button>
      <button
        @click="onClickDelete"
        type="button"
        class="btn btn-danger btn-sm mb-2"
        title="Xóa"
      >
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { deleteQuiz } from "@models/quizzes.firebase";
export default {
  props: {
    quiz: {
      type: Object,
      default: () => ({ _id: "", quiz_title: "", quiz_desc: "" }),
    },
  },
  methods: {
    onClickEdit() {
      this.$router.push({
        name: "Questions",
        params: { quiz_id: this.quiz._id },
      });
    },
    onClickDelete() {
      const textConfirm = this.$store.state.string.CONFIG_DELETE_VALUES;
      if (confirm(textConfirm))
        this.$store.dispatch("actAsyncLoading", this.onDeleteQuiz);
    },
    async onDeleteQuiz() {
      const item = await deleteQuiz(this.quiz._id);
      if (item) {
        await this.$store.dispatch("actLoadQuizzes");
        this.$toast.success(this.$store.state.string.DELETE_VALUES_SUCCESS);
      }
    },
  },
};
</script>
