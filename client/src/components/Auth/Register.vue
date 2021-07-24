<template>
  <auth>
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
  </auth>
</template>

<script>
import Auth from "./index";
export default {
  components: { Auth },
  emits: ["onSubmit"],
  data() {
    return { inputUsername: "", inputPassword: "", inputRePassword: "" };
  },
  methods: {
    onSubmit() {
      if (!new RegExp(/^[a-zA-Z0-9]{6,}$/).test(this.inputUsername)) return;
      if (this.inputPassword.length === 0) return;
      if (this.inputPassword !== this.inputRePassword)
        return this.$toast.error(this.$store.state.string.E_PASSWORD_NOT_MATCH);
      const { inputUsername: username, inputPassword: password } = this;
      this.$emit("onSubmit", { username, password });
    },
  },
};
</script>
