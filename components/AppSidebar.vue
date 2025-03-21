<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  BetweenHorizontalStart ,
  Users,
  Home
} from 'lucide-vue-next'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.png',
  },
  teams: [
    {
      name: 'บริษัท ซันสเกลอัพ จำกัด',
      logo: GalleryVerticalEnd,
      plan: 'สำนักงานใหญ่',
    },
    {
      name: 'บริษัท ซันสเกลอัพ จำกัด',
      logo: AudioWaveform,
      plan: 'สาขาที่ 1',
    },
    {
      name: 'บริษัท ซันสเกลอัพ จำกัด',
      logo: Command,
      plan: 'สาขาที่ 2',
    },
  ],
  navMain: [
    {
      title: 'หน้าแรก',
      url: '/',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/',
        },
      ],
    },
    {
      title: 'ใบกำกับภาษี',
      url: '/invoice',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'รายงานใบกำกับภาษี',
          url: '/invoice',
        },
        {
          title: 'สร้างใบกำกับภาษี',
          url: '/invoice/create/invoice',
        }
      ],
    },
    {
      title: 'จัดการสินค้า',
      url: '/category',
      icon: BetweenHorizontalStart ,
      items: [
        {
          title: 'รายการสินค้า',
          url: '/category',
        },
      ],
    },
    {
      title: 'จัดการพนักงาน',
      url: '/employees',
      icon: Users,
      items: [
        {
          title: 'รายชื่อพนักงาน',
          url: '/employees',
        },
        
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'รายงานใบกำกับภาษี',
      url: '/',
      icon: PieChart,
    },
    {
      name: 'สร้างใบกำกับภาษี',
      url: '/invoice/create/invoice',
      icon: Frame,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
