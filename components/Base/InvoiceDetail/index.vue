<script setup lang="ts">


const props = defineProps<{
  open: boolean;
}>();


</script>

<template>
  <div>
    <Dialog v-model:open="props.open">
    <DialogContent
      class="w-full flex flex-col"
    >
      <DialogHeader>
        <DialogTitle>รายละเอียดการชำระเงิน</DialogTitle>
      </DialogHeader>
      <DialogContent class="max-h-[90dvh] max-w-[850px]">
        <BaseInvoiceDetailTabs class="h-full" />
      </DialogContent>
      <DialogFooter class="flex justify-end gap-2 print:hidden">
        <Button variant="outline">พิมพ์</Button>
        <Button>ดาวน์โหลด PDF</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </div>
</template>