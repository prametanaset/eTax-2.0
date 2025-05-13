<template>
  <NuxtLayout>
    <!-- <Transition name="fade" mode="out-in"> -->
      <!-- wrap NuxtPage in a real element and give it a key -->
      <div :key="$route.fullPath">
        <NuxtPage />
      </div>
    <!-- </Transition> -->
  </NuxtLayout>
</template>

<script setup>
// no changes here
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
