<template>
  <div>
    <!-- Charts -->
    <!-- Charts -->
    <!-- <div
  v-if="!device.isMobile"
  class="grid gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-[60px]"
> -->
  <div
    v-if="!isMobile"
    class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-[50px] mt-1"
  >
    <div
      v-for="(widget, index) in widgets"
      :key="index"
      class="relative group"
    >
      <div
        class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[35%] bg-primary-400 blur-xl rounded-full img-shadow-animation"
      ></div>
      <Card
        class="z-10 relative rounded-lg shadow-xl/30 leading-none border img-border-animation p-3 w-full"
        :class="index === widgets.length - 1 ? '!border-primary-500' : ''"
      >
        <BaseWidget
          class="w-full"
          :title="widget.title"
          :count-number="widget.count"
          :percen-last-month="widget.percent"
          :status="widget.status"
          :average-time="widget.averageTime"
        />
      </Card>
    </div>
  </div>
    <div
      v-else
      class="snap-x snap-mandatory flex gap-4 w-[100vw] pl-4 -mx-4 pb-12 overflow-x-auto invisible-scrollbar"
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
            class="absolute top-[60%] right-3 w-[90%] h-[40%] lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
          ></div>
          <Card
            class="z-10 relative rounded-lg shadow-xl/30 leading-none border img-border-animation h-40 min-w-[20rem] p-4"
          >
            <BaseWidget
              class="w-full"
              :title="widget.title"
              :count-number="widget.count"
              :percen-last-month="widget.percent"
              :status="widget.status"
              :average-time="widget.averageTime"
            />
          </Card>
        </div>
      </div>
      <div class="shrink-0"><div class="w-0 shrink-0"></div></div>

      <!-- spacer ขวา -->
      <!-- <div class="shrink-0 w-1" /> -->
    </div>

    <!-- Table -->
    <div
      :class="[
        isMobile ? 'w-[92vw]' : 'w-full overflow-visible pt-2',
        'overflow-hidden',
      ]"
    >
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

useHead({
  title: "e-Tax - หน้าแรก",
  meta: [
    {
      name: "description",
      content:
        "ระบบจัดการใบกำกับภาษีอิเล็กทรอนิกส์สำหรับธุรกิจไทย ใช้งานง่าย ปลอดภัย และถูกต้องตามกฎหมาย",
    },
  ],
});

const isMobile = useMediaQuery('(max-width: 768px)')


const widgets = [
  { title: "ส่งแล้ว", count: 10, percent: -7.5, status: "success", averageTime: 10 },
  { title: "รอดำเนินการ", count: 5, percent: 7.5, status: "warning", averageTime: 5 },
  { title: "ยกเลิก", count: 0, percent: -7.5, status: "cancel", averageTime: 0 },
  { title: "ทั้งหมด", count: 1330, percent: 7.5, status: "money", averageTime: 15 },
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
