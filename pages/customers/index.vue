<template>
  <div class="xl:w-[1400px]">
    <BaseCustomerTable
      :data="customerData"
      :columns="columns"
    ></BaseCustomerTable>
  </div>
</template>

<script lang="ts" setup>
import { columns } from "@/components/Base/CustomerTable/columns";

definePageMeta({
  title: "จัดการลูกค้า",
  auth: {
    unauthenticatedOnly: false,
  }
});

const customerStore = useCustomerStore();

onMounted(() => {
  customerStore.getCustomer(); // ✅ async fetch
});

const customerData = computed(() =>
  mapCustomerResponseToCustomer(customerStore.customerList)
);

useHead({
  title: "e-Tax - ลูกค้า",
  meta: [
    {
      name: "description",
      content:
        "ระบบจัดการใบกำกับภาษีอิเล็กทรอนิกส์สำหรับธุรกิจไทย ใช้งานง่าย ปลอดภัย และถูกต้องตามกฎหมาย",
    },
  ],
});
</script>

<style></style>
