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
        class="bubble bubble-c${randomBetween(1, 4)}" 
        style="
          left: ${randomBetween(10, 90)}%; 
          animation-delay: ${randomBetween(0, 20)}s">
      </div>`;
  },
};
</script>

<style>
#bubbles {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
}

.bubble {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: inset 1px -1px 4px 0px var(--secondary);

  left: 50%;
  top: -10%;
  animation: animateBubble 20s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
}

.bubble-c1 {
  box-shadow: inset 1px -1px 4px 0px var(--primary);
}

.bubble-c2 {
  box-shadow: inset 1px -1px 4px 0px var(--danger);
}

.bubble-c3 {
  box-shadow: inset 1px -1px 4px 0px var(--success);
}

.bubble-c4 {
  box-shadow: inset 1px -1px 4px 0px var(--warning);
}

@keyframes animateBubble {
  0% {
    margin-top: calc(100vh + 100px);
  }
  100% {
    margin-top: -10%;
  }
}

@keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}
</style>
