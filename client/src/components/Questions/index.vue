<template>
  <layout :title="`[${quiz._id.slice(0, 10)}] ${quiz.quiz_title}`">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-5">
          <questions-create
            :question="question"
            @onActionQuestion="(q) => $emit('onActionQuestion', q)"
            @onSetQuestion="(q) => $emit('onSetQuestion', q)"
          />
        </div>
        <div class="col-lg-8 col-md-7 mt-5 mt-md-0">
          <questions-filter
            :questions="questions"
            @onInputSearch="(s) => (inputSearch = s)"
          />
          <questions-list
            :questions="questions"
            @onDeleteQuestion="(q) => $emit('onDeleteQuestion', q)"
            @onSetQuestion="(q) => $emit('onSetQuestion', q)"
          />
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@components/Layout";
import QuestionsCreate from "@components/Questions/QuestionsCreate.vue";
import QuestionsFilter from "@components/Questions/QuestionsFilter.vue";
import QuestionsList from "@components/Questions/QuestionsList.vue";
import { searchString } from "@helpers/commonFunctions";

export default {
  components: {
    Layout,
    QuestionsCreate,
    QuestionsList,
    QuestionsFilter,
  },
  props: ["quiz", "question", "questions", "questionsbase"],
  emits: [
    "onActionQuestion",
    "onSetQuestion",
    "onSetQuestions",
    "onDeleteQuestion",
  ],
  data() {
    return { inputSearch: "" };
  },
  watch: {
    inputSearch() {
      let questions = [];
      if (this.inputSearch.length === 0) {
        questions = this.questionsbase;
      } else {
        questions = this.questionsbase.filter((o) => {
          return searchString(o.question_content, this.inputSearch);
        });
      }
      this.$emit("onSetQuestions", questions);
    },
  },
};
</script>
