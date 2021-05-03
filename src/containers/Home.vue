<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <form @submit.prevent="onSubmit">
      <div
        class="form-group border border-primary rounded px-3 py-4"
        style="width: 350px"
      >
        <input
          v-model.trim="inputCode"
          type="text"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập mã cuộc thi..."
          required
        />
        <small id="helpId" class="form-text text-muted mt-2"
          >Nhập mã cuộc thi để tham gia các câu hỏi trực tuyến cùng chúng
          tôi.</small
        >
        <button type="submit" class="btn btn-primary btn-block mt-2">
          Tham Gia
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { getQuizByQuizCode } from "@models/quizzes.firebase";
export default {
  data() {
    return {
      inputCode: "",
      userName: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("actLoadingAction", async () => {
        const quizItem = await getQuizByQuizCode(this.inputCode);
        if (!quizItem)
          return this.$toast.error(this.$store.state.string.E_NOT_FOUND_QUIZ);

        const userName = prompt("Nhập tên của bạn để tiếp tục.");
        this.userName = userName;
        console.log(userName);
      });
    },
  },
};
</script>
