<template>
  <div>
    <!-- Charts -->
    <!-- Charts -->
    <!-- <div
  v-if="!device.isMobile"
  class="grid gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-[60px]"
> -->
    <div
      v-if="!device.isMobile"
      :class="[
        'grid gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-[60px]',
      ]"
    >
      <div
        v-for="(widget, index) in widgets"
        :key="index"
        class="relative group"
        :class="
          index === widgets.length - 1
            ? 'sm:col-span-1 md:col-span-3 xl:col-span-1'
            : ''
        "
      >
        <div
          class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
        ></div>
        <Card
          class="z-10 relative rounded-md leading-none border img-border-animation p-3 w-full"
          :class="index === widgets.length - 1 ? '!border-primary-500' : ''"
        >
          <BaseWidget
            class="w-full"
            :title="widget.title"
            :count-number="widget.count"
            :percen-last-month="widget.percent"
            :status="widget.status"
          />
        </Card>
      </div>
    </div>

    <div
      v-else
      class="snap-x snap-mandatory flex gap-4 w-[92vw] overflow-x-auto"
    >
      <!-- spacer ซ้าย -->

      <!-- วน widget ทั้งหมด -->
      <div
        v-for="(widget, index) in widgets"
        :key="index"
        class="snap-center snap-always"
      >
        <div class="relative group">
          <div
            class="absolute top-[60%] right-3 w-[90%] h-[50%] lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
          ></div>
          <Card
            class="z-10 relative rounded-lg leading-none border img-border-animation h-40 min-w-[20rem] p-4"
          >
            <BaseWidget
              class="w-full"
              :title="widget.title"
              :count-number="widget.count"
              :percen-last-month="widget.percent"
              :status="widget.status"
            />
          </Card>
        </div>
      </div>

      <!-- spacer ขวา -->
      <!-- <div class="shrink-0 w-1" /> -->
    </div>

    <!-- Table -->
    <div :class="[device.isMobile ? 'w-[92vw]' : 'w-full', 'overflow-hidden']">
      <!-- <BaseInvoiceDataTable
        :data="invoices_100_thai"
        :columns="columns"
      /> -->
      <BaseDataTable />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { columns } from "@/components/Example/DataTable/columns";
import { Card } from "@/components/ui/card";
import invoices_100_thai from "@/public/data/invoices_100_thai.json";

definePageMeta({
  title: "รายงานใบกำกับภาษี",
});
const widgets = [
  { title: "ส่งแล้ว", count: 10, percent: -7.5, status: "success" },
  { title: "รอดำเนินการ", count: 5, percent: 7.5, status: "warning" },
  { title: "ยกเลิก", count: 0, percent: -7.5, status: "cancel" },
  { title: "รายงานทั้งหมด", count: 1330, percent: 7.5, status: "money" },
];

const device = useDevice();
</script>

<style scoped>
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.nui-card {
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(226 232 240 / var(--tw-border-opacity));
}
</style>
