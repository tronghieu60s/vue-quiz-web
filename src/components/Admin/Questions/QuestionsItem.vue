<template>
  <tr>
    <td>{{ index }}</td>
    <td>
      <a href="">
        <h6 class="mb-0">{{ question._id }}</h6>
        {{ question.content }}
      </a>
    </td>
    <td>
      <button
        @click="onEditQuestion"
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
  emits: ["onEditQuestion", "onDeleteQuestion"],
  props: {
    index: {
      type: Number,
      default: 0,
    },
    question: {
      type: Object,
      default: () => ({ _id: "", content: "", answers: [] }),
    },
  },
  methods: {
    onEditQuestion() {
      this.$emit("onEditQuestion", this.question);
    },
    onDeleteQuestion() {
      this.$emit("onDeleteQuestion", this.question);
    },
  },
};
</script>
