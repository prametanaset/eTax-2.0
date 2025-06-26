<template>
  <div class="flex h-screen">
    <BaseLogin></BaseLogin>
  </div>
</template>

<script setup>
// // import liff from "@line/liff";

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }
});

useHead({
  title: "e-Tax - ระบบจัดการใบกำกับภาษีอิเล็กทรอนิกส์สำหรับธุรกิจไทย",
  meta: [
    {
      name: "description",
      content:
        "ระบบจัดการใบกำกับภาษีอิเล็กทรอนิกส์สำหรับธุรกิจไทย ใช้งานง่าย ปลอดภัย และถูกต้องตามกฎหมาย",
    },
  ],
});
</script>
