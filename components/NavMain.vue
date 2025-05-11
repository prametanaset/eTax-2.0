<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-vue-next";
import { useRoute } from "vue-router";

defineProps<{
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    newTab?: boolean;
  }[];
}>();

const route = useRoute();
</script>

<template>
  <SidebarGroup>
    <!-- <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel> -->
    <SidebarMenu class="pl-1 pr-3">
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton
          as-child
          :tooltip="item.title"
          :is-active="route.path === item.url && !item.newTab"
        >
          <template v-if="item.newTab">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 py-5"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span class="text-md font-semibold">{{ item.title }}</span>
            </a>
          </template>
          <template v-else>
            <NuxtLink :to="item.url" class="flex items-center gap-2 py-5">
              <component :is="item.icon" v-if="item.icon" />
              <span class="text-md font-medium">{{ item.title }}</span>
            </NuxtLink>
          </template>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>

