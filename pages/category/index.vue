<template>
  <div class="xl:w-[1400px]">
    <BaseProductTable :data="products" :columns="columns"></BaseProductTable>
  </div>
</template>

<script lang="ts" setup>
import { columns } from "@/components/Base/ProductTable/columns";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();

// สร้าง computed property เพื่อดึงข้อมูลจาก store และอัพเดทอัตโนมัติ
const products = computed(() => productStore.products);

// เมื่อ component ถูก mount ให้เรียกใช้ฟังก์ชัน getProduct จาก store เพื่อดึงข้อมูลสินค้า
onMounted(() => {
  productStore.getProduct();
});

definePageMeta({
  title: "รายการสินค้า",
});
</script>

<style></style>
