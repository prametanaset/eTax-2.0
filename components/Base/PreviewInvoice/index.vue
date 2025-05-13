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
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="bg-[hsl(var(--card))]">
        <Eye />ตัวอย่าง
      </Button>
    </DialogTrigger>
    <DialogContent
      class="p-0 max-h-[90dvh] w-full max-w-[794px] aspect-[210/297] grid grid-rows-[auto_1fr_auto] overflow-hidden"
    >
      <!-- Header -->
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>ตัวอย่าง</DialogTitle>
        <!-- <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
      </DialogHeader>

      <!-- Scrollable A4 Content -->
      <div class="overflow-auto px-6 ">
        <div class="min-h-full">
          <BaseInvoice />
        </div>
      </div>

      <!-- Footer -->
      <DialogFooter class="p-6 pt-0">
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>