<template>
  <div class="mb-0 py-5 my-5 d-flex flex-column align-items-center">
    <loading-action-icon />
    <div class="mt-5">Vui lòng chờ người khác vào...</div>
    <h1 class="mt-2 mb-0">Bạn có thấy tên của mình chưa nhỉ?</h1>
  </div>
</template>

<script>
import LoadingActionIcon from "@components/UI/LoadingActionIcon.vue";
export default {
  components: { LoadingActionIcon },
};
</script>
