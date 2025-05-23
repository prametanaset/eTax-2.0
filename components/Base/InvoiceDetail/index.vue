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

const activeTab = ref("account");
</script>

<template>
  <div>
    <Tabs v-model="activeTab" class="w-full">
      <TabsList>
        <TabsTrigger value="account">รายละเอียด</TabsTrigger>
        <TabsTrigger value="status">สถานะ</TabsTrigger>
        <TabsTrigger value="history">ประวัติ</TabsTrigger>
      </TabsList>

      <Separator class="my-4" />

      <transition name="slide-fade" mode="out-in">
        <component :is="'div'" :key="activeTab">
          <TabsContent value="account">
            <BaseInvoiceDetailTest />
          </TabsContent>

          <TabsContent value="status">
            <BaseInvoice />
          </TabsContent>

          <TabsContent value="history">
            <BaseInvoiceDetailTest2 />
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
