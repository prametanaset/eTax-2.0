<template>
  <NuxtLayout >
        <Transition name="fade" mode="out-in">

    <NuxtPage />
        </Transition>

  </NuxtLayout>
</template>
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