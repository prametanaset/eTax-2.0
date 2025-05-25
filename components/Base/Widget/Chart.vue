<script lang="ts" setup>
const props = defineProps<{
  color: string
  range: 'today' | 'week' | 'month' | 'year'
}>()

const chartOptions1 = computed(() => ({
  chart: {
    type: 'area',
    fontFamily: `inherit`,
    sparkline: { enabled: true },
  },
  dataLabels: { enabled: false },
  colors: [props.color],
  fill: {
    type: 'gradient',
    opacity: 0.9,
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  stroke: { curve: 'smooth', width: 1.2 },
  tooltip: {
    x: { show: false },
    y: { title: { formatter: () => 'Sales :' } },
  },
}))

const areaChart1 = computed(() => {
  const dataMap: Record<string, number[]> = {
    today: [100, 120, 90, 110, 130, 125, 140],
    week: [200, 600, 100, 400, 300, 400, 50],
    month: [1200, 1300, 1400, 1350, 1250, 1380, 1420],
    year: [4000, 3000, 5000, 4500, 4700, 4900, 5200],
  }

  return {
    series: [
      {
        name: 'Sales',
        data: dataMap[props.range],
      },
    ],
  }
})
</script>

<template>
  <div>
    <ClientOnly>
      <ApexChart
        class="dark:text-black h-full w-full"
        type="area"
        :options="chartOptions1"
        :series="areaChart1.series"
      />
    </ClientOnly>
  </div>
</template>
