<template>
  <loading-page v-if="$store.state.isLoadingPage" />
  <loading-action v-show="$store.state.isLoadingAction" />
  <router-view v-if="!$store.state.isLoadingPage" />
</template>

<script>
import LoadingPage from "./components/UI/LoadingPage.vue";
import LoadingAction from "./components/UI/LoadingAction.vue";
import router from "./router/index";
export default {
  components: { LoadingPage, LoadingAction },
  created() {
    this.$store.dispatch("actLoadingPage");
  },
  watch: {
    "$store.state.user"() {
      const currentPath = router.currentRoute.value.path;
      if (currentPath.indexOf("/admin") === 0 && !this.$store.state.user)
        router.push({ name: "Login" });
      if (currentPath.indexOf("/auth") === 0 && this.$store.state.user)
        router.push({ name: "Admin" });
    },
  },
};
</script>
