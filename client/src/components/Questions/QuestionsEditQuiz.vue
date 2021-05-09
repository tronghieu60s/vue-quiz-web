<template>
  <button
    type="button"
    class="btn btn-warning btn-sm"
    data-toggle="modal"
    data-target="#modelId"
  >
    Chỉnh sửa Quiz
  </button>
  <div
    class="modal fade"
    id="modelId"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form @submit.prevent="onSubmit">
          <div class="modal-header">
            <h5 class="modal-title">Sửa Quiz</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <h4 class="text-capitalize">Tiêu đề</h4>
              </div>
              <input
                v-model="inputTitle"
                type="text"
                class="form-control"
                aria-describedby="helpId"
                placeholder="Nhập tiêu đề vào đây..."
                required
              />
            </div>
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <h4 class="text-capitalize">Mô tả</h4>
              </div>
              <textarea
                v-model="inputDesc"
                class="form-control"
                rows="5"
                placeholder="Nhập mô tả vào đây..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Đóng
            </button>
            <button type="submit" class="btn btn-warning">Sửa</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
      default: () => ({ _id: "", quiz_title: "", quiz_desc: "" }),
    },
  },
  data() {
    return {
      inputTitle: "",
      inputDesc: "",
    };
  },
  emits: ["onUpdateQuizzes"],
  watch: {
    quiz() {
      this.inputTitle = this.quiz.quiz_title;
      this.inputDesc = this.quiz.quiz_desc;
    },
  },
  methods: {
    onSubmit() {
      if (this.inputTitle === "") return;
      const quiz_title = this.inputTitle;
      const quiz_desc = this.inputDesc;
      this.$emit("onUpdateQuizzes", { quiz_title, quiz_desc });
    },
  },
};
</script>
