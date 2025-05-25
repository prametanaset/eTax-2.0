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
import { MoreHorizontal } from "lucide-vue-next";
import { LazyBaseInvoiceDetailTabs } from "#components";

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

          <DropdownMenuItem class="cursor-pointer" @click="openDialog = true">
            ดูรายละเอียด
          </DropdownMenuItem>

          <DropdownMenuItem>ดาวน์โหลดไฟล์ PDF</DropdownMenuItem>

          <!-- Optional actions -->
          <!--
            <DropdownMenuItem @click="copy(payment.id)">Copy payment ID</DropdownMenuItem>
            <DropdownMenuItem @click="$emit('expand')">Expand</DropdownMenuItem>
          -->

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Edit</DropdownMenuLabel>
          <DropdownMenuItem>เพิ่มหนี้</DropdownMenuItem>
          <DropdownMenuItem>ลดหนี้</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-red-500">ยกเลิก</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent class="sm:max-w-[850px] h-[95dvh] overflow-y-auto">
        <DialogHeader class="gap-y-0">
          <DialogTitle>รายละเอียดใบแจ้งหนี้</DialogTitle>
          <DialogDescription>
            ตัวอย่างเนื้อหา Dialog แบบ scrollable
          </DialogDescription>
          <div class="flex gap-2">
            <Button variant="secondary" size="sm" class="hover:bg-gray-300/60" @click="activeTab = 'account'">รายละเอียด</Button>
            <Button variant="secondary" size="sm" class="hover:bg-gray-300/60"  @click="activeTab = 'status'">ใบแจ้งหนี้</Button>
            <Button variant="secondary" size="sm" class="hover:bg-gray-300/60" @click="activeTab = 'history'">ประวัติ</Button>
          </div>
        </DialogHeader>
        <!-- 👇 เฉพาะส่วนนี้ที่ scroll ได้ -->
        <div class="overflow-y-auto overflow-x-hidden max-h-[70vh]">
            <!-- <div class="h-[300dvh]"> -->
            <div>
              <BaseInvoiceDetailTabs
                v-model="activeTab"
              ></BaseInvoiceDetailTabs>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" @click="openDialog = false">ปิด</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
