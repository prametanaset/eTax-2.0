<script setup lang="ts">
import { ref, computed, nextTick, watchEffect } from 'vue'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarIcon, Clock } from 'lucide-vue-next'
import {
  DateFormatter,
  getLocalTimeZone,
  fromDate,
  type DateValue,
} from '@internationalized/date'

const value = ref<DateValue>()
const isOpen = ref(false)
const isAM = ref(true)

const hours = Array.from({ length: 12 }, (_, i) => i + 1) // 1-12
const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

const hourContainer = ref<HTMLElement | null>(null)
const minuteContainer = ref<HTMLElement | null>(null)

const df = new DateFormatter('th-TH', {
  dateStyle: 'long',
  timeStyle: 'short',
  hour12: false,
})

const displayValue = computed(() => {
  if (!value.value) return 'เลือกวันที่และเวลา'
  return df.format(value.value.toDate(getLocalTimeZone()))
})

function handleTimeChange(type: 'hour' | 'minute', val: string) {
  const dateObj = value.value?.toDate(getLocalTimeZone()) ?? new Date()
  if (!value.value) {
    dateObj.setHours(0, 0, 0, 0)
  }

  if (type === 'hour') {
    const hour = parseInt(val)
    dateObj.setHours(isAM.value ? hour % 12 : (hour % 12) + 12)
  }

  if (type === 'minute') {
    dateObj.setMinutes(parseInt(val))
  }

  value.value = fromDate(dateObj, getLocalTimeZone())

  nextTick(() => {
    const container = type === 'hour' ? hourContainer.value : minuteContainer.value
    const btn = container?.querySelector<HTMLButtonElement>('button.bg-primary')
    btn?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })
}

function onDateChange(newDateValue: DateValue) {
  const newDate = newDateValue.toDate(getLocalTimeZone())

  if (!value.value) {
    newDate.setHours(0, 0, 0, 0)
  } else {
    const oldDate = value.value.toDate(getLocalTimeZone())
    newDate.setHours(oldDate.getHours())
    newDate.setMinutes(oldDate.getMinutes())
  }

  value.value = fromDate(newDate, getLocalTimeZone())
}

function handleAmPmChange(am: boolean) {
  const date = value.value?.toDate(getLocalTimeZone()) ?? new Date()
  const hour = date.getHours()

  if (am && hour >= 12) {
    date.setHours(hour - 12)
  } else if (!am && hour < 12) {
    date.setHours(hour + 12)
  }

  isAM.value = am
  value.value = fromDate(date, getLocalTimeZone())
}

watchEffect(() => {
  const hour = value.value?.toDate(getLocalTimeZone()).getHours() ?? 0
  isAM.value = hour < 12
})
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-full justify-start text-left font-normal"
        :class="{ 'text-muted-foreground': !value }"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ displayValue }}</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-auto p-4 rounded-xl shadow-lg bg-white dark:bg-zinc-900">
      <div class="flex flex-col gap-4">
        <Calendar
          :model-value="value"
          @update:modelValue="onDateChange"
          locale="th-TH"
          initial-focus
        />

        <div class="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Clock class="w-4 h-4" />
          เลือกเวลา
        </div>

        <div class="grid grid-cols-[auto_auto_auto_auto] gap-4 items-center justify-center">
          <!-- Hour -->
          <ScrollArea class="h-48 w-20 rounded-md border">
            <div ref="hourContainer" class="flex flex-col gap-1 p-1">
              <Button
                v-for="hour in hours"
                :key="hour"
                variant="ghost"
                class="w-full justify-center rounded-md text-sm"
                :class="{
                  'bg-primary text-white':
                    (value?.toDate(getLocalTimeZone()).getHours() % 12 || 12) === hour,
                  'hover:bg-accent':
                    (value?.toDate(getLocalTimeZone()).getHours() % 12 || 12) !== hour,
                }"
                @click="handleTimeChange('hour', hour.toString())"
              >
                {{ hour.toString().padStart(2, '0') }}
              </Button>
            </div>
          </ScrollArea>

          <!-- Separator -->
          <div class="text-2xl font-semibold text-muted-foreground self-center">:</div>

          <!-- Minute -->
          <ScrollArea class="h-48 w-20 rounded-md border">
            <div ref="minuteContainer" class="flex flex-col gap-1 p-1">
              <Button
                v-for="minute in minutes"
                :key="minute"
                variant="ghost"
                class="w-full justify-center rounded-md text-sm"
                :class="{
                  'bg-primary text-white':
                    value?.toDate(getLocalTimeZone()).getMinutes() === minute,
                  'hover:bg-accent':
                    value?.toDate(getLocalTimeZone()).getMinutes() !== minute,
                }"
                @click="handleTimeChange('minute', minute.toString())"
              >
                {{ minute.toString().padStart(2, '0') }}
              </Button>
            </div>
          </ScrollArea>

          <!-- AM/PM -->
          <div class="flex flex-col gap-2">
            <Button
              variant="ghost"
              class="w-14"
              :class="{ 'bg-pink-300 text-black': isAM, 'bg-white dark:bg-zinc-800': !isAM }"
              @click="handleAmPmChange(true)"
            >
              AM
            </Button>
            <Button
              variant="ghost"
              class="w-14"
              :class="{ 'bg-pink-300 text-black': !isAM, 'bg-white dark:bg-zinc-800': isAM }"
              @click="handleAmPmChange(false)"
            >
              PM
            </Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
