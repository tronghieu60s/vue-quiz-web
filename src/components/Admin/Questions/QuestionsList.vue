<template>
  <questions-filter />
  <table
    class="table table-striped table-hover table-bordered table-responsive-lg mt-3"
  >
    <thead class="thead-inverse">
      <tr>
        <th style="width: 10%">STT</th>
        <th style="width: 70%">Câu Hỏi</th>
        <th style="width: 20%">Hành Động</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
import QuestionsFilter from "./QuestionsFilter.vue";
export default {
  components: { QuestionsFilter },
};
</script>
