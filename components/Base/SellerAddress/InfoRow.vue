<!-- components/InfoRow.vue -->
<template>
  <p>
    <span class="font-semibold text-black dark:text-purple-300">{{ label }}: </span>
    <span v-if="value" class="font-medium ">{{ value }}</span>
    <span v-else class="text-gray-400 italic dark:text-purple-400">ไม่มีข้อมูล</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | null
}>()
</script>
