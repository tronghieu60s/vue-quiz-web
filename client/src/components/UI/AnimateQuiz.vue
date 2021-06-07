<template>
  <div class="shape-wrapper">
    <div class="shape-1"></div>
    <div class="shape-2"></div>
  </div>
</template>

<style scoped>
.shape-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.shape-1 {
  position: absolute;
  left: -11%;
  bottom: -10%;
  width: 400px;
  height: 400px;
  border-radius: 15px;
  background-color: var(--success);
  opacity: 0.8;
  transform: rotate(45deg);
  animation: animationShape1 5s -2s linear infinite alternate;
}

.shape-2 {
  position: absolute;
  right: -15%;
  top: -15%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: var(--primary);
  opacity: 0.8;
  animation: animationShape2 5s linear infinite alternate;
}

@keyframes animationShape1 {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 70px;
  }
}

@keyframes animationShape2 {
  0% {
    margin-right: 0;
  }
  100% {
    margin-right: 70px;
  }
}
</style>
