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
      <div
        :class="[
          'w-full  mx-auto px-4 pt-6 overflow-x-hidden',
          route.path == '/mail' ? '' : 'max-w-[1440px]',
        ]"
      >
        <div v-if="route.path !== '/mail'" class="flex items-center gap-2">
          <h1 class="text-2xl font-semibold">{{ route.meta.title }}</h1>
        </div>
        <div :class="[route.path == '/mail' ? '' : 'pt-4']" id="main">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
