<template>
  <div
    :class="
      !isMobile
        ? 'grid grid-cols-1 md:grid-cols-[40%_60%] gap-2'
        : 'grid grid-cols-2 md:grid-cols-2 gap-2'
    "
  >
    <!-- ข้อมูล Summary -->
    <div class="flex flex-col justify-between py-1 gap-1">
      <h3 class="font-medium text-[15px] mb-1  dark:text-white">
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
      <p class=" text-sm font-medium ml-1 dark:text-[#B4B4B4]">
        <span class=" font-semibold dark:text-white">
          {{ props.averageTime.toFixed(0) }}
        </span>
        {{ unitLabel }}
      </p>
    </div>

    <!-- กราฟ + Filter Tabs -->
    <div class="flex flex-col justify-between ">
      <!-- Filter Tabs -->
      <Tabs
        v-model="selectedRange"
        class="mb-2 self-start md:-ml-7 lg:-mt-2 lg:m-0 md:self-center lg:self-end"
        :class="!isMobile ? '' : '-ml-14 -mt-1'"
      >
        <TabsList class="bg-[hsl(var(--card))]">
          <TabsTrigger value="today" class="data-[state=active]:font-semibold data-[state=active]:bg-[hsl(var(--card))] data-[state=active]:shadow-none">
            วันนี้
          </TabsTrigger>
          <TabsTrigger value="week" class="data-[state=active]:font-semibold data-[state=active]:bg-[hsl(var(--card))] data-[state=active]:shadow-none">
            สัปดาห์
          </TabsTrigger>
          <TabsTrigger value="month" class="data-[state=active]:font-semibold data-[state=active]:bg-[hsl(var(--card))] data-[state=active]:shadow-none">
            เดือน
          </TabsTrigger>
          <TabsTrigger value="year" class="data-[state=active]:font-semibold data-[state=active]:bg-[hsl(var(--card))] data-[state=active]:shadow-none">
            ปี
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <!-- Chart -->
      <div class="w-full mb-2 relative blur-sides">
      <!-- <div> -->
        <BaseWidgetChart :color="statusColor" :range="selectedRange" />
      </div>
        
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Newspaper } from "lucide-vue-next";

const device = useDevice();
const isMobile = useMediaQuery('(max-width: 768px)')

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

<style scoped>
.blur-sides {
  /* ต้องมี overflow-hidden เพื่อไม่ให้เบลอเลยออกมานอกกล่อง */
  position: relative;
  overflow: hidden;
}

/* สร้างแผ่นซ้อนที่ขอบซ้ายและขวา แล้วเบลอให้ฟุ้ง */
.blur-sides::before,
.blur-sides::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;               /* ปรับความกว้างแถบเบลอตามต้องการ */
  background-color: white;   /* ใช้สีเดียวกับพื้นหลังข้างหลัง */
  filter: blur(1px);        /* ค่าเบลอ ปรับแต่งได้ตามต้องการ */
  z-index: 10;               /* ให้อยู่เหนือกราฟ แต่ใต้เนื้อหาอื่นๆ ถ้ามี */
}

/* แผ่นเบลอฝั่งซ้าย */
.blur-sides::before {
  left: 0;
  transform: translateX(-50%); /* ขยับครึ่งหนึ่งของความกว้าง ให้มีความฟุ้งทีเดียวทั้งขอบ */
}

/* แผ่นเบลอฝั่งขวา */
.blur-sides::after {
  right: 0;
  transform: translateX(50%);
}

/* Dark mode background for blurred sides */
.dark .blur-sides::before,
.dark .blur-sides::after {
  background-color: #1d283a; /* หรือใช้ theme: dark:bg-gray-900 */
}
</style>l