<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500 },
]
</script>
<!-- :show-grid-line="false"
    :show-legend="false"
    :show-x-axis="false"
    :show-y-axis="false" -->
<template>
  <AreaChart :show-grid-line="false" :margin="0" :show-legend="false" :show-x-axis="false" :show-y-axis="false" :data="data" index="name" :categories="['total']" />
</template>