<template>
  <form
    @submit.prevent="this.$emit('onInputSearch', this.inputSearch)"
    class="form-group d-flex mb-0"
  >
    <input
      v-model="inputSearch"
      type="text"
      class="form-control form-control-sm mr-2"
      placeholder="Nhập và tìm kiếm..."
      aria-describedby="helpId"
    />
    <button type="submit" class="btn btn-primary btn-sm" title="Tìm kiếm">
      <i class="fa fa-search" aria-hidden="true"></i>
    </button>
  </form>
</template>

<script>
export default {
  emits: ["onInputSearch"],
  data() {
    return {
      inputSearch: "",
    };
  },
};
</script>
