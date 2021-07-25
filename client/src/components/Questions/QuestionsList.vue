<template>
  <table
    class="table table-striped table-hover table-bordered table-responsive-md mt-3"
  >
    <thead class="thead-inverse">
      <tr>
        <th style="width: 10%">STT</th>
        <th style="width: 70%">Câu Hỏi</th>
        <th style="width: 20%">Hành Động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-show="questions.length === 0">
        <td class="text-center" colspan="4">Không có câu hỏi nào.</td>
      </tr>
      <questions-item
        v-for="(question, index) in questions"
        :key="index"
        :index="index + 1"
        :question="question"
        @onSetQuestion="$emit('onSetQuestion', question)"
        @onDeleteQuestion="$emit('onDeleteQuestion', question)"
      />
    </tbody>
  </table>
</template>

<script>
import QuestionsItem from "./QuestionsItem.vue";
export default {
  components: { QuestionsItem },
  emits: ["onSetQuestion", "onDeleteQuestion"],
  props: { questions: { type: Array } },
};
</script>
