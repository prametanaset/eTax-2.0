<script lang="ts">
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full";
</script>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MailCheck } from "lucide-vue-next";

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
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
     <div ref="sentinel" class="h-1"></div> <!-- Invisible marker -->
    <header
      :class="[
        'sticky top-0 flex h-14 shrink-0 z-50 bg-[hsl(var(--background))] items-center gap-2 transition-all',
        isStuck ? 'border-b border-gray-150 ' : ''
      ]"
    >
        <div class="flex items-center justify-between w-full px-4 pr-2">
          <div id="bread-crumb" class="flex items-center">
            <SidebarTrigger class="-ml-1" />
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

            <p class="text-xl font-semibold opacity-95">{{ route.meta.title }}</p>
          </div>

          <div id="profile" class="flex items-center">
            <!-- <Badge
              variant="outline"
              class=" text-green-600 border-green-500 px-1 py-2 mr-2 text-sm font-light leading-none rounded-lg whitespace-nowrap"
            >
              <MailCheck class="h-4 mr-1" />e-Tax พร้อมใช้งาน
            </Badge> -->

            <TooltipProvider :delay-duration="100" >
              <Tooltip>
                <TooltipTrigger as-child class="mr-2">
                  <BaseDotNoti
                    :color="isOnline ? '#44ec83' : '#facc70'"
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

            <Separator orientation="vertical" class="h-5 mx-1 w-px bg-muted-300" />

            <NavUser2 :user="data.user" />
          </div>
        </div>
      </header>
      <!-- Layout.vue -->
      <div
        :class="[
          'w-full  mx-auto px-4 pt-0',
          route.path == '/mail' ? '' : 'max-w-[1440px]',
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
        <div :class="[route.path == '/mail' ? '' : 'pt-4']" id="main">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
