<script setup lang="ts">
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ref } from "vue";

const invoiceRef = ref<HTMLElement | null>(null)

const modelValue = defineModel<string>() 
const props = defineProps<{
  printTargetId?: string
}>();
</script>

<template>
  <div >
    <Tabs v-model="modelValue">
      <!-- <TabsList>
        <TabsTrigger value="account">รายละเอียด</TabsTrigger>
        <TabsTrigger value="status">ใบกำกับภาษี</TabsTrigger>
        <TabsTrigger value="history">ประวัติ</TabsTrigger>
      </TabsList> -->

      <transition name="slide-fade" mode="out-in">
        <component :is="'div'" :key="modelValue" >
          <TabsContent value="account">
            <BaseInvoiceDetailInfo />
          </TabsContent>

          <TabsContent value="status" >
            <BaseInvoice  style="zoom: 90%;" />
          </TabsContent>

          <TabsContent value="history">
            <BaseInvoiceDetailTimeline />
          </TabsContent>
        </component>
      </transition>
    </Tabs>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
