<template>
  <div class="h-[90vh] flex-col md:flex">
    <Mail :accounts="accounts" :mails="mails" :nav-collapsed-size="1" />
  </div>
</template>

<script lang="ts" setup>
import Mail from "~/components/Base/Mail/Mail.vue";
import { accounts, mails } from "@/components/Base/Mail/data/mail";

definePageMeta({
  title: "Mail",
  layout: "default",
});

const mailStore = useMailStore();

const mailList = computed(() => mailStore.mailList);

onMounted(() => {
  mailStore.getMails();
});
</script>

<style></style>
