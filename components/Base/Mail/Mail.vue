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

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [0, 30, 60],
});

const isCollapsed = ref(props.defaultCollapsed);
const selectedMail = ref<string | undefined>(props.mails[0].id);
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

function onCollapse() {
  isCollapsed.value = true;
}

function onExpand() {
  isCollapsed.value = false;
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full items-stretch relative overflow-hidden"
    >
      <ResizablePanel
        v-if="!device.isMobile"
        id="resize-panel-1"
        :default-size="defaultLayout[0]"
        :collapsed-size="navCollapsedSize"
        collapsible
        :min-size="10"
        :max-size="10"
        :class="
          cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out'
          )
        "
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <div
          :class="
            cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2'
            )
          "
        >
          <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
        </div>
        <Separator />
        <Nav :is-collapsed="isCollapsed" :links="links" />
      </ResizablePanel>
      <ResizableHandle
        v-if="!device.isMobile"
        id="resize-handle-1"
        with-handle
      />
      <ResizablePanel
        id="resize-panel-2"
        :default-size="defaultLayout[1]"
        :min-size="30"
      >
        <Tabs default-value="all">
          <div class="flex items-center py-[.38rem] gap-2">
            <Sheet v-if="device.isMobile">
              <SheetTrigger as-child>
                <Button variant="outline"> <Menu /> </Button>
              </SheetTrigger>
              <SheetContent :side="'left'">
                <Nav :links="links" />
              </SheetContent>
            </Sheet>
            <h1 class="text-xl font-bold">Inbox</h1>
            <TabsList class="ml-auto">
              <TabsTrigger
                value="all"
                class="text-zinc-600 dark:text-zinc-200 data-[state=active]:text-primary font-medium"
              >
                ทั้งหมด
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                class="text-zinc-600 dark:text-zinc-200 data-[state=active]:text-primary font-medium"
              >
                ที่ยังไม่อ่าน
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
                <Input
                  v-model="searchValue"
                  placeholder="Search"
                  class="pl-8"
                />
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
      </ResizablePanel>
      <ResizableHandle
        v-if="!device.isMobile"
        id="resiz-handle-2"
        with-handle
      />
      <ResizablePanel
        v-if="!device.isMobile"
        id="resize-panel-3"
        :default-size="defaultLayout[2]"
        :min-size="40"
      >
        <MailDisplay :mail="selectedMailData" />
      </ResizablePanel>
      <div
        v-if="device.isMobile"
        :class="[
          'absolute z-[2] bg-white w-full h-full rounded-md transition-transform duration-200 ease-in-out top-0',
          mailStore.selectMail.length !== 0
            ? 'translate-x-0'
            : 'translate-x-full',
        ]"
      >
        <MailDisplay :mail="selectedMailData" />
      </div>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
