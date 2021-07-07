<template>
  <layout-center>
    <form @submit.prevent="onSubmit" class="form-responsive">
      <h1 class="text-center mb-4">Đăng Nhập</h1>
      <div class="form-group mb-3">
        <h4 class="text-capitalize">Tên đăng nhập</h4>
        <input
          v-model.trim="inputUsername"
          type="text"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập tên đăng nhập vào đây..."
          required
        />
      </div>
      <div class="form-group mb-1">
        <h4 class="text-capitalize">Mật khẩu</h4>
        <input
          v-model.trim="inputPassword"
          type="password"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập mật khẩu vào đây..."
        />
      </div>
      <small class="mb-2 font-weight-bold">
        Cần một tài khoản?
        <router-link :to="{ name: 'Register' }">Đăng Ký</router-link>.
      </small>
      <button type="submit" class="btn btn-primary btn-block mt-3">
        Tham Gia
      </button>
    </form>
  </layout-center>
</template>

<script>
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import LayoutCenter from "../components/Layout/LayoutCenter.vue";
import { getUserByUsername } from "@models/usersModel";

export default {
  components: { LayoutCenter },
  data() {
    return { inputUsername: "", inputPassword: "" };
  },
  methods: {
    onSubmit() {
      if (this.inputUsername.length === 0) return;
      this.$store.dispatch("actLoadingAction", async () => {
        /* get user by username */
        const user_username = this.inputUsername.toLowerCase();
        const getItem = await getUserByUsername({ user_username });
        if (!getItem)
          return this.$toast.error(
            this.$store.state.string.E_ACCOUNT_NOT_MATCH
          );

        bcrypt.compare(
          this.inputPassword,
          getItem.user_password,
          (err, res) => {
            /* bcrypt password log to user if error or password not match
            if user match then save to storage and set to vue store
            log success to user */
            if (err)
              return this.$toast.error(
                this.$store.state.string.E_UNKNOWN_ERROR_DETECT
              );
            if (!res)
              return this.$toast.error(
                this.$store.state.string.E_ACCOUNT_NOT_MATCH
              );

            const token = jwt.sign(getItem, this.$store.state.jwtToken);
            localStorage.setItem("quizLogin", token);

            this.$store.state.user = getItem;
            this.$toast.success(
              this.$store.state.string.S_LOGIN_ACCOUNT_SUCCESS
            );
          }
        );
      });
    },
  },
};
</script>
