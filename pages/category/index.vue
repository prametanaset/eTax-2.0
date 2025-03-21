<template>
  <div>
      <div>
        <BaseProductTable :data="products_data" :columns="columns"></BaseProductTable>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import products_data from '@/public/data/products_100_realistic.json'
import { columns } from '@/components/Base/ProductTable/columns'

definePageMeta({
  title:'รายการสินค้า'
})
</script>

<style>

</style>