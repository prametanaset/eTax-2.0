<template>
  <div>
    <ClientOnly>
      <ApexChart
        class="dark:text-black"
        type="area"
        :height="'100'"
        :width="'100%'"
        :options="chartOptions1"
        :series="areaChart1.series"
      >
      </ApexChart>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
// chart 1
const chartOptions1 = computed(() => {
  return {
    chart: {
      type: "area",
      fontFamily: `inherit`,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#af38ff"],
    fill: {
      type: "gradient",
      opacity: 0.9,
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "Sales :",
        },
      },
    },
  };
});

const areaChart1 = {
  series: [
    {
      name: "Sales",
      data: [200, 600, 100, 400, 300, 400, 50],
    },
  ],
};
</script>

<style></style>
