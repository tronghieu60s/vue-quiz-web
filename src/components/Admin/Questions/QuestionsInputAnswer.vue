<template>
  <div class="d-flex align-items-center mb-2">
    <div
      :class="{ 'd-flex rounded py-1 px-2 mr-2': true, [input.color]: true }"
      style="height: 30px"
    >
      <img style="width: 13px" :src="input.icon" />
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
    input: {
      type: Object,
      default: () => ({
        index: -1,
        value: "",
        isCorrect: false,
        icon: "",
        color: "",
      }),
    },
  },
  emits: ["onInputAnswer", "toggleIsCorrect"],
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
      this.$emit("onInputAnswer", { index: this.input.index, value });
    },
  },
};
</script>
