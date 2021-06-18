<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <h5 class="mb-0">{{ questions.length || 0 }} mục</h5>
    </div>
    <search @onInputSearch="(s) => $emit('onInputSearch', s)" />
  </div>
</template>

<script>
import Search from "@components/UI/Search.vue";
export default {
  components: { Search },
  emits: ["onInputSearch"],
  props: { questions: { type: Array } },
};
</script>
