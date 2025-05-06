<template>
  <Mail :accounts="accounts" :mails="mailList" />
</template>

<script lang="ts" setup>
import Card from "~/components/ui/card/Card.vue";
import Mail from "~/components/Base/Mail/Mail.vue";
import { accounts, mails } from "@/components/Base/Mail/data/mail";

definePageMeta({
  title: "Mail",
  layout: "navmail",
});

const mailStore = useMailStore();

const mailList = computed(() => mailStore.mailList);

onMounted(() => {
  mailStore.getMails();
});
</script>

<style></style>
