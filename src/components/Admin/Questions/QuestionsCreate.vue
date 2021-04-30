<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <h4 class="text-capitalize">Câu Hỏi</h4>
        <h5>-MHy7D3tBEwpbOAKAIMU</h5>
      </div>
      <textarea
        v-model="inputQuestion"
        class="form-control"
        rows="3"
        placeholder="Nhập câu hỏi vào đây..."
        required
      ></textarea>
    </div>
    <div class="form-group">
      <h4 class="text-capitalize">Câu Trả Lời</h4>
      <questions-input-answer
        v-for="(input, index) in inputAnswer"
        :key="index"
        :input="{ ...input, index }"
        @onInputAnswer="onInputAnswer"
        @toggleIsCorrect="toggleIsCorrect(index)"
      >
      </questions-input-answer>
    </div>
    <div class="d-flex justify-content-end">
      <button @click="onReset" type="button" class="btn btn-danger btn-sm">
        Reset
      </button>
      <button type="submit" class="btn btn-warning btn-sm">Sửa Câu Hỏi</button>
      <button type="submit" class="btn btn-primary btn-sm">Thêm Câu Hỏi</button>
    </div>
  </form>
</template>

<script>
import QuestionsInputAnswer from "./QuestionsInputAnswer.vue";
import { createQuestion } from "@models/questions.firebase";
export default {
  components: { QuestionsInputAnswer },
  data() {
    return {
      inputQuestion: "",
      inputAnswer: [
        {
          value: "",
          isCorrect: true,
          icon: "/assets/images/circle.svg",
          color: "bg-primary",
        },
        {
          value: "",
          isCorrect: false,
          icon: "/assets/images/rectangle.svg",
          color: "bg-success",
        },
        {
          value: "",
          isCorrect: false,
          icon: "/assets/images/hexagon.svg",
          color: "bg-danger",
        },
        {
          value: "",
          isCorrect: false,
          icon: "/assets/images/triangle.svg",
          color: "bg-warning",
        },
      ],
    };
  },
  methods: {
    onInputAnswer(props) {
      const { index, value } = props;
      this.inputAnswer[index].value = value;
    },
    toggleIsCorrect(index) {
      this.inputAnswer = this.inputAnswer.map((o) => ({
        ...o,
        isCorrect: false,
      }));
      this.inputAnswer[index].isCorrect = !this.inputAnswer[index].isCorrect;
    },
    onReset() {
      this.inputQuestion = "";
      this.inputAnswer = [
        {
          value: "",
          isCorrect: true,
          icon: "/assets/images/circle.svg",
          color: "bg-primary",
        },
        {
          value: "",
          isCorrect: false,
          icon: "/assets/images/rectangle.svg",
          color: "bg-success",
        },
        {
          value: "",
          isCorrect: false,
          icon: "/assets/images/hexagon.svg",
          color: "bg-danger",
        },
        {
          value: "",
          isCorrect: false,
          icon: "/assets/images/triangle.svg",
          color: "bg-warning",
        },
      ];
    },
    onSubmit() {
      if (this.inputQuestion.length === 0) return;
      const hasAnswer = this.inputAnswer.find((o) => o.value.length > 0);
      if (!hasAnswer) {
        this.$toast.error(this.$store.state.string.D_AT_LEAST_ONE_ANSWER);
        return;
      }

      this.$store.dispatch("actAsyncLoading", this.onCreateQuestion);
    },
    async onCreateQuestion() {
      const answers = this.inputAnswer.map((o) => ({
        answer: o.value,
        isCorrect: o.isCorrect,
      }));
      const newQuestion = { question: this.inputQuestion, answers };
      const question = await createQuestion(newQuestion);
      if (question) {
        this.$toast.success(this.$store.state.string.ADD_VALUES_SUCCESS);
      }
    },
  },
};
</script>
