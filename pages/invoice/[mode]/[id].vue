<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-9">
      <Card class="w-full">
        <CardHeader>
          <Card
            class="p-4 relative overflow-hidden border-primary-500"
          >
            
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
            class="grid gap-y-6 sm:flex-row border-b  pb-4"
          >
            <div class="grid  w-full gap-y-2 ">
              <CardTitle class="text-success-500">ผู้รับ</CardTitle>
              <div class="flex flex-col sm:grid gap-y-2">
                <div class="sm:w-[50%]">
                  <BaseSelectCustomer></BaseSelectCustomer>
                </div>
                <div>
                  <CardDescription>
                  <div class="grid sm:grid-cols-2 gap-4">
                     <!-- customer info -->
                     <div class="sm:flex mt-2">
                      <p class="text-muted-400">เลขประจำตัวผู้เสียภาษี :&nbsp;</p>
                      <p class="font-bold">1234567890123</p>
                    </div>
                    <!-- END customer info -->
                    <!-- section address -->
                     <div class="sm:text-end">
                        <div class="flex items-center sm:justify-end hover:underline cursor-pointer">
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
          <div class="grid sm:grid-cols-2 mt-8 pt-8 border-t ">
            <div class="sm:col-end-3 mb-8">
              <div class="grid">
                <p>ส่วนลด</p>
                <div class="flex gap-2">
                  <Input type="number" placeholder="ส่วนลด" />
                  <!-- discount Dropdown -->
                  <Select>
                    <SelectTrigger class="w-auto mx-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="บาท">บาท</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div class="flex flex-col justify-end mt-8">
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ยอดเงินรวม </p>
                  <p>{{ currencyFormat(215415) }} </p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ส่วนลด </p>
                  <p>{{ currencyFormat(0) }} </p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ยอดเงินก่อนภาษี </p>
                  <p>{{ currencyFormat(215415) }}</p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ภาษีมูลค่าเพิ่ม </p>
                  <p>{{ currencyFormat(192365.59) }}</p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ยอดสุทธิ </p>
                  <p>{{ currencyFormat(230494.05) }} </p>
                </div>
              </div>
          </div>
          </div>
          <div class="grid w-full">
            <Label for="email">หมายเหตุ</Label>
            <Textarea  />
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="col-span-12 lg:col-span-3"> 
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
import { Textarea } from "@/components/ui/textarea"
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
