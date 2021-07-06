<template>
  <button
    @click="$emit('onKickPlayer')"
    type="button"
    class="btn btn-primary mb-2"
  >
    <span>{{ player }}</span>
    <i class="fa fa-times-circle" aria-hidden="true"></i>
  </button>
</template>

<script>
export default {
  emits: ["onKickPlayer"],
  props: { player: { type: String } },
};
</script>

<style scoped>
.btn.btn-primary:hover {
  text-decoration: line-through;
}
</style>
