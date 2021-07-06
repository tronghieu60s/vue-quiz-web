<template>
  <h1 class="mb-0">{{ player_username }}</h1>
  <div class="bg-danger text-white font-weight-bold rounded-lg px-3 py-1">
    790
  </div>
  <div>
    <button
      @click="$emit('onOutRoom')"
      type="button"
      class="btn btn-default btn-sm"
    >
      Rời Khỏi Phòng
      <i class="fa fa-arrow-right" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["onOutRoom"],
  props: {
    player_username: { type: String },
  },
};
</script>
