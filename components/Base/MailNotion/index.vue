<script lang="ts" setup>
import MailDisplay from "./MailDisplay.vue";
import MailList from "./MailList.vue";
import Nav from "./Nav.vue";

const { data: session, status } = useAuth();

export interface LinkProp {
  title: string;
  label: string;
  icon: string;
  url: string;
}
</script>
<template>
  <div class="flex gap-6 lg:h-[calc(100dvh-3.5rem)] overflow-hidden">
    <!-- Main content -->
    <BaseGoogleAuthLogin
      v-if="status !== 'loading' && !session?.googleAccessToken"
    />

    <div v-else class="flex flex-row h-full w-full">
      <slot />
    </div>
  </div>
</template>
