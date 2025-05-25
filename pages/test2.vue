<template>
  <div>
    <!-- <Button @click="openDialog = true">ดูรายละเอียด</Button>
    <BaseInvoiceDetail :open="openDialog"></BaseInvoiceDetail> -->
    <BaseDateRangePicker></BaseDateRangePicker>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "รายละเอียดใบกำกับภาษี",
});
const openDialog = ref(false);

</script>

<style>

</style>