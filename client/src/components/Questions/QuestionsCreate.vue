<template>
  <form @submit.prevent="onSubmit">
    <h4 class="text-center bg-primary rounded mb-4 py-2" style="color: #f6f9fc">
      Thêm Câu Hỏi Mới
    </h4>
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <h4 class="text-capitalize">Câu Hỏi</h4>
        <h5>{{ this.question ? this.question._id : "" }}</h5>
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
        :input="input"
        :index="index"
        @onInputAnswer="onInputAnswer"
        @onToggleIsCorrect="onToggleIsCorrect(index)"
      >
      </questions-input-answer>
    </div>
    <div class="d-flex justify-content-end">
      <button @click="onReset" type="button" class="btn btn-danger btn-sm">
        Reset
      </button>
      <button v-if="question" type="submit" class="btn btn-warning btn-sm">
        Sửa Câu Hỏi
      </button>
      <button v-if="!question" type="submit" class="btn btn-primary btn-sm">
        Thêm Câu Hỏi
      </button>
    </div>
  </form>
</template>

<script>
import QuestionsInputAnswer from "./QuestionsInputAnswer.vue";
export default {
  components: { QuestionsInputAnswer },
  props: ["question"],
  emits: ["onResetSelected", "onActionQuestion"],
  data() {
    return {
      inputQuestion: "",
      inputAnswer: [
        {
          answer: "",
          isCorrect: true,
        },
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
      ],
    };
  },
  watch: {
    question() {
      if (this.question === null) return;

      // set question selected
      const { question, answers } = this.question;
      this.inputQuestion = question;
      this.inputAnswer = answers.map(({ answer, isCorrect }) => ({
        answer,
        isCorrect,
      }));
    },
  },
  methods: {
    onInputAnswer(props) {
      const { index, value } = props;
      this.inputAnswer[index].answer = value;
    },
    onToggleIsCorrect(index) {
      // set all isCorrect = false
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
          answer: "",
          isCorrect: true,
        },
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
      ];
      this.$emit("onResetSelected");
    },
    onSubmit() {
      if (this.inputQuestion.length === 0) return;
      // find correct answer and check answer is empty
      const correctAnswer = this.inputAnswer.find((o) => o.isCorrect);
      if (correctAnswer.answer.length === 0)
        return this.$toast.error(
          this.$store.state.string.E_REQUIRED_ANSWER_CORRECT
        );

      // get data and pass action to parent
      const question = this.inputQuestion;
      const answers = this.inputAnswer;
      this.$emit("onActionQuestion", { question, answers });
      this.onReset();
    },
  },
};
</script>
