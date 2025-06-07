<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  color: string
  range: 'today' | 'week' | 'month' | 'year'
}>()

const now = new Date()

const addDays = (d: number) => new Date(now.getTime() + d * 86400000)

const areaChart1 = computed(() => {
  const dataMap: Record<string, { x: number; y: number }[]> = {
    today: Array.from({ length: 7 }, (_, i) => ({
      x: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9 + i).getTime(), // 9:00 - 15:00
      y: 100 + Math.floor(Math.random() * 50),
    })),
    week: Array.from({ length: 7 }, (_, i) => ({
      x: addDays(i).getTime(),
      y: Math.floor(Math.random() * 500),
    })),
    month: Array.from({ length: 7 }, (_, i) => ({
      x: new Date(now.getFullYear(), now.getMonth(), i + 1).getTime(),
      y: 1000 + i * 100,
    })),
    year: Array.from({ length: 12 }, (_, i) => ({
      x: new Date(now.getFullYear(), i, 1).getTime(),
      y: 3000 + i * 200,
    })),
  }

  return {
    series: [
      {
        name: 'ยอดขาย',
        data: dataMap[props.range],
      },
    ],
  }
})

const chartOptions2 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 100,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [props.color],
    stroke: {
      curve: 'smooth',
      width: 0
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Users : $'
        }
      }
    }
  };
});


const chartOptions1 = computed(() => ({
  chart: {
      type: 'area',
      height: 100,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true
      }
    },
  dataLabels: { enabled: false },
  colors: [props.color],
  fill: {
    type: 'gradient',
    opacity: 0.9,
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  stroke: { curve: 'smooth', width: 0 },
  tooltip: {
    shared: true,
    x: {
      show: true,
      formatter: (val: number) => {
        const date = new Date(val)
        switch (props.range) {
          case 'today':
            return date.toLocaleTimeString('th-TH', {
              hour: '2-digit',
              minute: '2-digit',
            }) + ' น.'
          case 'week':
            return 'วัน' + date.toLocaleDateString('th-TH', { weekday: 'long' })
          case 'month':
          case 'year':
            return date.toLocaleDateString('th-TH', { month: 'short' })
          default:
            return val.toString()
        }
      },
    },
    y: {
      title: {
        formatter: () => 'ใบแจ้งหนี้ :',
      },
    },
  },
}))
</script>

<template>
  <ClientOnly>
    <ApexChart
      class="dark:text-black h-full w-full"
      type="bar"
      :options="chartOptions2"
      :series="[
    {
      name: 'Users',
      data: [
        220, 0, 240, 220, 225, 215, 205, 195, 185, 150, 185, 195, 80, 205, 215, 225, 240, 225, 215, 205, 80, 215, 225, 240, 215, 210, 190
      ]
    }
  ]"
      height="80px"
    />
  </ClientOnly>
</template>
