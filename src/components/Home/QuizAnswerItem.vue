<template>
  <button
    type="button"
    :class="[
      `btn ${color} btn-block m-0 py-5 mb-3 mx-2`,
      [isDisable && 'btn-dark'],
    ]"
    style="width: 44%"
  >
    <div :class="['w-75 mx-auto', [isDisable && 'del']]">
      <img :src="icon" style="width: 20px" />
      {{ answer.answer }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    index: { type: Number },
    answer: { type: Object },
    showResult: { type: Boolean },
  },
  data() {
    return {
      color: "",
      icon: "",
    };
  },
  created() {
    switch (this.index) {
      case 0:
        this.color = "btn-primary";
        this.icon = "/assets/images/circle.svg";
        break;
      case 1:
        this.color = "btn-success";
        this.icon = "/assets/images/rectangle.svg";
        break;
      case 2:
        this.color = "btn-danger";
        this.icon = "/assets/images/hexagon.svg";
        break;
      case 3:
        this.color = "btn-warning";
        this.icon = "/assets/images/triangle.svg";
        break;
      default:
        break;
    }
  },
  computed: {
    isDisable() {
      return this.showResult && !this.answer.isCorrect;
    },
  },
};
</script>
