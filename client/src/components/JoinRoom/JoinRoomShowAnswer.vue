<template>
  <firework v-show="answerStatus === 'correct'" />
  <h1
    :class="{
      'text-success': answerStatus === 'correct',
      'text-danger': answerStatus === 'incorrect',
      'text-warning': answerStatus === 'nochoose',
      'text-center': true,
    }"
  >
    {{ answerStatus === "correct" ? "✔️ Chính Xác" : "" }}
    {{ answerStatus === "incorrect" ? "❌ Sai Mất Rồi" : "" }}
    {{ answerStatus === "nochoose" ? "🤔 Bạn Chưa Chọn Đáp Án Nào" : "" }}
  </h1>
</template>

<script>
import Firework from "@components/UI/Firework.vue";

export default {
  components: { Firework },
  props: {
    answerStatus: { type: String },
  },
};
</script>
