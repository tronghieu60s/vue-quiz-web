<template>
  <layout-center>
    <bubbles />
    <form @submit.prevent="onSubmit" class="form-responsive bg-secondary">
      <div class="form-group mb-1">
        <input
          v-model.trim="inputCode"
          type="text"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập mã cuộc thi..."
          required
        />
      </div>
      <small class="form-text text-muted">
        Nhập mã cuộc thi để tham gia các câu hỏi trực tuyến cùng chúng tôi.
      </small>
      <button type="submit" class="btn btn-primary btn-block mt-3">
        Tham Gia
      </button>
    </form>
  </layout-center>
</template>

<script>
import jwt from "jsonwebtoken";
import { getQuizByQuizCode } from "@models/quizzesModel";
import LayoutCenter from "@components/Layout/LayoutCenter.vue";
import Bubbles from "@components/UI/Bubbles.vue";
export default {
  components: { LayoutCenter, Bubbles },
  data() {
    return {
      inputCode: "",
    };
  },
  created() {
    this.$store.state.socket.on("server-username-exists", () =>
      this.$toast.error(this.$store.state.string.E_ALERT_USERNAME_EXISTS)
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
        const quizItem = await getQuizByQuizCode({ quiz_code: this.inputCode });
        if (!quizItem)
          return this.$toast.error(this.$store.state.string.E_NOT_FOUND_QUIZ);

        // catch user already exists on quiz
        try {
          const storage = jwt.verify(
            localStorage.getItem("quizPlayer"),
            this.$store.state.jwtToken
          );
          if (storage[this.inputCode])
            return this.$router.push({
              name: "JoinRoom",
              params: {
                quiz_code: this.inputCode,
                username: storage[this.inputCode],
              },
            });
        } catch (err) {
          localStorage.removeItem("quizPlayer");
        }

        // quiz running not access new user
        if (quizItem.quiz_current > 0)
          return this.$toast.error(this.$store.state.string.E_QUIZ_IS_RUNNING);

        // input user name and send to user
        const username = prompt("Nhập tên của bạn để tiếp tục.");
        if (username === null) return;
        if (!new RegExp(/^[a-zA-Z0-9]+$/).test(username))
          return alert(this.$store.state.string.E_USERNAME_NOT_ALLOW);

        const payload = { username, quiz_code: quizItem.quiz_code };
        this.$store.state.socket.emit("client-register-user", payload);
      });
    },
  },
};
</script>
