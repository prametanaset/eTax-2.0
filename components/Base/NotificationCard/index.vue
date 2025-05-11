<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// import { Bell, Check } from 'lucide-vue-next'
import { Plus, Pencil, Eye, Send, Save, ChevronDown, CirclePlus } from "lucide-vue-next";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const product = reactive({
      quantity: 1,
      discountValue: 0,
      discountType: '%',
      tax: '10%'
    });
</script>

<template>
  <Card :class="cn('w-[380px]', $attrs.class ?? '')">
    <div class="flex flex-col gap-y-0 p-6">
      <h3 class="font-semibold tracking-tight text-xl leading-tight">จำนวนเงินในใบแจ้งหนี้</h3>
      <p class="font-normal text-sm text-muted-600 leading-snug">แสดงเป็นบาท (THB)</p>
    </div>
    <CardContent class="grid gap-4">
      <div class="border-muted-200 dark:border-muted-800/80 border-b pb-4">
        <div class="font-heading text-2xl leading-none font-bold tracking-normal mb-3">
          ฿1,074.00
          <span class="text-sm leading-normal font-normal tracking-normal text-muted-600 inline">
            (รวมภาษีมูลค่าเพิ่ม)
          </span>
        </div>
        <!-- <Badge variant="secondary"
          class="flex-none text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light">
          11 เมษายน, 2568
        </Badge> -->
        <!-- <Popover v-if="screenWidth > 640"> -->

        <Popover>
            <PopoverTrigger as-child>
              <!-- <Button v-if="product.discountValue > 0" variant="secondary" size="xs" class="w-full sm:w-20 text-center text-sm font-semibold truncate bg-primary/10 text-primary dark:text-primary-light">
                {{ product.discountValue }} {{ product.discountType }}
              </Button> -->
              <Button variant="secondary" size="xs" class="w-fit text-center text-sm font-semibold rounded-full truncate bg-primary/10 text-primary-600 dark:text-primary-light">
                <CirclePlus /> เพิ่มส่วนลด
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="font-bold leading-none">เพิ่มส่วนลด</h4>
                  <p class="text-sm text-muted-foreground font-medium">
                    กรุณาเลือกประเภทและมูลค่าของส่วนลด
                  </p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <span class="font-semibold">ประเภท</span>
                    <Select v-model="product.discountType">
                      <SelectTrigger class="col-span-2 h-8 font-normal" >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="%" class="font-normal">เปอร์เซ็นต์ (%)</SelectItem>
                        <SelectItem value="บาท"  class="font-normal">บาท (฿)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <span class="font-semibold">มูลค่า</span>
                    <Input type="number" v-model="product.discountValue" min="0" class="col-span-2 h-8 text-center" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
      </div>

      <div class="border-muted-200 dark:border-muted-800/80 border-b pb-4">
        <div class="flex justify-between w-full">
          <p class="text-base font-normal">ยอดก่อนภาษี</p>
          <p>฿1,200.00</p>
        </div>
        <div class="flex justify-between w-full">
          <p class="text-base font-normal">ส่วนลด</p>
          <p>-฿100.00</p>
        </div>
        <div class="flex justify-between w-full">
          <p class="text-base font-normal">ภาษี (7%)</p>
          <p>฿74.00</p>
        </div>
      </div>
      <div class="flex justify-between w-full text-xl">
        <p class="text-lg font-suk">รวมทั้งหมด</p>
        <p>฿1,074.00</p>
      </div>
      <div v-if="false" class="flex items-center space-x-4 rounded-md border p-4">
        <!-- <Bell /> -->
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">Push Notifications</p>
          <p class="text-sm text-muted-foreground">
            Send notifications to device.
          </p>
        </div>
        <Switch />
      </div>
      <div v-if="false">
        <div v-for="(notification, index) in notifications" :key="index"
          class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0">
          <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ notification.title }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ notification.description }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter v-if="false">
      <div class="grid sm:grid-cols-2 gap-4 w-full">
        <Button variant="outline" class="bg-[hsl(var(--card))]">
          <Eye />ตัวอย่าง
        </Button>
        <Button variant="outline" class="bg-[hsl(var(--card))]">
          <Save />สร้าง
        </Button>
        <Button class="col-span-2">
          <Send />สร้าง และ ส่ง
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>