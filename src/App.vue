<template>
  <loading-page v-if="$store.state.isLoadingPage" />
  <loading-action v-show="$store.state.isLoadingAction" />
  <router-view v-if="!$store.state.isLoadingPage" />
</template>

<script>
import LoadingPage from "./components/UI/LoadingPage.vue";
import LoadingAction from "./components/UI/LoadingAction.vue";
export default {
  components: { LoadingPage, LoadingAction },
  beforeMount() {
    this.$store.dispatch("actLoadFirst");
  },
};
</script>
