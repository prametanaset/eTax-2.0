<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DateFormatter,
  getLocalTimeZone,
  type DateValue,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const df = new DateFormatter('th-TH', {
  dateStyle: 'long',
})

const value = ref<DateValue>()

</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
      variant="outline" :class="cn(
                  'w-72 ps-3 text-start font-normal',
                  !value && 'text-muted-foreground',
                )"
      >
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "กรุณาเลือกวันที่" }}
        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-72 p-0">
      <Calendar v-model="value" locale="th-TH" initial-focus />
    </PopoverContent>
  </Popover>
</template>