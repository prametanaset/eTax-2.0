<template>
  <NuxtLayout>
    <template v-if="!excludedPaths.includes(route.path)">
      <Transition name="page" mode="out-in">
        <div :key="route.fullPath">
          <NuxtPage />
        </div>
      </Transition>
    </template>

    <!-- No transition -->
    <template v-else>
      <NuxtPage :key="route.fullPath" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const excludedPaths = ['/mail', '/mail/sendcustomer', '/mail/fromedta']
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
