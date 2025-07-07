<!-- components/LottiePlayer.vue -->
<template>
  <div ref="lottieContainer" class="w-12 h-12"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import lottie from "lottie-web";

const props = defineProps<{
  animationData: any;
  loop?: boolean;
}>();

const lottieContainer = ref<HTMLElement | null>(null);
const animationInstance = ref<any>(null);

// ให้ parent เรียก .play() ได้
defineExpose({
  play: () => animationInstance.value?.play(),
  stop: () => animationInstance.value?.stop(),
});

onMounted(() => {
  animationInstance.value = lottie.loadAnimation({
    container: lottieContainer.value!,
    renderer: "svg",
    loop: props.loop ?? true,
    autoplay: false,
    animationData: props.animationData,
  });
});

onBeforeUnmount(() => {
  animationInstance.value?.destroy();
});
</script>
