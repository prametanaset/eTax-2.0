<template>
  <div class="h-full flex-col md:flex">
    <MailGoogle :mails="mails" />
  </div>
</template>

<script lang="ts" setup>
import MailGoogle from "~/components/Base/MailGoogle/Mail.vue";
import { accounts, mails } from "@/components/Base/Mail/data/mail";

definePageMeta({
  layout: "default",
  title: "Mail",
});

const mailStore = useMailStore();

const mailList = computed(() => mailStore.mailList);

onMounted(() => {
  mailStore.getMails();
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
