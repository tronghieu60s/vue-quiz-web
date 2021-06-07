<template>
  <div id="cd-wrapper">
    <div class="cd-number">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
#cd-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cd-number {
  font-size: 10em;
  text-shadow: 1px 1px var(--primary), 2px 2px var(--primary),
    3px 3px var(--primary), 4px 4px var(--primary), 5px 5px var(--primary),
    6px 6px var(--primary);
  animation: animate 1s linear infinite;
}

@keyframes animate {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
