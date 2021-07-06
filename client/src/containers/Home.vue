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
    return { inputCode: "", player_username: "" };
  },
  created() {
    this.onLoadSocket();
  },
  methods: {
    onLoadSocket() {
      this.$store.state.socket.on("server-username-exists", () =>
        this.$toast.error(this.$store.state.string.E_ALERT_USERNAME_EXISTS)
      );

      this.$store.state.socket.on("server-username-not-exists", () => {
        const quiz_code = this.inputCode;
        const player_username = this.player_username;

        // set player to storage
        let storage = {};
        try {
          storage = jwt.verify(
            localStorage.getItem("quizPlayer"),
            this.$store.state.jwtToken
          );
        } catch (err) {
          localStorage.removeItem("quizPlayer");
        }
        storage[quiz_code] = player_username;
        const tokenStorage = jwt.sign(storage, this.$store.state.jwtToken);
        localStorage.setItem("quizPlayer", tokenStorage);

        // redirect to room
        const params = { quiz_code, player_username };
        this.$router.push({ name: "JoinRoom", params });
      });
    },
    onSubmit() {
      this.$store.dispatch("actLoadingAction", async () => {
        const quiz_code = this.inputCode;
        // get quiz by quiz code
        const quizItem = await getQuizByQuizCode({ quiz_code });
        if (!quizItem) {
          return this.$toast.error(this.$store.state.string.E_NOT_FOUND_QUIZ);
        }

        // catch user already exists on quiz
        try {
          const storage = jwt.verify(
            localStorage.getItem("quizPlayer"),
            this.$store.state.jwtToken
          );
          if (storage[quiz_code]) {
            const params = { quiz_code, username: storage[quiz_code] };
            return this.$router.push({ name: "JoinRoom", params });
          }
        } catch (err) {
          localStorage.removeItem("quizPlayer");
        }

        // quiz running not access new user
        if (quizItem.quiz_current > 0) {
          return this.$toast.error(this.$store.state.string.E_QUIZ_IS_RUNNING);
        }

        // input username and send to user
        const player_username = prompt("Nhập tên của bạn để tiếp tục.");
        if (player_username === null) return;
        if (!new RegExp(/^[a-zA-Z0-9]+$/).test(player_username)) {
          return alert(this.$store.state.string.E_USERNAME_NOT_ALLOW);
        }

        this.player_username = player_username;
        // send username to server
        const payload = { player_username, quiz_code };
        this.$store.state.socket.emit("client-register-room", payload);
      });
    },
  },
};
</script>
