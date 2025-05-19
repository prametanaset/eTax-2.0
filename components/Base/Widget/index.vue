<template>
  <div class="grid grid-cols-2 gap-2">
    <div
      class="min-w-[30%] flex flex-col justify-between py-1 gap-4 md:col-span-2 lg:col-span-1"
    >
      <!--         :variant="props.status === 'money' ? 'outline' : 'secondary'"
 -->
      <!-- <Badge
        :variant="props.status === 'money' ? 'secondary' : 'secondary'"
        class="text-xs font-semibold tracking-tight w-fit"
        :class="{
          'bg-green-50 text-green-700': props.status === 'success',
          'bg-yellow-50 text-yellow-800': props.status === 'warning',
          'bg-red-50 text-red-700': props.status === 'cancel',
          'bg-purple-50 text-purple-700': props.status === 'money',
        }"
      >
        {{ props.title }}
      </Badge> -->

      <h3 class="font-semibold text-base mb-1 text-muted-700 dark:text-white">{{ props.title }}</h3>
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

      <div>
        <p
          class="text-muted-500 text-sm font-medium ml-1 dark:text-[#B4B4B4]"
        >
          <span class="text-gray-700 font-semibold dark:text-white">{{
            percenLastMonth > 0 ? percenLastMonth : percenLastMonth * -1
          }}</span>
          ใบกำกับภาษี
        </p>
      </div>
    </div>

    <!-- Chart -->
    <div
      class="min-w-[70%] flex flex-col items-end justify-between md:min-w-[60%] md:col-span-2 lg:col-span-1"
    >
      <div>
        <!--         <div
          class="flex items-center"
          :class="percenLastMonth > 0 ? 'text-success-400' : 'text-red-400'"
        > -->
        <div
          class="flex items-center"
        >
          <!-- <Icon
            :icon="
              percenLastMonth > 0
                ? 'radix-icons:triangle-up'
                : 'radix-icons:triangle-down'
            "
            class="h-5 w-5 mb-1 group-hover:text-[#c164ff]"
            :class="percenLastMonth > 0 ? 'text-success-300' : 'text-red-300'"
          /> -->
          <!-- <div class="text-base sm:text-sm md:text-sm font-medium text-muted-500">
            {{ percenLastMonth }}%
          </div> -->
        </div>
      </div>

      <div class="w-full mb-2">
        <BaseWidgetChart :color="statusColor"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { Newspaper } from "lucide-vue-next";
const props = defineProps<{
  title: string;
  countNumber: number;
  percenLastMonth: number;
  status: string;
}>();

const statusColor = computed(() => {
  switch (props.status) {
    case 'success':
      return '#22c55e' // green-500
    case 'warning':
      return '#facc15' // yellow-400
    case 'cancel':
      return '#ef4444' // red-500
    case 'money':
      return '#a855f7' // purple-500
    default:
      return '#6b7280' // gray-500 fallback
  }
})
</script>

<style></style>
