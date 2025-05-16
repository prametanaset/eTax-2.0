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
import { Eye } from "lucide-vue-next";
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
      <DialogHeader class="pb-0">
        <DialogTitle class="text-base text-center">ตัวอย่าง</DialogTitle>
      </DialogHeader>

      <!-- Scrollable A4 Content -->
      <div class="overflow-auto">
        <div style="zoom: 50%">
          <BaseInvoice />
        </div>
      </div>

      <!-- Footer -->
      <DialogFooter class="p-6 pt-0">
        <Button type="submit">ซ่อน</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
