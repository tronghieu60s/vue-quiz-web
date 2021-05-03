<template>
  <div class="w-100 d-flex justify-content-between my-4">
    <h1 class="mb-0" style="font-size: 2.1em">Code: {{ quiz.quiz_code }}</h1>
    <div class="d-flex align-items-center">
      <button type="button" class="btn btn-default btn-sm">
        <i class="fa fa-user" aria-hidden="true"></i> {{ users.length }}
      </button>
      <button type="button" class="btn btn-default btn-sm">
        Bắt Đầu Ngay
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quiz: { type: Object },
    users: { type: Object },
  },
};
</script>
