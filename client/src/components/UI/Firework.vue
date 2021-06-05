<template>
  <div id="fireworks-wrapper">
    <div class="fireworks">
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
    </div>
    <div class="fireworks">
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
    </div>
    <div class="fireworks">
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
    </div>
    <div class="fireworks">
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
      <div class="explosion"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#fireworks-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 4%;
  left: -30%;
}

.fireworks {
  position: absolute;
  z-index: -1;
}

.fireworks:nth-child(1) {
  top: 26%;
  left: 88%;
  transform: scale(1);
}

.fireworks:nth-child(2) {
  top: 18%;
  left: 79%;
  transform: scale(0.7);
}

.fireworks:nth-child(2) .explosion::before {
  animation-delay: 1s;
}

.fireworks:nth-child(3) {
  top: 38%;
  left: 79%;
  transform: scale(0.5);
}

.fireworks:nth-child(3) .explosion::before {
  animation-delay: 1.5s;
}

.fireworks:nth-child(4) {
  top: 30%;
  left: 90%;
  transform: scale(0.6);
}

.fireworks:nth-child(4) .explosion::before {
  animation-delay: 0.5s;
}

.explosion {
  position: absolute;
  left: -2px;
  bottom: 0;
  width: 4px;
  height: 80px;
  transform-origin: 50% 100%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  overflow: hidden;
}

.explosion:nth-child(1) {
  transform: rotate(0deg) translateY(-15px);
}

.explosion:nth-child(2) {
  transform: rotate(30deg) translateY(-15px);
}

.explosion:nth-child(3) {
  transform: rotate(60deg) translateY(-15px);
}

.explosion:nth-child(4) {
  transform: rotate(90deg) translateY(-15px);
}

.explosion:nth-child(5) {
  transform: rotate(120deg) translateY(-15px);
}

.explosion:nth-child(6) {
  transform: rotate(150deg) translateY(-15px);
}

.explosion:nth-child(7) {
  transform: rotate(180deg) translateY(-15px);
}

.explosion:nth-child(8) {
  transform: rotate(210deg) translateY(-15px);
}

.explosion:nth-child(9) {
  transform: rotate(240deg) translateY(-15px);
}

.explosion:nth-child(10) {
  transform: rotate(270deg) translateY(-15px);
}

.explosion:nth-child(11) {
  transform: rotate(300deg) translateY(-15px);
}

.explosion:nth-child(12) {
  transform: rotate(330deg) translateY(-15px);
}

.explosion::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 40px;
  background-color: var(--success);
  animation: explosion 2s ease-in-out infinite;
}

@keyframes explosion {
  0% {
    top: 100%;
  }
  33%,
  100% {
    top: -50%;
  }
}
</style>