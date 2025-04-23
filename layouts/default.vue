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

const route = useRoute();

const data = {
  user: {
    name: "shadcn",
    email: "prametanaset147@gmail.com",
    avatar: "/avatars/shadcn.png",
  },
};
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center justify-between w-full px-4 pr-2">
          <div id="bread-crumb" class="flex items-center">
            <SidebarTrigger class="-ml-1" />
            <Separator
              v-if="route.name !== 'index'"
              orientation="vertical"
              class="mr-2 h-4"
            />
            <Breadcrumb v-if="route.name !== 'index'">
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="/"> e-Tax </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{{ route.meta.title }}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div id="profile">
            <NavUser2 :user="data.user" />
          </div>
        </div>
      </header>
      <!-- Layout.vue -->
      <div class="w-full max-w-[1440px] mx-auto px-4 pt-6 overflow-x-hidden">
        <div class="flex items-center gap-2">
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
        <div class="mt-4" id="main">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
