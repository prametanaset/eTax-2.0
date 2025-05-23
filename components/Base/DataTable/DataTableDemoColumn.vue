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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-vue-next";

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

      <DialogContent class="sm:max-w-[50%] h-[90%] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>รายละเอียดการชำระเงิน</DialogTitle>
        </DialogHeader>
        <BaseInvoiceDetail></BaseInvoiceDetail>
      </DialogContent>
    </Dialog>
  </div>
</template>
