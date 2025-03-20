<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-8">
      <Card class="w-full">
        <CardHeader>
          <Card
            class="border-primary-500 shadow-md shadow-primary-600/50 bg-primary-200/20 dark:bg-primary-800/20 p-4 relative overflow-hidden"
          >
            <div
              class="absolute -bottom-10 -start-10 size-48 rounded-full dark:bg-white/10 bg-muted-200"
            />
            <div
              class="absolute -end-24 -top-10 hidden size-80 rounded-full dark:bg-white/10 bg-muted-200 sm:block"
            />
            <div class="relative z-999 grid sm:grid-cols-2 gap-8">
              <div class="flex gap-2 items-start">
                <Avatar>
                  <AvatarImage
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfFMnAPTdXxxWJ33Y4J-lmax6Ey6xGv82CQ&s"
                    alt="@unovue"
                  />
                </Avatar>
                <div>
                  <CardTitle>{{ storeApi.storeName }}</CardTitle>
                  <CardDescription class="text-muted-500">{{
                    storeApi.address
                  }}</CardDescription>
                </div>
              </div>
              <div class="grid gap-2">
                <div
                  class="flex flex-col justify-between items-center sm:text-end"
                >
                  <p class="w-full text-success-500 text-sm">
                    หมายเลขใบกำกับภาษี 
                  </p>
                  <CardTitle class="w-full mt-1">{{
                    storeApi.invNo
                  }}</CardTitle>
                </div>
                <div
                  class="flex flex-col justify-between items-center sm:text-end"
                >
                  <p class="w-full text-success-500 text-sm">วันที่ </p>
                  <p class="w-full">{{ formatThaiDate(new Date()) }}</p>
                </div>
              </div>
            </div></Card
          >
        </CardHeader>
        <CardContent>
          <div
            class="grid items-start justify-between gap-y-6 sm:flex-row border-b border-muted-500 pb-4"
          >
            <div class="grid relative w-full gap-y-2">
              <CardTitle class="text-success-500">ผู้รับ</CardTitle>
              <div class="flex flex-col sm:grid gap-y-2">
                <div>
                  <BaseSelectCustomer></BaseSelectCustomer>
                </div>
                <div>
                  <CardDescription>
                  <div class="grid gap-2">
                     <!-- customer info -->
                     <div class="sm:flex mt-2">
                      <p class="text-success-500">เลขประจำตัวผู้เสียภาษี :&nbsp;</p>
                      <p>1234567890123</p>
                    </div>
                    <!-- END customer info -->
                    <!-- section address -->
                    <div
                      class="flex items-center hover:underline cursor-pointer mb-1"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger as-child>
                            <p class="text-muted-400">ที่อยู่</p>
                            <span>
                              <Pencil class="w-3 ml-1 text-muted-400"/></span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>แก้ไขที่อยู่</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      979 ถ. พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร
                      10330
                    </div>
                    <!-- END section address -->
                  </div>
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
          <div class="grid gap-4 mt-8">
            <p class="text-lg">รายการสินค้า</p>
            <div>
              <BaseProductList></BaseProductList>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <Card class="w-full mb-6">
        <div class="grid gap-4 p-4">
          <p>ส่วนลด</p>

          <div class="flex gap-2">
            <Input type="number" placeholder="ส่วนลด" />
            <!-- discount Dropdown -->
            <Select>
              <SelectTrigger class="w-20 mx-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="%">%</SelectItem>
                <SelectItem value="บาท">บาท</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <Card class="w-full">
        <div class="grid sm:grid-cols-2 gap-4 p-4">
          <Button><Eye />ตัวอย่าง</Button>
          <Button><Save />สร้าง</Button>
          <Button class="col-span-2"><Send />สร้าง และ ส่ง</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Eye, Send, Save } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DateFormatter } from "@internationalized/date";

definePageMeta({
  title: "สร้างใบกำกับภาษี",
});

const storeApi = reactive({
  storeName: "MIXUE",
  address:
    "ศูนย์อาหารและบริการที่ 1 (คอมเพล็กซ์) มหาวิทยาลัยขอนแก่น ในเมือง อำเภอเมืองขอนแก่น ขอนแก่น 40002",
  invNo: "INV0000000000000",
});
</script>

<style></style>
