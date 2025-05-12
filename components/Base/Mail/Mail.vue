<script lang="ts" setup>
import type { Mail } from "./data/mail";

import { cn } from "@/lib/utils";
import { refDebounced } from "@vueuse/core";
import { Menu, Search } from "lucide-vue-next";
import { computed, ref } from "vue";
import MailDisplay from "./MailDisplay.vue";
import MailList from "./MailList.vue";
import Nav from "./Nav.vue";

interface MailProps {
  mails: Mail[];
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const device = useDevice();
const props = defineProps<MailProps>();
const sizePanel = ["w-[10%]", "w-[100%]", "w-[0%]"];
const isCollapsed = ref(props.defaultCollapsed);
const selectedMail = ref<string | undefined>();
const searchValue = ref("");
const debouncedSearch = refDebounced(searchValue, 250);

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

const mailStore = useMailStore();

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
  <div class="flex w-full">
    <div v-if="!device.isMobile" :class="sizePanel[0]">
      <Nav :is-collapsed="isCollapsed" :links="links" />
    </div>
    <div
      :class="[
        'transition-all duration-300 px-2',
        mailStore.selectMail.length == 0 ? sizePanel[1] : 'w-[50%]',
      ]"
    >
      <Tabs default-value="all">
        <div class="flex items-center py-[.38rem] gap-2">
          <Sheet v-if="device.isMobile">
            <SheetTrigger as-child>
              <Button variant="outline"> <Menu /> </Button>
            </SheetTrigger>
            <SheetContent :side="'left'">
              <Nav :is-collapsed="isCollapsed" :links="links" />
            </SheetContent>
          </Sheet>
          <h1 class="text-xl font-bold">Inbox</h1>
          <TabsList class="ml-auto">
            <TabsTrigger
              value="all"
              class="text-zinc-600 dark:text-zinc-200 data-[state=active]:text-primary font-medium"
            >
              All mail
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              class="text-zinc-600 dark:text-zinc-200 data-[state=active]:text-primary font-medium"
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <div
          class="bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <form>
            <div class="relative">
              <Search
                class="absolute left-2 top-2.5 size-4 text-muted-foreground"
              />
              <Input v-model="searchValue" placeholder="Search" class="pl-8" />
            </div>
          </form>
        </div>
        <TabsContent value="all" class="m-0">
          <MailList
            v-model:selected-mail="selectedMail"
            :items="filteredMailList"
          />
        </TabsContent>
        <TabsContent value="unread" class="m-0">
          <MailList
            v-model:selected-mail="selectedMail"
            :items="unreadMailList"
          />
        </TabsContent>
      </Tabs>
    </div>
    <div
      :class="[
        'transition-all duration-300',
        mailStore.selectMail.length == 0 && device.isMobile
          ? sizePanel[2]
          : 'w-[50%]',
      ]"
    >
      <MailDisplay v-if="selectedMailData" :mail="mailStore.selectMail" />
      <!-- <div
        v-else
        class="h-full w-full flex items-center justify-center text-muted"
      >
        No mail selected
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
