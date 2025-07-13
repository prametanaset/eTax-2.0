<script lang="ts" setup>
import MailDisplay from "./MailDisplay.vue";
import MailList from "./MailList.vue";
const mailStore = useMailStore();

const { data: session, status } = useAuth();
</script>
<template>
  <div class="flex gap-6 lg:h-[calc(99.5dvh-3.5rem)] overflow-hidden">
    <!-- Main content -->
    <BaseGoogleAuthLogin
      v-if="status !== 'loading' && !session?.googleAccessToken"
    />

    <div class="flex flex-col h-full w-full relative">
      <div
        class="flex gap-1 lg:max-w-[30rem] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2 px-2 xl:px-0"
      ></div>
      <div class="h-full">
        <!-- ✅ รายการเมล -->
        <MailList />
      </div>
      <div
        :class="[
          'absolute z-[2] bg-background w-full xl:w-[50%] h-full xl:border border-muted-300 dark:border-muted-800 rounded-md transition-transform duration-200 ease-in-out top-0 overflow-y-auto',
          mailStore.selectMail !== null
            ? 'translate-x-0 xl:translate-x-[100%] '
            : 'translate-x-full xl:translate-x-[200%]',
        ]"
      >
        <MailDisplay />
      </div>
    </div>
  </div>
</template>
