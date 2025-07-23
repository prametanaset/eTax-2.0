<script lang="ts">
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full";
</script>

<script setup lang="ts">

import { Inbox, ChevronDown } from "lucide-vue-next";
import type { LinkProp } from "~/components/Base/MailNotion/Nav.vue";

const route = useRoute();

const data = {
  user: {
    name: "ธนเสฏฐ์ ศรีรัตน์ดา",
    email: "prametanaset147@gmail.com",
    avatar: "/avatars/shadcn.png",
  },
};

const isOnline = ref(true);

const toggleDotColor = () => {
  isOnline.value = !isOnline.value;
};

const tooltipClass = computed(() =>
  isOnline.value
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800"
);

const isStuck = ref(false);
const sentinel = ref<HTMLElement | null>(null);
const open = ref(true);
const isLg = useMediaQuery("(min-width: 1457px)");

onMounted(() => {
  const observer = new IntersectionObserver(
    ([e]) => {
      isStuck.value = !e.isIntersecting;
    },
    { threshold: [1] }
  );
  if (sentinel.value) {
    observer.observe(sentinel.value);
  }

  // ตั้งค่าครั้งแรกตามขนาดจริงบน client
  open.value = isLg.value;

  // ฟังการเปลี่ยนแปลงครั้งต่อ ๆ ไป
  watch(isLg, (val) => {
    open.value = val;
  });
});

watch(
  () => route.path,
  (newPath) => {
    if (
      newPath === "/mail" ||
      newPath === "/mail/sendcustomer" ||
      newPath === "/mail/fromedta"
    ) {
      open.value = false;
    } else {
      open.value = isLg.value; // กลับมาตามขนาดจอ
    }
  },
  { immediate: true } // ให้ทำงานทันทีตอน mounted
);
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

const titleNav = ref("");
const { data: session, status } = useAuth();
watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/mail") {
      titleNav.value = "Inbox";
      // query.value = `from:csemail@etax.teda.th OR from:${profileStore.user?.username}`;
    } else if (newPath === "/mail/fromedta") {
      titleNav.value = "จาก ETDA";
    } else if (newPath === "/mail/sendcustomer") {
      titleNav.value = "ที่ส่งให้ลูกค้า";
    }
  },
  { immediate: true }
);
// เปิด/ปิดตามขนาดจอ
// watch(isLg, (val) => open.value = val, { immediate: true });

</script>

<template>
  <SidebarProvider v-model:open="open">
    <AppSidebar />
    <SidebarInset
  v-if="
    session?.googleAccessToken &&
    ['/mail', '/mail/sendcustomer', '/mail/fromedta'].includes(route.path)
  "
>
  <div class="flex h-screen w-full ">
    <!-- Sidebar -->
    <!-- <div
      class="shrink-0 w-[15rem] border-r border-muted-200 dark:border-muted-700"
    >
      <BaseMailNotionNav :links="links" :is-collapsed="false" />
    </div> -->
    <MailSideBar />

    <!-- Right Section -->
    <div class="flex flex-col flex-1 h-screen overflow-hidden">
      <!-- Header -->
      <header
        :class="[
          'sticky top-0 flex h-14 shrink-0 z-50 items-center gap-2 transition-all bg-[hsl(var(--card))] border-l border-muted-200 dark:border-muted-700',
          isStuck ? 'shadow-sm' : '',
        ]"
      >
      <Transition name="fade" mode="out-in">
        <h1 :key="titleNav" class="text-md font-semibold flex items-center gap-2 px-16"><Inbox class="h-4 w-4" /> {{ titleNav }}</h1>
        </Transition>
      </header>

      <!-- Main content -->
      <div class="flex-1 overflow-y-auto border-l border-muted-200 dark:border-muted-700">
        <div id="main">
          <slot />
        </div>
      </div>
    </div>
  </div>
</SidebarInset>

    <SidebarInset
      v-else
      :class="[
        route.path == '/mail' ||
        route.path == '/mail/sendcustomer' ||
        route.path == '/mail/fromedta'
          ? 'relative overflow-x-hidden'
          : '',
      ]"
    >
      <!-- Invisible marker -->
      <header
        v-if="
          !['/mail', '/mail/sendcustomer', '/mail/fromedta'].includes(
            route.path
          )
        "
        :class="[
          'sticky top-0 flex h-14 shrink-0 z-50 bg-[hsl(var(--background))] items-center gap-2 transition-all',
          isStuck ? 'shadow-sm ' : '',
        ]"
      >
        <div class="flex items-center justify-between w-full px-4 pr-2">
          <div id="bread-crumb" class="flex items-center">
            <SidebarTrigger />
            <!-- <Separator v-if="route.name !== 'index'" orientation="vertical" class="mr-2 h-4" /> -->
            <Separator orientation="vertical" class="mr-2 h-4" />

            <!-- <Breadcrumb v-if="route.name !== 'index'"> -->
            <Breadcrumb>
              <BreadcrumbList>
                <!-- <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="/">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" /> -->
                <!-- <BreadcrumbItem>
                  <BreadcrumbPage>{{ route.meta.title }}</BreadcrumbPage>
                </BreadcrumbItem> -->
              </BreadcrumbList>
            </Breadcrumb>
            <Transition name="fade" mode="out-in">
              <p class="text-xl font-semibold" :key="route.meta.title">
                {{ route.meta.title }}
              </p>
            </Transition>
          </div>

          <div id="profile" class="flex items-center gap-3">
            <!-- <Badge
              variant="outline"
              class=" text-green-600 border-green-500 px-1 py-2 mr-2 text-sm font-light leading-none rounded-lg whitespace-nowrap"
            >
              <MailCheck class="h-4 mr-1" />e-Tax พร้อมใช้งาน
            </Badge> -->

            <!-- <TooltipProvider :delay-duration="100">
              <Tooltip>
                <TooltipTrigger as-child>
                  <BaseDotNoti
                    :color="isOnline ? '#44ec83' : '#facc70'"
                    class="cursor-pointer"
                    @click="toggleDotColor"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  align="center"
                  :class="[
                    'text-sm px-3 mr-2 py-1.5 rounded-md shadow',
                    tooltipClass,
                  ]"
                >
                  <p>
                    {{
                      isOnline ? "e-Tax พร้อมใช้งาน" : "e-Tax ไม่พร้อมใช้งาน"
                    }}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <BaseFeedback />

            <Separator
              orientation="vertical"
              class="h-5 mx-1 w-px bg-muted-300"
            />

            <NavUser2 :user="data.user" /> -->
          </div>
        </div>
      </header>
      <!-- Layout.vue -->
      <div
        :class="[
          'w-full mx-auto pt-0 ',
          route.path == '/mail' ||
          route.path == '/mail/sendcustomer' ||
          route.path == '/mail/fromedta'
            ? ''
            : 'max-w-[1440px] px-4 pb-6',
        ]"
      >
        <div v-if="false" class="flex items-center gap-2">
          <!-- <NuxtLink to="/"  v-if="route.name !== 'index'">
            <svg
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </NuxtLink> -->
          <h1 class="text-2xl font-semibold">{{ route.meta.title }}</h1>
        </div>
        <div
          :class="[
            route.path == '/mail' ||
            route.path == '/mail/sendcustomer' ||
            route.path == '/mail/fromedta'
              ? ''
              : 'pt-4',
          ]"
          id="main"
        >
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
