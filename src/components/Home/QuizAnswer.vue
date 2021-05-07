<template>
  <div class="mt-3" v-if="question">
    <div class="bg-dark rounded-lg w-75 mx-auto">
      <h1 class="text-center p-4 mb-0" style="color: white; font-size: 1.7em">
        {{ question.question }}
      </h1>
    </div>
    <div class="w-100 d-flex justify-content-center flex-wrap mt-4">
      <quiz-answer-item
        v-for="(answer, index) in question.answers"
        :key="index"
        :index="index"
        :answer="answer"
        :showResult="showResult"
      />
    </div>
  </div>
</template>

<script>
import QuizAnswerItem from "./QuizAnswerItem.vue";
export default {
  components: { QuizAnswerItem },
  props: { question: { type: Object }, showResult: { type: Boolean } },
};
</script>
