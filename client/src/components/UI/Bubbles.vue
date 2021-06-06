<template>
  <div id="bubbles"></div>
</template>

<script>
export default {
  mounted() {
    // --- Animation ---
    const randomBetween = (smallest, biggest) =>
      Math.floor(Math.random() * biggest) + smallest;

    const NUM_OF_BUBBLES = 20;
    const bubbles = document.getElementById("bubbles");
    for (let index = 0; index < NUM_OF_BUBBLES; index += 1)
      bubbles.innerHTML += `<div 
        class="bubble bubble-c${randomBetween(1, 4)} bubble-x1" 
        style="
          left: ${(100 / NUM_OF_BUBBLES) * index + 2}%; 
          animation-delay: -${randomBetween(0, 20)}s">
      </div>`;
  },
};
</script>

<style>
#bubbles {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.bubble {
  position: absolute;
  left: 50%;
  top: -10%;
  width: 30px;
  height: 30px;
  background-color: var(--secondary);
  animation: animateBubble 20s linear infinite, animateRotate 7s linear infinite;
}

.bubble-c1 {
  width: 32px;
  height: 32px;
  clip-path: polygon(
    50% 0%,
    83% 12%,
    100% 43%,
    94% 78%,
    68% 100%,
    32% 100%,
    6% 78%,
    0% 43%,
    17% 12%
  );
  background-color: var(--primary);
}

.bubble-c2 {
  border-radius: 5px;
  background-color: var(--success);
}

.bubble-c3 {
  width: 35px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background-color: var(--danger);
}

.bubble-c4 {
  width: 35px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: var(--warning);
}

@keyframes animateBubble {
  0% {
    margin-top: calc(100vh + 100px);
  }
  100% {
    margin-top: -10%;
  }
}

@keyframes animateRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
