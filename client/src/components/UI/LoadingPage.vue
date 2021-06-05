<template>
  <div class="lds-wrapper">
    <div class="lds-loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.lds-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.lds-loader {
  width: 60px;
  height: 60px;
  border: 8px solid #262626;
  box-sizing: content-box;
  transform: rotate(45deg);
}

span {
  width: 20px;
  height: 20px;
  background: #262626;
  display: block;
  float: left;
  animation: animate 1.5s linear infinite;
}

span:nth-child(3) {
  animation-delay: 0.8s;
}

span:nth-child(2),
span:nth-child(6) {
  animation-delay: 0.6s;
}

span:nth-child(1),
span:nth-child(5),
span:nth-child(9) {
  animation-delay: 0.4s;
}

span:nth-child(4),
span:nth-child(8) {
  animation-delay: 0.2s;
}

span:nth-child(7) {
  animation-delay: 0s;
}

@keyframes animate {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
