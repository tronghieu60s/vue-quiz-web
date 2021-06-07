<template>
  <button
    @click="$emit('onKickUser')"
    type="button"
    class="btn btn-primary mb-2"
  >
    <span>{{ user }}</span>
    <i class="fa fa-times-circle" aria-hidden="true"></i>
  </button>
</template>

<script>
export default {
  emits: ["onKickUser"],
  props: { user: { type: String } },
};
</script>

<style scoped>
.btn.btn-primary:hover {
  text-decoration: line-through;
}
</style>
