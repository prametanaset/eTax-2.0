<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Mail,
  Printer,
  FileDown,
  TriangleAlert,
} from "lucide-vue-next";
import { LazyBaseInvoiceDetailTabs, NuxtLink } from "#components";

defineProps<{
  payment: {
    id: string;
  };
}>();

defineEmits<{
  (e: "expand"): void;
}>();

const openDialog = ref(false);

function copy(id: string) {
  navigator.clipboard.writeText(id);
}

const activeTab = ref("account");

</script>

<template>
  <div>
    <Dialog v-model:open="openDialog">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="h-8 w-8 p-0">
            <span class="sr-only">Open menu</span>
            <MoreHorizontal class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
  class="cursor-pointer"
  @click="
    $emit('expand');
    openDialog = true;
  "
>
  ดูรายละเอียด
</DropdownMenuItem>

          <DropdownMenuItem class="cursor-pointer"
            >ดาวน์โหลดไฟล์ PDF</DropdownMenuItem
          >

          <!-- Optional actions -->
          <!--
            <DropdownMenuItem @click="copy(payment.id)">Copy payment ID</DropdownMenuItem>
            <DropdownMenuItem @click="$emit('expand')">Expand</DropdownMenuItem>
          -->

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Edit</DropdownMenuLabel>
          <DropdownMenuItem class="cursor-pointer">เพิ่มหนี้</DropdownMenuItem>
          <NuxtLink to="/credit_notes">
            <DropdownMenuItem class="cursor-pointer">ลดหนี้</DropdownMenuItem>
          </NuxtLink>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-red-500">ยกเลิก</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent class="sm:max-w-[850px] h-[95dvh] overflow-y-auto gap-0 p-0 outline-none">
        <DialogHeader class="px-4 pb-4 pt-5">
          <DialogTitle>รายละเอียดใบแจ้งหนี้</DialogTitle>
          <DialogDescription>
            <br />
          </DialogDescription>
          <Tabs v-model="activeTab">
            <TabsList class="inline-flex space-x-2 p-0 bg-transparent">
              <TabsTrigger
                class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="account"
                >รายละเอียด</TabsTrigger
              >
              <TabsTrigger
                class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="status"
                >ใบแจ้งหนี้</TabsTrigger
              >
              <TabsTrigger
                class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="history"
                >ประวัติ</TabsTrigger
              >
            </TabsList>
          </Tabs>
        </DialogHeader>
        <!-- 👇 เฉพาะส่วนนี้ที่ scroll ได้ -->
        <div class="overflow-y-auto overflow-x-hidden h-[70vh]">
          <!-- <div class="h-[300dvh]"> -->
          <div>
            <BaseInvoiceDetailTabs v-model="activeTab"></BaseInvoiceDetailTabs>
          </div>
        </div>
        <DialogFooter class="flex items-center border-t sm:justify-between p-4 py-1 bg-slate-100">
          <!-- Action Buttons -->
          <p class="flex items-center gap-2 font-medium text-xs text-gray-700">
            <TriangleAlert class="w-5 h-5" /> ไฟล์นี้เป็น PDF/A-3 ยังไม่ได้ประทับเวลาหรือ Timestamp<br />
            (สำหรับเอกสารทางกฎหมาย กรุณาตรวจสอบสถานะประทับเวลาก่อนใช้งาน)
          </p>

          <div class="flex flex-wrap gap-2">
            <Button variant="outline" ><Printer /> พิมพ์ </Button>
            <Button variant="outline"> <Mail /> ส่งอีเมล </Button>
            <Button variant="outline"> <FileDown /> ดาวน์โหลด PDF </Button>
          </div>

          <!-- Close Button -->
          <!-- <Button type="button" @click="openDialog = false"> ปิด </Button> -->
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
