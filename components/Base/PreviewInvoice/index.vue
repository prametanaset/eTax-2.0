<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Printer } from "lucide-vue-next";
import printComponent from "@/utils/printComponent";

const printSection = ref<HTMLElement | null>(null);
const htmlInvoice = `
  <h4>เอกสารนี้ได้จัดทำและส่งข้อมูลให้แก่กรมสรรพากรด้วยวิธีการทางอิเล็กทรอนิกส์</h4>

  <h1>Invoice Test Drive</h1>
      <p>This is the content to print.</p>
`;

const device = useDevice();
</script>

<template>
  <Dialog class="w-full">
    <DialogTrigger as-child>
      <Button variant="outline" class="bg-[hsl(var(--card))]">
        <Eye />ตัวอย่าง
      </Button>
    </DialogTrigger>
    <DialogContent
      class="p-0 max-w-[850px] md:aspect-[210/297] grid grid-rows-[auto_1fr_auto] max-h-[90dvh] overflow-hidden rounded-lg"
    >
      <!-- Header -->
      <DialogHeader class="pb-0 pt-2">
        <DialogTitle class="text-base text-center">ตัวอย่าง</DialogTitle>
        <div class="flex justify-end pr-4 pt-2">
          <Button v-print="'#invoice'"><Printer /></Button>
        </div>
      </DialogHeader>

      <!-- Scrollable A4 Content -->
      <div class="overflow-auto">
        <div :style="{ zoom: device.isMobile ? '48%' : '80%' }">
          <BaseInvoice id="invoice" />
        </div>
      </div>

      <!-- Footer -->
      <DialogFooter class="p-6 pt-0">
        <Button type="submit">ซ่อน</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
