<template>
  <div class="max-w-[1440px] m-auto">
    <!-- Charts -->
    <div v-if="!device.isMobile" class="grid gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-[60px]">
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

    <div v-else
      class="flex items-center justify-start snap-x snap-mandatory gap-6 overflow-x-auto pb-14 -m-3 mt-3 invisible-scrollbar bg-red-400">
      <div class="shrink-0">
        <div class="w-0 shrink-0"></div>
      </div>

      <div class="shrink-0 snap-center">
        <div class="relative group">
          <div
            class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
          </div>
          <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 h-40 w-80 shrink-0">
            <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
          </Card>
        </div>
      </div>

      <div class="shrink-0 snap-center">
        <div class="relative group">
          <div
            class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
          </div>
          <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 h-40 w-80 shrink-0">
            <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
          </Card>
        </div>
      </div>

      <div class="shrink-0 snap-center">
        <div class="relative group">
          <div
            class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
          </div>
          <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 h-40 w-80 shrink-0">
            <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
          </Card>
        </div>
      </div>

      <div class="shrink-0 snap-center">
        <div class="relative group">
          <div
            class="absolute top-[60%] right-3 w-[90%] h-12 lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation">
          </div>
          <Card class="z-10 relative rouded-lg leading-none border img-border-animation p-3 h-40 w-80 shrink-0">
            <BaseWidget class="w-full" :title="'Widget name'" :count-number="5" :percen-last-month="-7.5" />
          </Card>
        </div>
      </div>

      <div class="shrink-0">
        <div class="w-0 shrink-0"></div>
      </div>
    </div>

    <!-- Table -->
    <!-- <div class="w-full rounded-xl bg-muted/50 md:min-h-min">
      <BaseDataTable />
    </div> -->

    <!-- <div>
      <ExampleDataTable :data="invoices_100_thai" :columns="columns"></ExampleDataTable>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { columns } from '@/components/Example/DataTable/columns'
import {
  Card,
} from '@/components/ui/card'
import tasks from '@/components/Example/DataTable/data/tasks.json'
import invoices_100_thai from '@/public/data/invoices_100_thai.json'

definePageMeta({
  title: "รายงานใบกำกับภาษี",
});

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
</style>