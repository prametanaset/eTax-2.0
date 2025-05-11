<template>
  <div class="ping" :style="{ color: color }"></div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: '#22c55e' // default green
  }
})
</script>

<style scoped>
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.ping {
  position: relative;
  width: 16px;
  height: 13.5px;
  line-height: 0;
  display: inline-block;
  vertical-align: middle;
}

.ping::before,
.ping::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: currentColor;
}

.ping::before {
  animation: ping 1.7s ease infinite;
  opacity: 0.25;
}

.ping::after {
  opacity: 1;
}
</style>
