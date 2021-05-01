<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <h4 class="text-capitalize">Câu Hỏi</h4>
        <h5>{{ this.questionSelected ? this.questionSelected._id : "" }}</h5>
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
        @toggleIsCorrect="toggleIsCorrect(index)"
      >
      </questions-input-answer>
    </div>
    <div class="d-flex justify-content-end">
      <button @click="onReset" type="button" class="btn btn-danger btn-sm">
        Reset
      </button>
      <button
        v-if="questionSelected"
        type="submit"
        class="btn btn-warning btn-sm"
      >
        Sửa Câu Hỏi
      </button>
      <button
        v-if="!questionSelected"
        type="submit"
        class="btn btn-primary btn-sm"
      >
        Thêm Câu Hỏi
      </button>
    </div>
  </form>
</template>

<script>
import QuestionsInputAnswer from "./QuestionsInputAnswer.vue";
import { createQuestion } from "@models/questions.firebase";
import { getQuestions, updateQuestionById } from "@models/questions.firebase";
export default {
  components: { QuestionsInputAnswer },
  props: ["questionSelected"],
  emits: ["onResetSelected", "onLoadQuestions"],
  data() {
    return {
      inputQuestion: "",
      inputAnswer: [
        {
          value: "",
          isCorrect: true,
        },
        {
          value: "",
          isCorrect: false,
        },
        {
          value: "",
          isCorrect: false,
        },
        {
          value: "",
          isCorrect: false,
        },
      ],
    };
  },
  watch: {
    questionSelected() {
      if (this.questionSelected) {
        const { content, answers } = this.questionSelected;
        this.inputQuestion = content;
        this.inputAnswer = answers.map((o) => ({
          value: o.answer,
          isCorrect: o.isCorrect,
        }));
      }
    },
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
        },
        {
          value: "",
          isCorrect: false,
        },
        {
          value: "",
          isCorrect: false,
        },
        {
          value: "",
          isCorrect: false,
        },
      ];
      this.$emit("onResetSelected");
    },
    onSubmit() {
      if (this.inputQuestion.length === 0) return;
      const correctAnswer = this.inputAnswer.find((o) => o.isCorrect);
      if (correctAnswer.value.length === 0)
        return this.$toast.error(
          this.$store.state.string.E_REQUIRED_ANSWER_CORRECT
        );

      this.$store.dispatch(
        "actAsyncLoading",
        this.questionSelected ? this.onEditQuestion : this.onCreateQuestion
      );
    },
    async onCreateQuestion() {
      const answers = this.inputAnswer.map((o) => ({
        answer: o.value,
        isCorrect: o.isCorrect,
      }));
      const newQuestion = { content: this.inputQuestion, answers };
      const question = await createQuestion(newQuestion);
      if (question) {
        this.$toast.success(this.$store.state.string.ADD_VALUES_SUCCESS);
        this.onReset();

        const questions = await getQuestions();
        this.$emit("onLoadQuestions", questions);
      }
    },
    async onEditQuestion() {
      const answers = this.inputAnswer.map((o) => ({
        answer: o.value,
        isCorrect: o.isCorrect,
      }));
      const updateQuestion = { content: this.inputQuestion, answers };
      const update = await updateQuestionById(
        this.questionSelected._id,
        updateQuestion
      );
      if (update) {
        this.$toast.success(this.$store.state.string.EDIT_VALUES_SUCCESS);
        this.onReset();

        const questions = await getQuestions();
        this.$emit("onLoadQuestions", questions);
      }
    },
  },
};
</script>
