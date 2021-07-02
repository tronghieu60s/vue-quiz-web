<template>
  <div class="d-flex align-items-center mb-2">
    <div :class="stylesButtonIcon" style="height: 30px">
      <img style="width: 13px" :src="icon" />
    </div>
    <input
      :value="input.answer_content"
      :required="input.answer_isCorrect"
      @input="onInputAnswer"
      type="text"
      class="form-control"
      aria-describedby="helpId"
      placeholder="Nhập câu trả lời..."
    />
    <button
      @click="$emit('onToggleIsCorrect')"
      type="button"
      :class="stylesButtonIsCorrect"
    >
      <i :class="stylesIconIsCorrect" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    index: { type: Number },
    input: {
      type: Object,
      default: () => ({ answer_content: "", answer_isCorrect: false }),
    },
  },
  emits: ["onInputAnswer", "onToggleIsCorrect"],
  data() {
    return {
      icon: "",
      color: "",
    };
  },
  created() {
    switch (this.index) {
      case 0:
        this.icon = "/images/circle.svg";
        this.color = "bg-primary";
        break;
      case 1:
        this.icon = "/images/rectangle.svg";
        this.color = "bg-success";
        break;
      case 2:
        this.icon = "/images/hexagon.svg";
        this.color = "bg-danger";
        break;
      case 3:
        this.icon = "/images/triangle.svg";
        this.color = "bg-warning";
        break;
      default:
        break;
    }
  },
  computed: {
    stylesButtonIcon() {
      return {
        "d-flex rounded py-1 px-2 mr-2": true,
        [this.color]: true,
      };
    },
    stylesIconIsCorrect() {
      return {
        "fa fa-check-square": true,
        "text-secondary": this.input.answer_isCorrect,
      };
    },
    stylesButtonIsCorrect() {
      return {
        "btn btn-sm mx-2": true,
        "btn-success": this.input.answer_isCorrect,
        "btn-secondary": !this.input.answer_isCorrect,
      };
    },
  },
  methods: {
    onInputAnswer(event) {
      const value = event.target.value;
      this.$emit("onInputAnswer", { index: this.index, value });
    },
  },
};
</script>
