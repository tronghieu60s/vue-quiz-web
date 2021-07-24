<template>
  <div class="w-100" v-if="question">
    <div class="w-75 rounded-lg mx-auto">
      <h1
        class="text-dark text-center py-4 py-lg-4 mb-0"
        style="font-size: 1.7em"
      >
        {{ question.question_content }}
      </h1>
    </div>
    <div
      v-if="!countdown"
      class="w-100 d-flex justify-content-center flex-wrap mt-4"
    >
      <quiz-answer-item
        v-for="(answer, index) in question.question_answers"
        :key="index"
        :index="index"
        :answer="answer"
        :result="result"
        @onSelectAnswer="$emit('onSelectAnswer', answer)"
      />
    </div>
  </div>
</template>

<script>
import QuizAnswerItem from "./QuizAnswerItem.vue";
export default {
  components: { QuizAnswerItem },
  emits: ["onSelectAnswer"],
  props: {
    result: { type: String },
    question: { type: Object },
    countdown: { type: Boolean, default: false },
  },
};
</script>
