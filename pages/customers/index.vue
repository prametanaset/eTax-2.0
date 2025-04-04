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
});

const customerStore = useCustomerStore();

const customerData = computed(() => customerStore.customerList);

onMounted(() => {
  customerStore.getCustomer();
});
</script>

<style></style>
