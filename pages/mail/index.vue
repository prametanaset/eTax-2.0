<template>
  <Card class="flex-col col-span-2">
    <Mail :accounts="accounts" :mails="mailList" :nav-collapsed-size="4" />
  </Card>
</template>

<script lang="ts" setup>
import Card from "~/components/ui/card/Card.vue";
import Mail from "~/components/Base/Mail/Mail.vue";
import { accounts, mails } from "@/components/Base/Mail/data/mail";

definePageMeta({
  title: "Mail",
});

const mailStore = useMailStore();

const mailList = computed(() => mailStore.mailList);

onMounted(() => {
  mailStore.getMails();
});
</script>

<style></style>
