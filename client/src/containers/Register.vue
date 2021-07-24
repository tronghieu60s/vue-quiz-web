<template>
  <register @onSubmit="onSubmit" />
</template>

<script>
import Register from "@components/Auth/Register";
import bcrypt from "bcryptjs";
import { getUserByUsername, createUser } from "@models/usersModel";

export default {
  components: { Register },
  methods: {
    async onSubmit(args) {
      this.$store.commit("setIsLoadingAction", true);

      const { username, password } = args;
      const getItem = await getUserByUsername({ user_username: username });
      if (getItem) {
        return this.$toast.error(
          this.$store.state.string.E_ALERT_USERNAME_EXISTS
        );
      }

      /* create user with password hashed */
      const hashPassword = bcrypt.hashSync(password, 10);
      const createItem = await createUser({
        user_username: username,
        user_password: hashPassword,
      });
      if (!createItem) {
        return this.$toast.error(
          this.$store.state.string.E_UNKNOWN_ERROR_DETECT
        );
      }

      /*  if ok toast successs for user then redirect to login pages */
      this.$toast.success(this.$store.state.string.S_CREATE_ACCOUNT_SUCCESS);
      this.$router.push({ name: "Login" });

      this.$store.commit("setIsLoadingAction", false);
    },
  },
};
</script>
