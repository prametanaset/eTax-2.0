<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="min-w-[30%] flex flex-col justify-between py-1 md:col-span-2 lg:col-span-1">

      <h4 class="text-sm  font-medium tracking-tight">
        {{ props.title }}
      </h4>
      <h4 class="text-3xl  font-bold tracking-tight">
        {{ props.countNumber }}
      </h4>

      <div>
        <p class="text-muted-500 text-sm dark:text-[#B4B4B4]">
          <span class="text-muted-700 font-semibold dark:text-white">{{
            percenLastMonth > 0 ? percenLastMonth : percenLastMonth * -1
          }}</span>
          ใบกำกับภาษี
        </p>
      </div>
    </div>

    <!-- Chard -->
    <div class="min-w-[70%] flex flex-col items-end justify-between md:min-w-[60%] md:col-span-2 lg:col-span-1">
      <div>
        <div class="flex items-center" :class="percenLastMonth > 0 ? 'text-success-400' : 'text-red-400'">
          <Icon :name="percenLastMonth > 0 ? 'lucide:chevron-up' : 'lucide:chevron-down'
            " class="h-4 w-4 mr-1 mb-1 group-hover:text-[#c164ff]" />
          <div class="text-base sm:text-sm md:text-sm">
            {{ percenLastMonth }}%
          </div>
        </div>
      </div>

      <div class="w-full mb-2">
        <BaseWidgetChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  countNumber: number;
  percenLastMonth: number;
}>();
</script>

<style></style>
