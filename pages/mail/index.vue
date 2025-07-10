<template>
  <MailNotion class="flex-1" />
</template>

<script lang="ts" setup>
import MailNotion from "~/components/Base/MailNotion/Mail.vue";

definePageMeta({
  layout: "default",
  title: "เมล",
});

useHead({
  title: "e-Tax - เมล",
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
