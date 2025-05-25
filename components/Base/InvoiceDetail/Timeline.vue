<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, CheckCircle, FileText, XCircle, Send, Circle, Download } from 'lucide-vue-next'

const timeline = ref([
  {
    id: 1,
    title: 'สร้างใบแจ้งหนี้',
    date: '1 พฤษภาคม 2568',
    description: 'ระบบได้สร้างใบแจ้งหนี้เรียบร้อยแล้ว และบันทึกลงฐานข้อมูล.',
    icon: Circle,
  },
  {
    id: 2,
    title: 'ส่งใบแจ้งหนี้ให้ลูกค้า',
    date: '1 พฤษภาคม 2568 - 10:30 น.',
    description: 'ระบบได้ส่งใบแจ้งหนี้ให้ลูกค้าทางอีเมลเรียบร้อยแล้ว.',
    icon: Circle,
  },
  {
    id: 3,
    title: 'ได้รับชำระเงิน',
    date: '3 พฤษภาคม 2568 - 14:15 น.',
    description: 'ลูกค้าได้ชำระเงินเรียบร้อยแล้วผ่านการโอนเงินผ่านธนาคาร.',
    icon: Circle,
  },
  {
    id: 4,
    title: 'ปิดใบแจ้งหนี้',
    date: '4 พฤษภาคม 2568',
    description: 'สถานะใบแจ้งหนี้ถูกอัปเดตเป็น "ปิดบัญชี" เรียบร้อยแล้ว.',
    icon: Circle,
  },
  {
    id: 5,
    title: 'ดำเนินการคืนเงิน (ถ้ามี)',
    tag: 'Latest',
    date: '6 พฤษภาคม 2568',
    description: 'มีการคืนเงินบางส่วนให้กับลูกค้า เนื่องจากมีการชำระเงินเกิน.',
    icon: Circle,
    button: {
      label: 'Download ZIP',
      icon: Download,
      href: '#',
    },
  },
])
</script>

<template>
  <Card class="bg-background border-none">
    <CardContent class="pt-6 pb-8 pl-[10rem]">
      <ol class="relative border-s border-muted space-y-10">
        <li
          v-for="item in timeline"
          :key="item.id"
          class="ms-6 relative flex flex-col gap-2"
        >
          <!-- Icon -->
          <div
            class="absolute -start-9 top-0 w-6 h-6 flex items-center justify-center bg-background ring-4 ring-white dark:ring-gray-900 rounded-full border"
          >
            <component :is="item.icon" class="w-4 h-4 stroke-[3] text-primary" />
          </div>

          <!-- Title & Tag -->
          <div class="flex items-center gap-2">
            <h3 class="text-base font-semibold text-foreground">
              {{ item.title }}
            </h3>
            <Badge v-if="item.tag">{{ item.tag }}</Badge>
          </div>

          <!-- Date -->
          <time class="text-sm text-muted-foreground">
            Released on {{ item.date }}
          </time>

          <!-- Description -->
          <p class="text-sm text-muted-foreground">
            {{ item.description }}
          </p>

          <!-- Optional Button -->
          <a
            v-if="item.button"
            :href="item.button.href"
            class="inline-flex items-center text-sm mt-2 gap-2 text-primary hover:underline"
          >
            <component :is="item.button.icon" class="w-4 h-4" />
            {{ item.button.label }}
          </a>
        </li>
      </ol>
    </CardContent>
  </Card>
</template>
