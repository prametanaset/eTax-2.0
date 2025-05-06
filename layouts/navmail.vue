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
import MailSideBar from "../components/MailSideBar.vue";

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
    <MailSideBar />
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
      <div class="w-full px-4 overflow-x-hidden">
        <div class="mt-4" id="main">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
