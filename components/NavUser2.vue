<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/vue";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-vue-next";

const props = defineProps<{
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}>();

const linkData = [
  {
    title: "อัปเกรดบริการของคุณ",
    icon: Sparkles,
    link: "",
  },
  {
    title: "โปรไฟล์",
    icon: BadgeCheck,
    link: "/profile",
  },
  {
    title: "ดูบริการ",
    icon: CreditCard,
    link: "",
  },
  {
    title: "การแจ้งเตือน",
    icon: Bell,
    link: "",
  },
];

const { isMobile } = useSidebar();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground px-3"
          >
            <!-- <ChevronsUpDown class="ml-auto size-4" /> -->
            <Avatar class="h-8 w-8 rounded-full">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-full"> CN </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm">
              <span class="truncate font-semibold leading-snug">{{ user.name }}</span>
              <span class="truncate text-xs font-light leading-none">{{ user.email }}</span>
            </div>

          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <!-- <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'left'"
          align="end"
          :side-offset="4"
        > -->
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'bottom'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <!-- <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-full">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div> -->
            <ThemeToggle />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
  <NuxtLink
    v-for="(data, index) in linkData"
    :key="index"
    :to="data.link"
    class="no-underline"
  >
    <DropdownMenuItem class="cursor-pointer font-light flex gap-2">
      <component :is="data.icon" v-if="data.icon" class="w-4" />
      {{ data.title }}
    </DropdownMenuItem>
  </NuxtLink>
</DropdownMenuGroup>

          <DropdownMenuSeparator />
          <NuxtLink to="/login">
            <DropdownMenuItem class="cursor-pointer font-semibold">
              <LogOut />
              ลงชื่อออก
            </DropdownMenuItem>
          </NuxtLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
