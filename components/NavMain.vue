<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { type LucideIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}>()


const route = useRoute()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="item in items"
        :key="item.title"
      >
        <SidebarMenuButton as-child :tooltip="item.title" :is-active="route.path === item.url" >
          <NuxtLink :to="item.url" class="flex items-center gap-2">
            <component :is="item.icon" v-if="item.icon" />
            <span class="text-sm font-semibold">{{ item.title }}</span>
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
