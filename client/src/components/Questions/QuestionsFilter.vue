<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <h4>Danh sách câu hỏi</h4>
    </div>
    <search @onInputSearch="(s) => $emit('onInputSearch', s)" />
  </div>
</template>

<script>
import Search from "@components/UI/Search.vue";
export default {
  components: { Search },
  emits: ["onInputSearch"],
};
</script>
