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
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(1rem); */
}
</style>