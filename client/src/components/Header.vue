<template>
  <div class="d-flex justify-content-between py-4 pb-5">
    <div class="mt-3">
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
    <div class="mt-2 w-50 d-flex justify-content-end align-items-center">
      <div>
        <button @click="onLogout" type="button" class="btn btn-danger btn-sm">
          Đăng Xuất <i class="fa fa-sign-out ml-1" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    onLogout() {
      localStorage.removeItem(".config_user");
      this.$router.push({ name: "Login" });
      this.$toast.success(this.$store.state.string.S_LOGOUT_ACCOUNT_SUCCESS);
    },
  },
};
</script>
