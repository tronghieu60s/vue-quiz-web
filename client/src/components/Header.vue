<template>
  <div class="row py-4 pb-5">
    <div class="col-md-6 mt-3">
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
    <div class="col-md-6 mt-2">
      <div
        :class="{
          'h-100 d-flex align-items-center': true,
          'justify-content-start justify-content-md-end': true,
        }"
      >
        <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#modelUpdateUser"
        >
          <i class="fa fa-user" aria-hidden="true"></i>
          {{ $store.state.user ? $store.state.user.user_username : "" }}
        </button>
        <div
          class="modal fade"
          id="modelUpdateUser"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <form @submit.prevent="onSubmit" class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Đổi Mật Khẩu</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize">Mật khẩu cũ</h4>
                  </div>
                  <input
                    v-model="inputOldPass"
                    type="password"
                    class="form-control"
                    aria-describedby="helpId"
                    placeholder="Nhập mật khẩu cũ vào đây..."
                    required
                  />
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize">Mật khẩu Mới</h4>
                  </div>
                  <input
                    v-model="inputNewPass"
                    type="password"
                    class="form-control"
                    aria-describedby="helpId"
                    placeholder="Nhập mật khẩu mới vào đây..."
                    required
                  />
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize">Nhập lại mật khẩu mới</h4>
                  </div>
                  <input
                    v-model="inputReNewPass"
                    type="password"
                    class="form-control"
                    aria-describedby="helpId"
                    placeholder="Nhập lại mật khẫu vào đây..."
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        </div>
        <button @click="onLogout" type="button" class="btn btn-danger btn-sm">
          Đăng Xuất <i class="fa fa-sign-out ml-1" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { updateUserById } from "@models/users.firebase";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputOldPass: "",
      inputNewPass: "",
      inputReNewPass: "",
    };
  },
  methods: {
    onReset() {
      this.inputOldPass = "";
      this.inputNewPass = "";
      this.inputReNewPass = "";
    },
    onLogout() {
      localStorage.removeItem(".config_user");
      this.$store.state.user = null;
      this.$toast.success(this.$store.state.string.S_LOGOUT_ACCOUNT_SUCCESS);
    },
    onSubmit() {
      if (this.inputNewPass !== this.inputReNewPass)
        return this.$toast.error(this.$store.state.string.E_PASSWORD_NOT_MATCH);
      this.$store.dispatch("actLoadingAction", this.onChangePass);
    },
    async onChangePass() {
      const { _id, user_password } = this.$store.state.user;
      const decoded = await bcrypt
        .compare(this.inputOldPass, user_password)
        .then((res) => res);
      if (!decoded)
        return this.$toast.error(
          this.$store.state.string.E_PASSWORD_NOT_CORRECT
        );

      const hash = bcrypt.hashSync(this.inputNewPass, 10);
      const updateUser = await updateUserById(_id, { user_password: hash });
      if (!updateUser)
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );

      // update user to state and storage
      this.$store.state.user = updateUser;
      const token = jwt.sign(updateUser, this.$store.state.jwtToken);
      localStorage.setItem(".config_user", token);

      // toast and reset
      this.$toast.success(this.$store.state.string.S_CHANGE_PASS_SUCCESS);
      this.onReset();
    },
  },
};
</script>
