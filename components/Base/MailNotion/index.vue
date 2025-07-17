<script lang="ts" setup>
import MailDisplay from "./MailDisplay.vue";
import MailList from "./MailList.vue";
import Nav from "./Nav.vue";
const mailStore = useMailStore();

const { data: session, status } = useAuth();

export interface LinkProp {
  title: string;
  label: string;
  icon: string;
  url: string;
}

const links: LinkProp[] = [
  {
    title: "Inbox",
    label: "128",
    icon: "lucide:inbox",
    url: "/mail",
  },
  {
    title: "จาก ETDA",
    label: "50",
    icon: "lucide:inbox",
    url: "/mail/fromETDA",
  },
  {
    title: "ที่ส่งให้ลูกค้า",
    label: "9",
    icon: "lucide:send",
    url: "/mail/customer",
  },
];
</script>
<template>
  <div class="flex gap-6 lg:h-[calc(100dvh-3.5rem)] overflow-hidden">
    <!-- Main content -->
    <BaseGoogleAuthLogin
      v-if="status !== 'loading' && !session?.googleAccessToken"
    />

    <div v-else class="flex flex-row h-full w-full">
      <div class="hidden xl:block">
        <Nav :links="links" :is-collapsed="false" />
      </div>
      <Separator orientation="vertical" />
      <div
        class="flex gap-1 lg:max-w-[30rem] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2 px-2 xl:px-0"
      ></div>
      <div class="h-full w-full">
        <!-- ✅ รายการเมล -->
        <MailList />
      </div>
      <div
        :class="[
          'absolute z-[99] bg-background w-full xl:w-[690px] h-full xl:border border-muted-300 dark:border-muted-800 transition-transform duration-200 ease-in-out top-0 overflow-y-auto',
          mailStore.selectMail !== null
            ? 'translate-x-0 xl:right-0'
            : 'translate-x-full xl:right-[-690px]',
        ]"
      >
        <MailDisplay />
      </div>
    </div>
  </div>
</template>
