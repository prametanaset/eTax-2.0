<template>
  <div class="hidden flex-col md:flex rounded-md border bg-[hsl(var(--card))]">
    <Mail :accounts="accounts" :mails="mails" :nav-collapsed-size="4" />
  </div>
</template>

<script lang="ts" setup>
import Mail from "@/components/Base/MailOld/Mail.vue";
import { accounts, mails } from "@/components/Base/MailOld/data/mail";
</script>

<style></style>
