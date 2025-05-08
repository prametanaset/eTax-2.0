<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tr :class="cn('border-b transition-colors hover:bg-[#f8fafc] dark:hover:bg-[#0f172a] data-[state=selected]:bg-muted', props.class)">
    <slot />
  </tr>
</template>
