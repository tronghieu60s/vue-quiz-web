<template>
  <firework v-show="answerStatus === 'correct'" />
  <h1
    v-if="result"
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
  data() {
    return {
      answerStatus: null,
    };
  },
  props: {
    answer: { type: Object },
    result: { type: String },
  },
  watch: {
    result() {
      if (!this.answer) return (this.answerStatus = "nochoose");
      if (this.result === this.answer.answer_content)
        return (this.answerStatus = "correct");
      this.answerStatus = "incorrect";
    },
  },
};
</script>
