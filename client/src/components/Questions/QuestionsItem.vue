<template>
  <tr>
    <td>{{ index }}</td>
    <td>
      <h6 class="mb-0">{{ question._id }}</h6>
      {{ question.question_content }}
    </td>
    <td>
      <button
        @click="$emit('onSetQuestion')"
        type="button"
        class="btn btn-success btn-sm mb-2"
        title="Sửa"
      >
        <i class="fa fa-pencil-square" aria-hidden="true"></i>
      </button>
      <button
        @click="onDeleteQuestion"
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
  emits: ["onSetQuestion", "onDeleteQuestion"],
  props: {
    index: { type: Number },
    question: {
      type: Object,
      default: () => ({ _id: "", question_content: "", question_answers: [] }),
    },
  },
  methods: {
    onDeleteQuestion() {
      const textConfirm = this.$store.state.string.Q_CONFIRM_DELETE_VALUES;
      if (confirm(textConfirm)) this.$emit("onDeleteQuestion");
    },
  },
};
</script>
