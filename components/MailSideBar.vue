<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Mail,
  Frame,
  GalleryVerticalEnd,
  Inbox,
  Star,
  Trash,
  Send,
  Search,
  PieChart,
  Map,
} from "lucide-vue-next";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.png",
  },
  teams: [
    {
      name: "บริษัท ซันสเกลอัพ จำกัด",
      logo: GalleryVerticalEnd,
      plan: "สำนักงานใหญ่",
    },
    {
      name: "บริษัท ซันสเกลอัพ จำกัด",
      logo: AudioWaveform,
      plan: "สาขาที่ 1",
    },
    {
      name: "บริษัท ซันสเกลอัพ จำกัด",
      logo: Command,
      plan: "สาขาที่ 2",
    },
  ],
  navMain: [
    {
      title: "กล่องจดหมาย",
      url: "/mail",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "กล่องจดหมายจาก ETDA",
      url: "",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "ติดดาว",
      url: "",
      icon: Star,
    },
    {
      title: "ส่งแล้ว",
      url: "",
      icon: Send,
    },
    {
      title: "ถังขยะ",
      url: "",
      icon: Trash,
    },
  ],
  projects: [
    {
      name: "กล่องจดหมาย",
      url: "/mail",
      icon: Inbox,
    },
    {
      name: "ส่งแล้ว",
      url: "/mail/fromedta",
      icon: Send,
    },
    // {
    //   name: "Travel",
    //   url: "/mail/sendcustomer",
    //   icon: Map,
    // },
  ],
};
</script>

<template>
  <div class="w-[280px] pt-2">
    <SidebarHeader>
      <MailSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <BaseMailNotionSearchMail class="" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <!-- <NavUser :user="data.user" /> -->
    </SidebarFooter>
    <SidebarRail />
  </div>
</template>
