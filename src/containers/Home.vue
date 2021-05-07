<template>
  <div class="container">
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <form @submit.prevent="onSubmit">
        <div class="form-group" style="width: 350px">
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
  </div>
</template>

<script>
import { getQuizByQuizCode } from "@models/quizzes.firebase";
export default {
  data() {
    return {
      inputCode: "",
    };
  },
  created() {
    this.$store.state.socket.on("server-username-exists", () =>
      this.$toast.error(this.$store.state.string.S_ALERT_USERNAME_EXISTS)
    );

    // CONNECT
    this.$store.state.socket.on("server-register-user-success", (username) => {
      const params = { quiz_code: this.inputCode, username };
      this.$store.commit("setQuizUserStorage", params);
      this.$router.push({ name: "JoinRoom", params });
    });
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("actLoadingAction", async () => {
        const quizItem = await getQuizByQuizCode(this.inputCode);
        if (!quizItem)
          return this.$toast.error(this.$store.state.string.E_NOT_FOUND_QUIZ);

        // catch user already exists on quiz
        const storage = JSON.parse(
          localStorage.getItem(".quiz_config_user") || "{}"
        );
        if (storage[this.inputCode])
          return this.$router.push({
            name: "JoinRoom",
            params: {
              quiz_code: this.inputCode,
              username: storage[this.inputCode],
            },
          });

        // quiz running not access new user
        if (quizItem.quiz_current > 0)
          return this.$toast.error(this.$store.state.string.E_QUIZ_IS_RUNNING);

        // input user name and send to user
        const username = prompt("Nhập tên của bạn để tiếp tục.");
        if (!username) return;

        const payload = { username, quiz_code: quizItem.quiz_code };
        this.$store.state.socket.emit("client-register-user", payload);
      });
    },
  },
};
</script>
