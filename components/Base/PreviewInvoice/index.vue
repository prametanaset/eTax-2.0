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
      class="p-0 w-[calc(100vw-1rem)] max-w-[794px] md:aspect-[210/297] grid grid-rows-[auto_1fr_auto] max-h-[90dvh] overflow-hidden rounded-lg"
    >
      <!-- Header -->
      <DialogHeader class="p-4 pb-0 md:p-6 md:pb-0">
        <DialogTitle class="text-base md:text-lg">ตัวอย่าง</DialogTitle>
      </DialogHeader>

      <!-- Scrollable A4 Content -->
      <div class="overflow-auto">
        <div class="min-h-full px-4 py-2 md:p-6">
          <BaseInvoice />
        </div>
      </div>

      <!-- Footer -->
      <DialogFooter class="p-4 pt-0 md:p-6 md:pt-0">
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
