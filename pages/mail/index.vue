<template>
  <BaseMailNotion>
    <div class="h-full w-full overflow-x-hidden">
      <!-- ✅ รายการเมล -->
      <BaseMailNotionMailList />
    </div>
    <div
      :class="[
        'absolute z-[99] bg-background shadow-lg w-full xl:w-[690px] h-full xl:border border-muted-300/20 dark:border-muted-800 transition-transform duration-200 ease-in-out top-0 overflow-y-auto',
        mailStore.selectMail !== null
          ? 'translate-x-0 xl:right-0'
          : 'translate-x-full xl:right-[-690px]',
      ]"
    >
      <BaseMailNotionMailDisplay />
    </div>
  </BaseMailNotion>
</template>

<script lang="ts" setup>
const mailStore = useMailStore();

definePageMeta({
  title: "เมล",
  auth: {
    unauthenticatedOnly: false,
  },
});

useHead({
  title: "e-Tax - หน้าแรก",
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
