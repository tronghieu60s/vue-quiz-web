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
                <h4 class="text-capitalize">Tiêu Đề</h4>
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
              Close
            </button>
            <button type="submit" class="btn btn-warning">Sửa</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuizzes, updateQuiz } from "@models/quizzes.firebase";
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
  beforeMount() {
    this.inputTitle = this.quiz.quiz_title;
    this.inputDesc = this.quiz.quiz_desc;
  },
  methods: {
    onSubmit() {
      if (this.inputTitle === "") return;
      this.$store.dispatch("actAsyncLoading", this.onUpdateQuiz);
    },
    async onUpdateQuiz() {
      const { inputTitle: quiz_title, inputDesc: quiz_desc } = this;
      const quiz = await updateQuiz(this.quiz._id, { quiz_title, quiz_desc });
      if (!quiz) return;

      const quizzes = await getQuizzes();
      this.$emit("onUpdateQuizzes", quizzes);
      this.$toast.success(`Sửa các giá trị thành công.`);
    },
  },
};
</script>
