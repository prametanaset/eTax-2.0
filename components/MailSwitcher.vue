<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const { data } = useAuth();

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ChevronsUpDown, ChevronDown, LogOut } from 'lucide-vue-next'

import { type Component, ref } from 'vue'

const props = defineProps<{
  teams: {
    name: string
    logo: Component
    plan: string
  }[]
}>()

const { isMobile } = useSidebar()
const activeTeam = ref(props.teams[0])
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground py-1"
          >
            <div class="flex aspect-square size-6 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              <Avatar class="h-6 w-6 rounded-full">
                <AvatarImage :src="data?.user?.image" class="h-8 w-8 rounded-full" />
              </Avatar>
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ data?.user?.name }}
              </span>
            </div>
            <ChevronDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'bottom'"
          :side-offset="4"
        >
          <DropdownMenuItem class="pointer-events-none focus:bg-transparent">
            <div class="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              <Avatar class="h-8 w-8 rounded-full">
                <AvatarImage
                  :src="data?.user?.image"
                />
              </Avatar>
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ data?.user?.name }}
              </span>
              <span class="truncate text-xs">{{ data?.user?.email }}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2 cursor-pointer ">
              <LogOut class="size-4" />
            <div class="font-medium text-muted-foreground">
              ออกจากระบบ
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
