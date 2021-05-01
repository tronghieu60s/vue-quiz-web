<template>
  <div class="d-flex align-items-center mb-2">
    <div
      :class="{ 'd-flex rounded py-1 px-2 mr-2': true, [color]: true }"
      style="height: 30px"
    >
      <img style="width: 13px" :src="icon" />
    </div>
    <input
      @input="onInputAnswer"
      :value="input.value"
      type="text"
      class="form-control"
      aria-describedby="helpId"
      placeholder="Nhập câu trả lời..."
    />
    <button
      type="button"
      @click="this.$emit('toggleIsCorrect')"
      :class="stylesButtonIsCorrect"
    >
      <i :class="stylesIconIsCorrect" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    input: {
      type: Object,
      default: () => ({
        value: "",
        isCorrect: false,
      }),
    },
  },
  emits: ["onInputAnswer", "toggleIsCorrect"],
  data() {
    return {
      icon: "",
      color: "",
    };
  },
  beforeMount() {
    switch (this.index) {
      case 0:
        this.icon = "/assets/images/circle.svg";
        this.color = "bg-primary";
        break;
      case 1:
        this.icon = "/assets/images/rectangle.svg";
        this.color = "bg-success";
        break;
      case 2:
        this.icon = "/assets/images/hexagon.svg";
        this.color = "bg-danger";
        break;
      case 3:
        this.icon = "/assets/images/triangle.svg";
        this.color = "bg-warning";
        break;
      default:
        break;
    }
  },
  computed: {
    stylesIconIsCorrect() {
      return {
        "fa fa-check-square": true,
        "text-secondary": this.input.isCorrect,
      };
    },
    stylesButtonIsCorrect() {
      return {
        "btn btn-sm mx-2": true,
        "btn-success": this.input.isCorrect,
        "btn-secondary": !this.input.isCorrect,
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
