<template>
  <form @submit.prevent="onSubmit">
    <h4
      :class="[
        'text-center rounded mb-4 py-2',
        [this.question ? 'bg-success' : 'bg-primary'],
      ]"
      style="color: #f6f9fc"
    >
      {{ this.question ? "Sửa Câu Hỏi" : "Thêm Câu Hỏi Mới" }}
    </h4>
    <div class="d-flex justify-content-between">
      <div class="form-group mr-2 w-50">
        <h4 class="text-capitalize">Tổng điểm:</h4>
        <select v-model.number="inputScores" class="w-100 form-control">
          <option selected>1000</option>
          <option>1500</option>
          <option>2000</option>
          <option>2500</option>
          <option>3000</option>
        </select>
      </div>
      <div class="form-group ml-2 w-50">
        <h4 class="text-capitalize">Thời gian:</h4>
        <select v-model.number="inputTimes" class="w-100 form-control">
          <option>10</option>
          <option selected>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
          <option>60</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <h4 class="text-capitalize">Câu Hỏi:</h4>
        <h5>{{ this.question ? this.question._id : "" }}</h5>
      </div>
      <textarea
        v-model="inputQuestion"
        class="form-control"
        rows="4"
        placeholder="Nhập câu hỏi vào đây..."
        required
      ></textarea>
    </div>
    <div class="form-group">
      <h4 class="text-capitalize">Câu Trả Lời:</h4>
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
      <button v-if="question" type="submit" class="btn btn-success btn-sm">
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
  emits: ["onSetQuestion", "onActionQuestion"],
  data() {
    return {
      inputScores: 1000,
      inputTimes: 20,
      inputQuestion: "",
      inputAnswer: [
        {
          answer_content: "",
          answer_isCorrect: true,
        },
        {
          answer_content: "",
          answer_isCorrect: false,
        },
        {
          answer_content: "",
          answer_isCorrect: false,
        },
        {
          answer_content: "",
          answer_isCorrect: false,
        },
      ],
    };
  },
  watch: {
    question() {
      if (this.question === null) return;

      // set question selected
      const {
        question_content,
        question_answers,
        question_scores,
        question_times,
      } = this.question;
      this.inputScores = question_scores;
      this.inputTimes = question_times;
      this.inputQuestion = question_content;
      this.inputAnswer = question_answers.map(
        ({ answer_content, answer_isCorrect }) => ({
          answer_content,
          answer_isCorrect,
        })
      );
    },
  },
  methods: {
    onInputAnswer(props) {
      const { index, value } = props;
      this.inputAnswer[index].answer_content = value;
    },
    onToggleIsCorrect(index) {
      // set all isCorrect = false
      this.inputAnswer = this.inputAnswer.map((answer) => ({
        ...answer,
        answer_isCorrect: false,
      }));
      const { answer_isCorrect } = this.inputAnswer[index];
      this.inputAnswer[index].answer_isCorrect = !answer_isCorrect;
    },
    reset() {
      this.inputScores = 1000;
      this.inputTimes = 20;
      this.inputQuestion = "";
      this.inputAnswer = [
        {
          answer_content: "",
          answer_isCorrect: true,
        },
        {
          answer_content: "",
          answer_isCorrect: false,
        },
        {
          answer_content: "",
          answer_isCorrect: false,
        },
        {
          answer_content: "",
          answer_isCorrect: false,
        },
      ];
    },
    onReset() {
      this.reset();
      this.$emit("onSetQuestion", null);
    },
    onSubmit() {
      if (this.inputQuestion.length === 0) return;

      // find correct answer and check answer is empty
      const correctAnswer = this.inputAnswer.find((o) => o.answer_isCorrect);
      if (correctAnswer.answer_content.length === 0) return;

      // get data and pass action to parent
      const question_content = this.inputQuestion;
      const question_answers = this.inputAnswer;
      const question_scores = this.inputScores;
      const question_times = this.inputTimes;
      this.$emit("onActionQuestion", {
        question_content,
        question_answers,
        question_scores,
        question_times,
      });

      this.reset();
    },
  },
};
</script>
