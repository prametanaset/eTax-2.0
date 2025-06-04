<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowUpFromLine, CornerUpRight } from "lucide-vue-next";

const dateRange = ref<"today" | "this-month" | "last-7-days" | "last-4-weeks" | "last-month" | "all" | "custom">("today");

// หากต้องการคำนวณข้อความแสดงช่วงวันที่อัตโนมัติ (เช่น วันนี้, เดือนนี้ ฯลฯ)
// สามารถใส่ logic เพิ่มเติมที่นี่ แล้ว bind ไปใน template แทนการ hardcode
const labelOverrides = computed(() => {
  return {
    today: `วันนี้ (${new Date().getDate()} ${new Intl.DateTimeFormat("th-TH", { month: "short" }).format(new Date())})`,
    "this-month": `เดือนนี้ (1 ${new Intl.DateTimeFormat("th-TH", { month: "short" }).format(new Date())} – ${new Date().getDate()} ${new Intl.DateTimeFormat("th-TH", { month: "short" }).format(new Date() )})`,
    "last-7-days": `7 วันที่ผ่านมา (${new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short" }).format(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))} – ${new Date().getDate()} ${new Intl.DateTimeFormat("th-TH", { month: "short" }).format(new Date())})`,
    "last-4-weeks": `4 สัปดาห์ที่ผ่านมา (${new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short" }).format(new Date(Date.now() - 27 * 24 * 60 * 60 * 1000))} – ${new Date().getDate()} ${new Intl.DateTimeFormat("th-TH", { month: "short" }).format(new Date())})`,
    "last-month": (() => {
      const now = new Date();
      const firstDayLast = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayLast = new Date(now.getFullYear(), now.getMonth(), 0);
      return `เดือนที่ผ่านมา (${new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short" }).format(firstDayLast)} – ${new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short" }).format(lastDayLast)})`;
    })(),
    all: "ทั้งหมด",
    custom: "กำหนดเอง",
  };
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="flex items-center gap-1 h-9 bg-white dark:bg-transparent">
        <CornerUpRight class="w-4 h-4" /> ส่งออก
      </Button>
    </DialogTrigger>
    <DialogContent class="w-full max-w-lg p-6">
      <DialogHeader>
        <DialogTitle class="text-lg font-medium">ส่งออกในช่วงวันที่</DialogTitle>
      </DialogHeader>

      <div class="mt-4 space-y-4">
        <!-- ส่วนเลือกช่วงวันที่ -->
        <div>
          <Label class="font-medium">ช่วงวันที่</Label>

          <!-- แสดง RadioGroup ในรูปแบบ grid สองคอลัมน์บนจอใหญ่ -->
          <RadioGroup v-model="dateRange" class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="today" value="today" />
              <Label for="today" class="text-sm">
                {{ labelOverrides.today }}
              </Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="this-month" value="this-month" />
              <Label for="this-month" class="text-sm">
                {{ labelOverrides["this-month"] }}
              </Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="last-7-days" value="last-7-days" />
              <Label for="last-7-days" class="text-sm">
                {{ labelOverrides["last-7-days"] }}
              </Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="last-4-weeks" value="last-4-weeks" />
              <Label for="last-4-weeks" class="text-sm">
                {{ labelOverrides["last-4-weeks"] }}
              </Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="last-month" value="last-month" />
              <Label for="last-month" class="text-sm">
                {{ labelOverrides["last-month"] }}
              </Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="all" value="all" />
              <Label for="all" class="text-sm">
                {{ labelOverrides.all }}
              </Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="custom" value="custom" />
              <Label for="custom" class="text-sm">
                {{ labelOverrides.custom }}
              </Label>
            </div>
          </RadioGroup>

          <!-- เมื่อเลือก “กำหนดเอง” ให้โชว์ DateRangePicker -->
          <div v-if="dateRange === 'custom'" class="mt-4 pl-4 sm:pl-6">
            <BaseDateRangePicker />
          </div>
        </div>
      </div>

      <DialogFooter class="mt-6 flex flex-wrap justify-end gap-2">
        <DialogClose as-child>
          <Button type="button" variant="outline" class="w-full sm:w-auto">
            ยกเลิก
          </Button>
        </DialogClose>
        <Button type="button" class="w-full sm:w-auto">
          ส่งออก
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
/* ถ้าต้องการกำหนด custom CSS เพิ่มเติม ก็ใส่ที่นี่ */
</style>
