<template>
  <div class="h-[90vh] flex-col md:flex">
    <Mail :mails="mails" />
  </div>
</template>

<script lang="ts" setup>
import Mail from "~/components/Base/Mail/Mail.vue";
import { accounts, mails } from "@/components/Base/Mail/data/mail";

definePageMeta({
  layout: "default",
});

const mailStore = useMailStore();

const mailList = computed(() => mailStore.mailList);

onMounted(() => {
  mailStore.getMails();
});
</script>

<style></style>
