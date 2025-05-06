<template>
  <div id="handle-group-1" direction="horizontal" class="rounded-lg">
    <!-- <ResizablePanel id="handle-panel-1" :default-size="20">
      <Nav :is-collapsed="isCollapsed" :links="links" />
    </ResizablePanel> -->
    <!-- <ResizableHandle id="handle-handle-1" /> -->
    <div class="py-2 mb-3 flex justify-between flex-end">
      <form :class="[device.isMobile ? 'w-full' : 'w-[40rem]']">
        <div class="relative">
          <Search
            class="absolute left-2 top-2.5 size-4 text-muted-foreground"
          />
          <Input v-model="searchValue" placeholder="ค้นหาอีเมล" class="pl-8" />
        </div>
      </form>
    </div>
    <MailList v-model:selected-mail="selectedMail" :items="filteredMailList" />
    <!-- <BaseMailList2 /> -->
    <MailDisplay :mail="selectedMailData" />
  </div>
</template>

<script lang="ts" setup>
import Nav from "./Nav.vue";
import MailList from "./MailList.vue";
import type { Mail } from "./data/mail";

import { Search, Menu } from "lucide-vue-next";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: string;
  }[];
  mails: Mail[];
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const data = {
  user: {
    name: "shadcn",
    email: "prametanaset147@gmail.com",
    avatar: "/avatars/shadcn.png",
  },
};

const mailStore = useMailStore();
const device = useDevice();

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
});

const searchValue = ref("");
const debouncedSearch = refDebounced(searchValue, 250);

const isCollapsed = ref(props.defaultCollapsed);

function onCollapse() {
  isCollapsed.value = true;
}

const filteredMailList = computed(() => {
  let output: Mail[] = [];
  const searchValue = debouncedSearch.value?.trim();
  if (!searchValue) {
    output = props.mails;
  } else {
    output = props.mails.filter((item) => {
      return (
        item.name.includes(debouncedSearch.value) ||
        item.email.includes(debouncedSearch.value) ||
        item.name.includes(debouncedSearch.value) ||
        item.subject.includes(debouncedSearch.value) ||
        item.text.includes(debouncedSearch.value)
      );
    });
  }

  return output;
});

const selectedMail = ref<string | undefined>();

const selectedMailData = computed(() =>
  props.mails.find((item) => item.id === selectedMail.value)
);

const links = [
  {
    title: "Inbox",
    label: "128",
    icon: "lucide:inbox",
    variant: "default",
  },
  {
    title: "ETDA",
    label: "",
    icon: "lucide:inbox",
    variant: "ghost",
  },
  {
    title: "Sent",
    label: "",
    icon: "lucide:send",
    variant: "ghost",
  },
  {
    title: "Trash",
    label: "",
    icon: "lucide:trash",
    variant: "ghost",
  },
  {
    title: "Star",
    label: "",
    icon: "lucide:star",
    variant: "ghost",
  },
];
</script>

<style></style>
