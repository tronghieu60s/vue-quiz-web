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
import LayoutCenter from "../components/Layout/LayoutCenter.vue";
export default {
  components: { LayoutCenter },
  data() {
    return {
      inputUsername: "",
      inputPassword: "",
    };
  },
};
</script>
