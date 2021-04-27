<template>
  <tr>
    <td>
      <button
        type="button"
        class="btn btn-primary btn-sm mb-2"
        title="Bắt đầu ngay"
      >
        <i class="fa fa-play" aria-hidden="true"></i>
      </button>
    </td>
    <td>
      <a href="">
        <h6 v-if="quiz.quiz_trash" class="mb-0 text-uppercase">[Deleted]</h6>
        {{ quiz.quiz_title }}
      </a>
    </td>
    <td>
      {{ quiz.quiz_desc }}
    </td>
    <td>
      <button
        @click="onFavourite"
        type="button"
        class="btn btn-secondary btn-sm mb-2"
        title="Yêu thích"
      >
        <i class="fa fa-star" aria-hidden="true"></i>
      </button>
      <button
        v-if="!quiz.quiz_trash"
        type="button"
        class="btn btn-primary btn-sm mb-2"
        title="Sửa"
      >
        <i class="fa fa-pencil-square" aria-hidden="true"></i>
      </button>
      <button type="button" class="btn btn-danger btn-sm mb-2" title="Xóa">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
      <button
        v-if="quiz.quiz_trash"
        type="button"
        class="btn btn-success btn-sm mb-2"
        title="Khôi phục"
      >
        <i class="fa fa-undo" aria-hidden="true"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { updateQuiz } from "@models/quizzes.firebase";
export default {
  props: {
    quiz: {
      type: Object,
      default: () => ({
        _id: "",
        quiz_title: "",
        quiz_desc: "",
        quiz_favourite: false,
        quiz_trash: false,
      }),
    },
    methods: {
      onFavourite() {
        this.$store.dispatch("actAsyncLoading", async () => {
          await updateQuiz(this.quiz._id, {
            quiz_favourite: !this.quiz.quiz_favourite,
          });
        });
      },
    },
  },
};
</script>
