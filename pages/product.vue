<template>
  <div>
    <BaseProductTable :data="products_data" :columns="columns"></BaseProductTable>
  </div>
</template>

<script lang="ts" setup>
import products_data from '@/public/data/products_100_realistic.json'
import { columns } from '@/components/Base/ProductTable/columns'

</script>

<style>

</style>