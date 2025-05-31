<script setup lang="ts">
import { ArrowUpFromLine } from "lucide-vue-next";



const timezone = ref('GMT+7')
const dateRange = ref('today')
const columnOption = ref('default')

// วันที่เริ่มต้นและสิ้นสุดเมื่อเลือกกำหนดเอง
const customStartDate = ref(new Date('2025-01-01'))
const customEndDate = ref(new Date('2025-05-31'))
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"><ArrowUpFromLine class="-mr-1 w-4 h-4" /> ส่งออก</Button>
    </DialogTrigger>
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>ส่งออกในช่วงวันที่</DialogTitle>
      </DialogHeader>
      <div class="space-y-6">
        <!-- ... timezone และช่วงวันที่ ... -->
        <div>
          <Label class="font-medium">เขตเวลา</Label>
          <RadioGroup v-model="timezone" class="flex gap-6 mt-2">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="gmt7" value="GMT+7" />
              <Label for="gmt7">GMT+7 (UTC +07:00)</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="utc" value="UTC" />
              <Label for="utc">UTC</Label>
            </div>
          </RadioGroup>
        </div>

        <!-- Date Range -->
        <div>
          <Label class="font-medium">ช่วงวันที่</Label>
          <RadioGroup v-model="dateRange" class="space-y-2 mt-2">
            <!-- ... options อื่นๆ ... -->
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="today" value="today" />
              <Label for="today">วันนี้ <span class="text-gray-500 ml-1">31 พ.ค.</span></Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="this-month" value="this-month" />
              <Label for="this-month">เดือนนี้ <span class="text-gray-500 ml-1">1 พ.ค. – 31 พ.ค.</span></Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="last-7-days" value="last-7-days" />
              <Label for="last-7-days">7 วันที่ผ่านมา <span class="text-gray-500 ml-1">25 พ.ค. – 31 พ.ค.</span></Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="last-4-weeks" value="last-4-weeks" />
              <Label for="last-4-weeks">4 สัปดาห์ที่ผ่านมา <span class="text-gray-500 ml-1">4 พ.ค. – 31 พ.ค.</span></Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="last-month" value="last-month" />
              <Label for="last-month">เดือนที่ผ่านมา <span class="text-gray-500 ml-1">1 เม.ย. – 30 เม.ย.</span></Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="all" value="all" />
              <Label for="all">ทั้งหมด</Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="custom" value="custom" />
              <Label for="custom">กำหนดเอง</Label>
            </div>

            <!-- แสดงปุ่มช่วงวันที่เมื่อเลือกกำหนดเอง -->
            <div v-if="dateRange === 'custom'" class="ml-6 mt-2">
                <BaseDateRangePicker></BaseDateRangePicker>
            </div>
          </RadioGroup>
        </div>

        <!-- Column Option -->
        <div>
          <Label class="font-medium">คอลัมน์</Label>
          <Select v-model="columnOption">
            <SelectTrigger class="mt-2 w-full">
              <SelectValue placeholder="ค่าเริ่มต้น (19)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">ค่าเริ่มต้น (19)</SelectItem>
              <SelectItem value="all">ทั้งหมด</SelectItem>
            </SelectContent>
          </Select>
          <div class="text-sm text-gray-500 mt-2">
            ID, Amount Due, Billing, Closed, ...
          </div>
        </div>
      </div>

      <DialogFooter class="mt-6">
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            ยกเลิก
          </Button>
        </DialogClose>
        <Button type="submit">ส่งออก</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
