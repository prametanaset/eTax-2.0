<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-8">
      <Card class="w-full">
        <CardHeader>
          <div class="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{{ storeApi.storeName }}</CardTitle>
              <CardDescription class="text-muted-500">{{
                storeApi.address
              }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Card
            class="border-primary-500 shadow-md shadow-primary-600/50 bg-primary-200/20 dark:bg-primary-800/20 relative flex flex-col justify-between gap-y-6 overflow-hidden rounded-2xl p-4 sm:flex-row"
          >
            <div
              class="absolute -bottom-10 -start-10 size-48 rounded-full dark:bg-white/10 bg-muted-200"
            />
            <div
              class="absolute -end-24 -top-10 hidden size-80 rounded-full dark:bg-white/10 bg-muted-200 sm:block"
            />
            <div class="grid relative w-full gap-y-2">
              <CardTitle class="text-success-500">หมายเลขใบแจ้งหนี้</CardTitle>
              <CardDescription class="dark:text-white text-xl"
                >INV-2023-276
              </CardDescription>
              <CardDescription size="sm" class="mb-1">
                <span class="text-muted-400">วันที่ออกใบ : </span>
                <span class="dark:text-white">{{
                  formatThaiDate(new Date())
                }}</span>
              </CardDescription>
            </div>
            <div class="grid relative w-full sm:text-end gap-y-2">
              <CardTitle class="text-success-500">ผู้รับ</CardTitle>
              <div class="flex flex-col sm:grid gap-y-2 justify-end">
                <div>
                  <Select>
                    <SelectTrigger class="min-w-[180px] bg-muted-500/50">
                      <SelectValue placeholder="เลือกผู้รับ"
                    /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Mr.Steve Rogers">
                          Mr.Mr.Steve Rogers
                        </SelectItem>
                        <SelectItem value="Mr.Tony Stark">
                          Mr.Tony Stark
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <CardDescription> </CardDescription>
                </div>
              </div>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <Card class="w-full">
        <div class="p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          nobis.
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

definePageMeta({
  title: "สร้างใบกำกับภาษี",
});

const storeApi = reactive({
  storeName: "อ้ายมักโต",
  address:
    "ศูนย์อาหารและบริการที่ 1 (คอมเพล็กซ์) มหาวิทยาลัยขอนแก่น ในเมือง อำเภอเมืองขอนแก่น ขอนแก่น 40002",
});
</script>

<style></style>
