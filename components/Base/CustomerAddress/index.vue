<script setup lang='ts'>
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-vue-next";
</script>

<template>
  <!-- ข้อมูลลูกค้า -->
  <div
    class="bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-700 rounded-lg p-6 shadow-sm">
    <!-- Header with title and button -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-purple-700 dark:text-purple-400 text-md font-semibold flex items-center gap-2">
        <svg class="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5z" />
        </svg>
        ข้อมูลการติดต่อ
      </h2>
      <Button size="sm"
        class="gap-2  text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-sm rounded-lg">
        <Plus class="w-4 h-4" />
        เพิ่ม
      </Button>
    </div>

    <div class="text-sm text-gray-700 dark:text-purple-100 space-y-1">
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">ชื่อ-สกุล:</span>
        มอร์ตี้ สมิธ
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">ประเภทลูกค้า:</span>
        นิติบุคคล
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">เลขประจำตัวผู้เสียภาษี:</span>
        1234567890123
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">ที่อยู่:</span>
        111/226 หมู่ 16 ต.บ้านเป็ด อ.เมืองขอนแก่น จ.ขอนแก่น 40000
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">อีเมล:
        </span>
        <a href="mailto:morty@gmail.com"
          class="text-purple-600 dark:text-purple-300 hover:underline">morty@gmail.com</a>
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">เบอร์โทร:
        </span>
        <a href="tel:+66621896577" class="text-purple-600 dark:text-purple-300 hover:underline">+66 62 189 6577</a>
      </p>
    </div>
  </div>
</template>
