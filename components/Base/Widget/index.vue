<template>
  <div
    :class="
      !device.isMobile
        ? 'grid grid-cols-1 md:grid-cols-2 gap-2'
        : 'grid grid-cols-2 md:grid-cols-2 gap-2'
    "
  >
    <!-- ข้อมูล Summary -->
    <div class="flex flex-col justify-between py-1 gap-4">
      <h3 class="font-semibold text-base mb-1 text-muted-700 dark:text-white">
        {{ props.title }}
      </h3>
      <h4
        :class="
          props.status == 'money'
            ? 'text-4xl flex items-center gap-2 font-bold tracking-tight text-primary-500/100 dark:text-white'
            : 'text-4xl font-bold tracking-tight text-gray-800 dark:text-white'
        "
      >
        <Newspaper v-if="props.status == 'money'" />
        {{ props.countNumber.toLocaleString() }}
      </h4>
      <p class="text-muted-500 text-sm font-medium ml-1 dark:text-[#B4B4B4]">
        <span class="text-gray-700 font-semibold dark:text-white">
          {{ props.averageTime.toFixed(1) }}
        </span>
        {{ unitLabel }}
      </p>
    </div>

    <!-- กราฟ + Filter Tabs -->
    <div class="flex flex-col justify-between">
      <!-- Filter Tabs -->
      <Tabs
        v-model="selectedRange"
        class="mb-2 self-start md:self-center lg:self-end"
        :class="!device.isMobile ? '' : '-ml-14 -mt-1'"
      >
        <TabsList class="bg-[hsl(var(--card))]">
          <TabsTrigger value="today" class="data-[state=active]:font-semibold">
            วันนี้
          </TabsTrigger>
          <TabsTrigger value="week" class="data-[state=active]:font-semibold">
            สัปดาห์
          </TabsTrigger>
          <TabsTrigger value="month" class="data-[state=active]:font-semibold">
            เดือน
          </TabsTrigger>
          <TabsTrigger value="year" class="data-[state=active]:font-semibold">
            ปี
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <!-- Chart -->
      <div class="w-full mb-2">
        <BaseWidgetChart :color="statusColor" :range="selectedRange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Newspaper } from "lucide-vue-next";

const device = useDevice();

const props = defineProps<{
  title: string;
  countNumber: number;
  percenLastMonth: number;
  status: string;
  averageTime: number;
}>();

const selectedRange = ref<"today" | "week" | "month" | "year">("week");

// หน่วยตามช่วง
const unitLabel = computed(() => {
  switch (selectedRange.value) {
    case 'today': return 'ใบ/ชั่วโมง'
    case 'week':  return 'ใบ/สัปดาห์'
    case 'month': return 'ใบ/เดือน'
    case 'year':  return 'ใบ/ปี'
  }
})

const statusColor = computed(() => {
  switch (props.status) {
    case "success":
      return "#22c55e";
    case "warning":
      return "#facc15";
    case "cancel":
      return "#ef4444";
    case "money":
      return "#a855f7";
    default:
      return "#6b7280";
  }
});
</script>
