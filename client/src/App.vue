<template>
  <loading-page v-if="$store.state.isLoadingPage" />
  <loading-action v-show="$store.state.isLoadingAction" />
  <router-view v-if="!$store.state.isLoadingPage" />
</template>

<script>
import jwt from "jsonwebtoken";
import LoadingPage from "./components/UI/LoadingPage.vue";
import LoadingAction from "./components/UI/LoadingAction.vue";
import router from "./router/index";
import { socketConnect } from "./store/socket";
export default {
  components: { LoadingPage, LoadingAction },
  created() {
    this.$store.dispatch("actLoadingPage", async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // socket connect
      const socket = await socketConnect();
      this.$store.state.socket = socket;

      // load user storage
      this.$store.state.user = await this.actLoadUserStorage();

      this.onRedirectPermission();
    });
  },
  watch: {
    "$store.state.user"() {
      this.onRedirectPermission();
    },
    $route() {
      this.onRedirectPermission();
    },
  },
  methods: {
    onRedirectPermission() {
      const currentPath = router.currentRoute.value.path;
      if (currentPath.indexOf("/admin") === 0 && !this.$store.state.user)
        router.push({ name: "Login" });
      if (currentPath.indexOf("/auth") === 0 && this.$store.state.user)
        router.push({ name: "Admin" });
    },
    async actLoadUserStorage() {
      const token = localStorage.getItem(".config_user");
      return new Promise((resolve) => {
        jwt.verify(token, this.$store.state.jwtToken, (err, decoded) => {
          if (err) resolve(null);
          if (decoded) resolve(decoded);
        });
      });
    },
  },
};
</script>
