<template>
  <div class="col-12 py-5 my-5" style="min-height: 50vh">
    <h2 class="w-75 w-lg-50 text-center mb-4 mx-auto bg-secondary p-3 rounded">
      {{
        playersOnline.length === 0
          ? "Sử dụng mã code phía trên để mời mọi người tham gia :3"
          : `Đang có ${playersOnline.length} người tham gia. Bạn có thể bắt đầu bất cứ lúc nào!`
      }}
    </h2>
    <div class="d-flex justify-content-center flex-wrap">
      <button
        v-for="(player, index) in playersOnline"
        v-show="player.player_online"
        :key="index"
        @click="$emit('onKickPlayer', index)"
        type="button"
        class="btn btn-primary mb-2"
      >
        <span>{{ player.player_username }}</span>
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["onKickPlayer"],
  props: { players: { type: Array }, playersOnline: { type: Array } },
};
</script>

<style scoped>
.btn.btn-primary:hover {
  text-decoration: line-through;
}
</style>
