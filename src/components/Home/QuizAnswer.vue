<template>
  <div v-if="question">
    <div class="bg-dark rounded-lg w-75 mx-auto">
      <h1 class="text-center p-4 mb-0" style="color: white; font-size: 1.7em">
        {{ question.question }}
      </h1>
    </div>
    <div class="w-100 d-flex justify-content-around flex-wrap mt-4">
      <quiz-answer-item
        v-for="(answer, index) in question.answers"
        :key="index"
        :index="index"
        :answer="answer"
        :showAnswer="showAnswer"
      />
    </div>
  </div>
</template>

<script>
import QuizAnswerItem from "./QuizAnswerItem.vue";
export default {
  components: { QuizAnswerItem },
  props: { question: { type: Object }, showAnswer: { type: Boolean } },
};
</script>
