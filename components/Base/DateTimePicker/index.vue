<script setup lang="ts">
import { ref, computed } from "vue";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon, Clock } from "lucide-vue-next";
import {
  DateFormatter,
  getLocalTimeZone,
  fromDate,
  type DateValue,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

const value = ref<DateValue>();
const isOpen = ref(false);

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

const hourContainer = ref<HTMLElement | null>(null);
const minuteContainer = ref<HTMLElement | null>(null);

const df = new DateFormatter("th-TH-u-ca-buddhist", {
  dateStyle: "long",
  timeStyle: "short",
  hour12: false,
});

const displayValue = computed(() => {
  if (!value.value) return "เลือกวันที่และเวลา";
  return df.format(value.value.toDate(getLocalTimeZone()));
});

function handleTimeChange(type: "hour" | "minute", val: string) {
  const dateObj = value.value?.toDate(getLocalTimeZone()) ?? new Date();
  if (!value.value) {
    dateObj.setHours(0, 0, 0, 0);
  }
  if (type === "hour") dateObj.setHours(parseInt(val));
  if (type === "minute") dateObj.setMinutes(parseInt(val));
  value.value = fromDate(dateObj, getLocalTimeZone());

  // wait for DOM to update, then scroll the selected button into view
  nextTick(() => {
    if (type === "hour" && hourContainer.value) {
      const btn = hourContainer.value.querySelector<HTMLButtonElement>(
        "button.bg-purple-300"
      );
      btn?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    if (type === "minute" && minuteContainer.value) {
      const btn = minuteContainer.value.querySelector<HTMLButtonElement>(
        "button.bg-purple-300"
      );
      btn?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}
function onDateChange(newDateValue: DateValue) {
  const newDate = newDateValue.toDate(getLocalTimeZone());

  if (!value.value) {
    newDate.setHours(0, 0, 0, 0);
  } else {
    const oldDate = value.value.toDate(getLocalTimeZone());
    newDate.setHours(oldDate.getHours());
    newDate.setMinutes(oldDate.getMinutes());
  }

  value.value = fromDate(newDate, getLocalTimeZone());
}

const selectedHour = computed(() => {
  return (
    value.value
      ?.toDate(getLocalTimeZone())
      .getHours()
      .toString()
      .padStart(2, "0") ?? "--"
  );
});

const selectedMinute = computed(() => {
  return (
    value.value
      ?.toDate(getLocalTimeZone())
      .getMinutes()
      .toString()
      .padStart(2, "0") ?? "--"
  );
});

function setToNow() {
  const now = new Date();
  value.value = fromDate(now, getLocalTimeZone());

  nextTick(() => {
    const btnHour = hourContainer.value?.querySelector<HTMLButtonElement>(
      "button.bg-purple-300"
    );
    const btnMinute = minuteContainer.value?.querySelector<HTMLButtonElement>(
      "button.bg-purple-300"
    );
    btnHour?.scrollIntoView({ block: "center", behavior: "smooth" });
    btnMinute?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}
watch(isOpen, async (open) => {
  if (open && selectedHour.value !== "--" && selectedMinute.value !== "--") {
    await nextTick();

    const btnHour = hourContainer.value?.querySelector<HTMLButtonElement>(
      "button.bg-purple-300"
    );
    const btnMinute = minuteContainer.value?.querySelector<HTMLButtonElement>(
      "button.bg-purple-300"
    );

    btnHour?.scrollIntoView({ block: "center" });
    btnMinute?.scrollIntoView({ block: "center" });
  }
});
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('justify-start text-left font-normal', !value && 'text-muted-400')
        "
        class="w-full bg-[hsl(var(--card))] h-10 shadow-none"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ displayValue }}</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="w-auto p-4 rounded-xl shadow-lg bg-white dark:bg-zinc-900"
    >
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex flex-col">
          <Calendar
            :model-value="value"
            @update:modelValue="onDateChange"
            locale="th-TH"
            ordering="buddhist gregory"
            initial-focus
          />
          <Button variant="secondary" @click="setToNow">
            <Clock class="w-4 h-4 mr-2" /> ตอนนี้
          </Button>
        </div>
        <div class="flex flex-col items-start gap-3 pt-5">
          <div
            class="flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Clock class="w-4 h-4" /> เลือกเวลา

            <span class="text-purple-700 font-semibold text-base">
              {{ selectedHour }}:{{ selectedMinute }} น.
            </span>
          </div>

          <div class="flex flex-col gap-4">
            <div
              class="grid grid-cols-[auto_auto_auto] gap-4 items-center justify-center"
            >
              <!-- Hours -->
              <div class="flex flex-col gap-3 relative items-center">
                <ScrollArea class="h-48 w-20 rounded-md overflow-hidden">
                  <!-- Top Fade -->
                  <div
                    :class="[
                      'absolute top-0 left-0 w-full h-10 bg-gradient-to-b to-transparent z-10 pointer-events-none',
                      selectedHour === '00' || selectedHour === '01'
                        ? 'opacity-0'
                        : 'from-white/90 dark:from-zinc-900/90',
                    ]"
                  />
                  <div
                    :class="[
                      'absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t to-transparent z-10 pointer-events-none',
                      ['22', '23'].includes(selectedHour)
                        ? 'opacity-0'
                        : 'from-white/90 dark:from-zinc-900/90',
                    ]"
                  />
                  <div
                    ref="hourContainer"
                    class="flex flex-col gap-1 p-1 relative z-0"
                  >
                    <Button
                      v-for="hour in hours"
                      :key="hour"
                      variant="ghost"
                      class="w-full justify-center rounded-md text-sm"
                      :class="{
                        'bg-purple-300 ':
                          value?.toDate(getLocalTimeZone()).getHours() === hour,
                        'hover:bg-purple-100 text-purple-700':
                          value?.toDate(getLocalTimeZone()).getHours() !== hour,
                      }"
                      @click="handleTimeChange('hour', hour.toString())"
                    >
                      {{ hour.toString().padStart(2, "0") }}
                    </Button>
                  </div>
                </ScrollArea>
                <p class="text-sm">ชั่วโมง</p>
              </div>

              <!-- Separator : -->
              <div
                class="text-2xl font-semibold text-muted-foreground self-center mb-7"
              >
                :
              </div>

              <!-- Minutes -->
              <div class="flex flex-col gap-3 items-center">
                <ScrollArea class="h-48 w-20 rounded-md">
                  <!-- Top Fade -->
                  <div
                    :class="[
                      'absolute top-0 left-0 w-full h-10 bg-gradient-to-b to-transparent z-10 pointer-events-none',
                      selectedMinute === '00' || selectedMinute === '01'
                        ? 'opacity-0'
                        : 'from-white/90 dark:from-zinc-900/90',
                    ]"
                  />
                  <div
                    :class="[
                      'absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t to-transparent z-10 pointer-events-none',
                      ['58', '59'].includes(selectedMinute)
                        ? 'opacity-0'
                        : 'from-white/90 dark:from-zinc-900/90',
                    ]"
                  />
                  <div ref="minuteContainer" class="flex flex-col gap-1 p-1">
                    <Button
                      v-for="minute in minutes"
                      :key="minute"
                      variant="ghost"
                      class="w-full justify-center rounded-md text-sm"
                      :class="{
                        'bg-purple-300 ':
                          value?.toDate(getLocalTimeZone()).getMinutes() ===
                          minute,
                        'hover:bg-purple-100 text-purple-700':
                          value?.toDate(getLocalTimeZone()).getMinutes() !==
                          minute,
                      }"
                      @click="handleTimeChange('minute', minute.toString())"
                    >
                      {{ minute.toString().padStart(2, "0") }}
                    </Button>
                  </div>
                </ScrollArea>
                <p class="text-sm">นาที</p>
              </div>
            </div>
            <div class="flex justify-end">
              <Button variant="ghost" @click="isOpen = false">ยกเลิก</Button>
              <Button variant="default" @click="isOpen = false">ตกลง</Button>
            </div>
          </div>
        </div>
      </div>

    </PopoverContent>
  </Popover>
</template>

<style scoped>
/* ใส่ใน global.css หรือ <style> scoped */
.mask-gradient {
  --mask-height: 1.5rem;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    rgba(128, 90, 213, 1) var(--mask-height),
    rgba(128, 90, 213, 1) calc(100% - var(--mask-height)),
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    rgba(128, 90, 213, 1) var(--mask-height),
    rgba(128, 90, 213, 1) calc(100% - var(--mask-height)),
    transparent
  );
}
</style>
