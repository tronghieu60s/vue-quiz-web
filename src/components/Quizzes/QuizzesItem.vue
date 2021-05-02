<template>
  <tr>
    <td>
      <button type="button" class="btn btn-primary btn-sm" title="Bắt đầu ngay">
        <i class="fa fa-play" aria-hidden="true"></i>
      </button>
    </td>
    <td>
      <router-link :to="routerItem">
        {{ quiz.quiz_title }}
      </router-link>
    </td>
    <td>
      {{ quiz.quiz_desc }}
    </td>
    <td>
      <button
        @click="$router.push(routerItem)"
        type="button"
        class="btn btn-primary btn-sm mb-2"
        title="Sửa"
      >
        <i class="fa fa-pencil-square" aria-hidden="true"></i>
      </button>
      <button
        @click="onDeleteQuiz"
        type="button"
        class="btn btn-danger btn-sm mb-2"
        title="Xóa"
      >
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
      default: () => ({ _id: "", quiz_title: "", quiz_desc: "" }),
    },
  },
  computed: {
    routerItem() {
      return { name: "Questions", params: { quiz_id: this.quiz._id } };
    },
  },
  methods: {
    onDeleteQuiz() {
      const textConfirm = this.$store.state.string.Q_CONFIRM_DELETE_VALUES;
      if (confirm(textConfirm)) this.$emit("onDeleteQuiz");
    },
  },
};
</script>
