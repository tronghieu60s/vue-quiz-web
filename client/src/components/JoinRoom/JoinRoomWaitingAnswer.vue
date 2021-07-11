<template>
  <div class="mb-0 py-5 my-5 d-flex flex-column align-items-center">
    <loading-action-icon />
    <div class="mt-5 text-center">
      <h1 class="mb-0">Awesome</h1>
      Vui lòng chờ một chút để người khác trả lời...
    </div>
  </div>
</template>

<script>
import LoadingActionIcon from "@components/UI/LoadingActionIcon.vue";
export default {
  components: { LoadingActionIcon },
};
</script>
