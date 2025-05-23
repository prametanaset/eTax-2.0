<template>
  <NuxtLayout>
    <!-- <Transition name="fade" mode="out-in"> -->
      <!-- wrap NuxtPage in a real element and give it a key -->
        <NuxtPage />
    <!-- </Transition> -->
  </NuxtLayout>
</template>

<script setup>
// no changes here
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

 .page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(1rem); */
}
</style>
