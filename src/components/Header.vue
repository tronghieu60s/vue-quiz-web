<template>
  <div class="d-flex justify-content-between py-4">
    <div class="mt-3">
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
    <div class="mt-2 w-25 d-flex justify-content-end">
      <div>
        <button type="button" class="btn btn-danger btn-sm">
          Đăng Xuất <i class="fa fa-sign-out ml-1" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
