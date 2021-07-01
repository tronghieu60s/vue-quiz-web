<template>
  <layout-center>
    <form @submit.prevent="onSubmit" class="form-responsive">
      <h1 class="text-center mb-4">Đăng Ký</h1>
      <div class="form-group mb-3">
        <h4 class="text-capitalize">Tên đăng nhập</h4>
        <input
          v-model.trim="inputUsername"
          type="text"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập tên đăng nhập vào đây..."
          pattern="[A-Za-z0-9]{6,}"
          required
          title="Tên đăng nhập phải có ít nhất 6 ký tự, chỉ có chữ cái và số. Không chứa khoảng trắng và các ký tự đặc biệt."
        />
      </div>
      <div class="form-group mb-3">
        <h4 class="text-capitalize">Mật khẩu</h4>
        <input
          v-model.trim="inputPassword"
          type="password"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập mật khẩu vào đây..."
          required
        />
      </div>
      <div class="form-group mb-1">
        <h4 class="text-capitalize">Nhập Lại Mật khẩu</h4>
        <input
          v-model.trim="inputRePassword"
          type="password"
          class="form-control"
          aria-describedby="helpId"
          placeholder="Nhập mật khẩu vào đây..."
        />
      </div>
      <small class="mb-2 font-weight-bold">
        <router-link :to="{ name: 'Login' }">Bạn đã có tài khoản?</router-link>
      </small>
      <button type="submit" class="btn btn-primary btn-block mt-3">
        Đăng Ký
      </button>
    </form>
  </layout-center>
</template>

<script>
import bcrypt from "bcryptjs";
import LayoutCenter from "../components/Layout/LayoutCenter.vue";
import { getUserByUsername, createUser } from "@models/usersModel";

export default {
  components: { LayoutCenter },
  data() {
    return {
      inputUsername: "",
      inputPassword: "",
      inputRePassword: "",
    };
  },
  methods: {
    onSubmit() {
      if (!new RegExp(/^[a-zA-Z0-9]{6,}$/).test(this.inputUsername)) return;
      if (this.inputPassword.length === 0) return;
      if (this.inputPassword !== this.inputRePassword)
        return this.$toast.error(this.$store.state.string.E_PASSWORD_NOT_MATCH);

      this.$store.dispatch("actLoadingAction", this.onRegisterUser);
    },
    async onRegisterUser() {
      const user_username = this.inputUsername.toLowerCase();
      const user_password = bcrypt.hashSync(this.inputPassword, 10);

      const getItem = await getUserByUsername({ user_username });
      if (getItem)
        return this.$toast.error(
          this.$store.state.string.E_ALERT_USERNAME_EXISTS
        );

      const createItem = await createUser({ user_username, user_password });
      if (!createItem)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      this.$toast.success(this.$store.state.string.S_CREATE_ACCOUNT_SUCCESS);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
