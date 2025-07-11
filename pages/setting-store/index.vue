<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div
    class="relative flex-col items-center justify-center min-h-screen md:grid lg:grid-cols-[1fr_65%] lg:px-0 bg-white dark:bg-[#0f1729]"
  >
    <!-- Login form block moved to the left -->
    <div class="min-h-screen w-full flex items-center justify-center p-4 py-0">
      <div class="w-full max-w-sm">
        <base-user-store-form />
      </div>
    </div>

    <!-- Branding panel moved to the right -->
    <div
      class="relative hidden h-full w-full flex-col bg-muted text-white dark:border-l lg:flex  overflow-hidden"
    >
      <div class="absolute inset-0 bg-white"></div>
      <div
        class="relative z-20 flex items-center text-lg font-medium font-poppins"
      >
        <base-preview-store-setting />
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins {
  font-family: Poppins;
}
</style>
