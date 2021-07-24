<template>
  <login @onSubmit="onSubmit" />
</template>

<script>
import { getUserByUsername } from "@models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Login from "@components/Auth/Login.vue";

export default {
  components: { Login },
  methods: {
    async onSubmit(args) {
      this.$store.commit("setIsLoadingAction", true);

      const { username, password } = args;
      const getUser = await getUserByUsername({ user_username: username });
      if (!getUser) {
        return this.$toast.error(this.$store.state.string.E_ACCOUNT_NOT_MATCH);
      }

      /* compare password to server */
      const compare = bcrypt.compareSync(password, getUser.user_password);
      if (!compare) {
        return this.$toast.error(this.$store.state.string.E_ACCOUNT_NOT_MATCH);
      }

      /* set user to storage and set to local user */
      const token = jwt.sign(getUser, this.$store.state.jwtToken);
      localStorage.setItem("quizLogin", token);

      this.$store.state.user = getUser;
      this.$toast.success(this.$store.state.string.S_LOGIN_ACCOUNT_SUCCESS);

      this.$store.commit("setIsLoadingAction", false);
    },
  },
};
</script>
