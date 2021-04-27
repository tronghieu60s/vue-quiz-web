<template>
  <form @submit.prevent="onSubmit">
    <h3 class="text-center mb-3">Thêm Quiz Mới</h3>
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <h4 class="text-capitalize">Tiêu Đề</h4>
      </div>
      <input
        v-model="inputTitle"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Nhập tiêu đề vào đây..."
        required
      />
    </div>
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <h4 class="text-capitalize">Mô tả</h4>
      </div>
      <textarea
        v-model="inputDesc"
        class="form-control"
        rows="5"
        placeholder="Nhập mô tả vào đây..."
      ></textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button @click="onReset" type="button" class="btn btn-danger btn-sm">
        Reset
      </button>
      <button type="submit" class="btn btn-primary btn-sm">
        Thêm Quiz Mới
      </button>
    </div>
  </form>
</template>

<script>
import { createQuiz } from "@models/quizzes.firebase";
export default {
  data() {
    return {
      inputTitle: "",
      inputDesc: "",
    };
  },
  methods: {
    onReset() {
      this.inputTitle = "";
      this.inputDesc = "";
    },
    onSubmit() {
      if (this.inputTitle === "") return;
      this.$store.dispatch("actAsyncLoading", this.onCreateQuiz);
    },
    async onCreateQuiz() {
      const { inputTitle: quiz_title, inputDesc: quiz_desc } = this;

      const quiz = await createQuiz({ quiz_title, quiz_desc });
      if (!quiz) return;

      const { quizzes } = this.$store.state;
      this.$store.commit("setQuizzes", [...quizzes, quiz]);
      this.onReset();
    },
  },
};
</script>
