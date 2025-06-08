<script lang="ts" setup>
import type { Mail } from "./data/mail";

import { cn } from "@/lib/utils";

import { refDebounced } from "@vueuse/core";
import { Menu, Search, Star } from "lucide-vue-next";
import { computed, ref } from "vue";
import MailDisplay from "./MailDisplay.vue";
import MailList from "./MailList.vue";
import Nav from "./Nav.vue";

interface MailProps {
  mails: Mail[];
}

const props = withDefaults(defineProps<MailProps>(), {});

const selectedMail = ref<string | undefined>();
const searchValue = ref("");
const debouncedSearch = refDebounced(searchValue, 250);
const device = useDevice();
const mailStore = useMailStore();

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

const unreadMailList = computed(() =>
  filteredMailList.value.filter((item) => !item.read)
);

const selectedMailData = computed(() =>
  props.mails.find((item) => item.id === selectedMail.value)
);

const links: LinkProp[] = [
  {
    title: "Inbox",
    label: "128",
    icon: "lucide:inbox",
    variant: "default",
  },
  {
    title: "Drafts",
    label: "9",
    icon: "lucide:file",
    variant: "ghost",
  },
  {
    title: "Sent",
    label: "",
    icon: "lucide:send",
    variant: "ghost",
  },
  {
    title: "Junk",
    label: "23",
    icon: "lucide:archive",
    variant: "ghost",
  },
  {
    title: "Trash",
    label: "",
    icon: "lucide:trash",
    variant: "ghost",
  },
  {
    title: "Archive",
    label: "",
    icon: "lucide:archive",
    variant: "ghost",
  },
];
</script>
<template>
  <div class="flex gap-6 lg:h-[calc(97dvh-3.5rem)] overflow-hidden">
    <!-- Sidebar mail -->
    <div class="hidden xl:block w-64 h-full">
      <Nav class="h-full" :links="links" />
    </div>

    <!-- Main content -->
    <div class="flex flex-col h-full w-full gap-3 relative">
      <div
        class="flex gap-2 lg:max-w-[30rem] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2"
      >
        <!-- ✅ แสดง Nav ใน Drawer (เฉพาะจอเล็ก) -->
        <Sheet>
          <SheetTrigger as-child class="lg:hidden">
            <Button variant="outline"> <Menu /> </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Nav :links="links" />
          </SheetContent>
        </Sheet>

        <!-- ✅ กล่องค้นหา -->
        <form class="w-full">
          <div class="relative">
            <Search
              class="absolute left-2 top-2.5 size-4 text-muted-foreground"
            />
            <Input
              v-model="searchValue"
              placeholder="ค้นหา"
              class="pl-8 w-full"
            />
          </div>
        </form>
      </div>
      <div class="h-full">
        <!-- ✅ รายการเมล -->
        <MailList
          v-model:selected-mail="selectedMail"
          :items="filteredMailList"
        />
      </div>
      <div
        :class="[
          'absolute z-[2] bg-background w-full xl:w-[50%] h-full xl:border border-muted-800 rounded-md transition-transform duration-200 ease-in-out top-0 overflow-y-auto',
          mailStore.selectMail.length !== 0
            ? 'translate-x-0 xl:translate-x-[101%] '
            : 'translate-x-full xl:translate-x-[200%]',
        ]"
      >
        <MailDisplay :mail="selectedMailData" />
      </div>
    </div>
  </div>
</template>
