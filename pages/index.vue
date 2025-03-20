<template>
  <div class="max-w-[1440px] m-auto">
    <!-- Charts -->
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-[60px]">
      <div class="relative group">
        <div
          class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
        </div>
        <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 w-full">
          <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
        </Card>
      </div>

      <div class="relative group">
        <div
          class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
        </div>
        <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 w-full">
          <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
        </Card>
      </div>

      <div class="relative group">
        <div
          class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
        </div>
        <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 w-full">
          <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
        </Card>
      </div>

      <div class="relative group sm:col-span-1 md:col-span-3 xl:col-span-1">
        <div
          class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
        </div>
        <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 !border-primary-500 w-full">
          <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
        </Card>
      </div>
    </div>

    <!-- Table -->
    <!-- <div class="w-full rounded-xl bg-muted/50 md:min-h-min">
      <BaseDataTable />
    </div> -->

    <div>
      <ExampleDataTable :data="tasks" :columns="columns"></ExampleDataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { columns } from '@/components/Example/DataTable/columns'
import tasks from '@/components/Example/DataTable/data/tasks.json'

definePageMeta({
  title: "รายงานใบกำกับภาษี",
});
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
</style>