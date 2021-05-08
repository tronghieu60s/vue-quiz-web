<template>
  <tr>
    <td>{{ index }}</td>
    <td>
      <h6 class="mb-0">{{ question._id }}</h6>
      {{ question.question }}
    </td>
    <td>
      <button
        @click="$emit('onSelectEditQuestion')"
        type="button"
        class="btn btn-primary btn-sm mb-2"
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
  emits: ["onSelectEditQuestion", "onDeleteQuestion"],
  props: {
    index: { type: Number },
    question: {
      type: Object,
      default: () => ({ _id: "", question: "", answers: [] }),
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
