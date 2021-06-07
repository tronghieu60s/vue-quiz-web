<template>
  <div class="lds-wrapper">
    <loading-action-icon />
  </div>
</template>

<script>
import LoadingActionIcon from "./LoadingActionIcon.vue";
export default {
  components: { LoadingActionIcon },
};
</script>

<style scoped>
.lds-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffc;
}
</style>
