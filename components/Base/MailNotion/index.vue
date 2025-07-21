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
    url: "/mail/fromedta",
  },
  {
    title: "ที่ส่งให้ลูกค้า",
    label: "9",
    icon: "lucide:send",
    url: "/mail/sendcustomer",
  },
];
</script>
<template>
  <div class="flex gap-6 lg:h-[calc(100dvh)] overflow-hidden">
    <!-- Main content -->
    <BaseGoogleAuthLogin
      v-if="status !== 'loading' && !session?.googleAccessToken"
    />

    <div v-else class="flex flex-row h-full w-full">
      <div class="hidden xl:block bg-[hsl(var(--card))]">
        <Nav :links="links" :is-collapsed="false" />
      </div>
      <Separator orientation="vertical" />
      <slot />
    </div>
  </div>
</template>
