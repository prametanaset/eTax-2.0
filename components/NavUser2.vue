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
  CreditCardIcon,
  LogOut,
  Settings,
  Sparkles,
  Store,
  User,
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
    title: "ตั้งค่า",
    icon: Settings,
    link: "",
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

const tabTriggerData = [
  {
    title: "โปรไฟล์",
    icon: User,
    value: "profile",
  },
  {
    title: "ร้านค้า",
    icon: Store,
    value: "store",
  },
  {
    title: "ช่องทางชำระเงิน",
    icon: CreditCardIcon,
    value: "payment",
  },
];

const showDialog = ref(false);
const { isMobile } = useSidebar();
const { signOut } = useAuth();
const logOutHandler = async () => {
  try {
    // Logout from server
    await signOut({ callbackUrl: "/" });
  } catch (e) {
    console.log(e);
  }
};


const loading = ref(false)
const error = ref('')

const handleSignOut = async () => {
  loading.value = true
  error.value = ''
  try {
    await signOut({ callbackUrl: '/' })
  } catch (e: any) {
    error.value = e?.message || 'Logout failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent hover:opacity-85 active:bg-transparent"
          >
            <!-- <ChevronsUpDown class="ml-auto size-4" /> -->
            <Avatar class="h-8 w-8 rounded-full">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-full"> CN </AvatarFallback>
            </Avatar>
            <!-- <div class="grid flex-1 text-left text-sm">
              <span class="truncate font-semibold leading-snug">{{
                user.name
              }}</span>
              <span class="truncate text-xs font-light leading-none">{{
                user.email
              }}</span>
            </div> -->
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
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-full">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <!-- <span class="truncate text-xs">{{ user.email }}</span> -->
              </div>
            </div>
            <ThemeToggle />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <template v-for="(data, index) in linkData" :key="index">
              <NuxtLink
                v-if="data.title !== 'ตั้งค่า'"
                :to="data.link"
                class="no-underline"
              >
                <DropdownMenuItem class="cursor-pointer font-normal flex gap-2">
                  <component :is="data.icon" v-if="data.icon" class="w-4" />
                  {{ data.title }}
                </DropdownMenuItem>
              </NuxtLink>

              <DropdownMenuItem
                @click.stop="showDialog = true"
                v-else
                class="cursor-pointer font-normal flex gap-2"
              >
                <component :is="data.icon" v-if="data.icon" class="w-4" />
                {{ data.title }}
              </DropdownMenuItem>
            </template>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            class="cursor-pointer font-semibold"
            @click="handleSignOut"
          >
            <LogOut />
            ลงชื่อออก
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>

  <!-- แสดง Dialog  -->
  <SettingsDialog v-model="showDialog" :tabTriggerData="tabTriggerData" />
</template>
