<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center h-responsive">
      <div class="w-100 py-5 py-md-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-responsive {
  min-height: 100%;
  padding-top: 2rem;
}

@media (min-width: 576px) {
  .h-responsive {
    min-height: 100vh;
    padding-top: 0;
  }
}
</style>
