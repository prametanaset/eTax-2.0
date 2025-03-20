<template>
  <div>
    <div class="grid auto-rows-min gap-4 md:grid-cols-1">
      <div class="min-h-[100vh] rounded-xl flex flex-col gap-6 ">
        <div>
          <p class="mb-1">ลูกค้า</p>
          <BaseSelectCustomer></BaseSelectCustomer>
        </div>
        <div>
          <p>วันที่ออก</p>
          <BaseDatePicker></BaseDatePicker>
        </div>
        <div>
          <p class="text-lg">รายการสินค้า</p>
          <BaseProductList></BaseProductList>
        </div>
      </div>
      <!-- <div class="min-h-[100vh] rounded-xl bg-[#f9f9fa]" /> -->
    </div>

    
  </div>

</template>

<script lang="ts" setup>
definePageMeta({
  title: "สร้างใบกำกับภาษี",
});
</script>

<style></style>