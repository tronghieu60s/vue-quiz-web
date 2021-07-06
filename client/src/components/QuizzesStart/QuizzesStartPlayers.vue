<template>
  <div class="col-12 py-5 my-5" style="min-height: 50vh">
    <h2 class="w-75 w-lg-50 text-center mb-4 mx-auto bg-secondary p-3">
      {{
        players.length === 0
          ? "Sử dụng mã code phía trên để mời mọi người tham gia :3"
          : `Đang có ${players.length} người tham gia. Bạn có thể bắt đầu bất cứ lúc nào!`
      }}
    </h2>
    <div class="d-flex justify-content-center flex-wrap">
      <quizzes-start-players-item
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        @onKickPlayer="$emit('onKickPlayer', index)"
      />
    </div>
  </div>
</template>

<script>
import QuizzesStartPlayersItem from "./QuizzesStartPlayersItem.vue";
export default {
  components: { QuizzesStartPlayersItem },
  emits: ["onKickPlayer"],
  props: { players: { type: Array } },
};
</script>
