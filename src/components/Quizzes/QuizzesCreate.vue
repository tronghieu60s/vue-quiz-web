<template>
  <form @submit.prevent="onSubmit" class="border">
    <div class="alert alert-primary rounded-0" role="alert">
      <strong>Thêm Bộ Câu Hỏi Mới</strong>
    </div>
    <div class="pb-3 px-3">
      <div class="form-group">
        <div class="d-flex justify-content-between">
          <h4 class="text-capitalize">Tiêu Đề:</h4>
        </div>
        <input
          v-model="inputTitle"
          type="text"
          class="form-control form-control-sm"
          aria-describedby="helpId"
          placeholder="Nhập tiêu đề vào đây..."
          required
        />
      </div>
      <div class="form-group">
        <div class="d-flex justify-content-between">
          <h4 class="text-capitalize">Mô tả:</h4>
        </div>
        <textarea
          v-model="inputDesc"
          class="form-control"
          rows="5"
          placeholder="Nhập mô tả vào đây..."
        ></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button @click="onReset" type="button" class="btn btn-danger btn-sm">
          Reset
        </button>
        <button type="submit" class="btn btn-primary btn-sm">
          Thêm Bộ Câu Hỏi Mới
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["onCreateQuiz"],
  data() {
    return {
      inputTitle: "",
      inputDesc: "",
    };
  },
  methods: {
    onReset() {
      this.inputTitle = "";
      this.inputDesc = "";
    },
    onSubmit() {
      if (this.inputTitle.length === 0) return;

      const quiz_title = this.inputTitle;
      const quiz_desc = this.inputDesc;
      this.$emit("onCreateQuiz", { quiz_title, quiz_desc });
      this.onReset();
    },
  },
};
</script>
