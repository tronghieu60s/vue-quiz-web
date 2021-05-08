<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <button
        @click="$emit('onToggleCreate')"
        type="button"
        class="btn btn-primary btn-sm mb-0"
      >
        Thêm Bộ Câu Hỏi
      </button>
    </div>
    <search @onInputSearch="(s) => $emit('onInputSearch', s)" />
  </div>
</template>

<script>
import Search from "@components/UI/Search.vue";
export default {
  components: { Search },
  emits: ["onToggleCreate", "onInputSearch"],
};
</script>
