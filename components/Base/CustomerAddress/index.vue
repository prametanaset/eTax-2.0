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
</script>

<template>
  <div class="w-full grid grid-cols-2 gap-4">
    <!-- ข้อมูลผู้ขาย -->
    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 class="text-sm text-gray-500 font-semibold mb-2">ผู้ขาย</h2>
      <p class="text-sm text-gray-800 font-medium">บริษัท แสงทอง จำกัด</p>
      <p class="text-sm text-gray-700">เลขผู้เสียภาษี: 0105539039991</p>
      <p class="text-sm text-gray-700">ที่อยู่: 88/88 ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ 10900</p>
      <p class="text-sm text-gray-700">อีเมล: ไม่มีข้อมูล</p>
      <p class="text-sm text-gray-700">เบอร์โทร: ไม่มีข้อมูล</p>
    </div>

    <!-- ข้อมูลลูกค้า -->
    <div class="bg-purple-50 border border-purple-200 rounded-lg p-6 shadow-sm">
      <h2 class="text-purple-700 text-md font-semibold flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5z" />
        </svg>
        ข้อมูลการติดต่อ
      </h2>

      <div class="text-sm text-gray-800 leading-relaxed">
        <p><span class="text-gray-600">ประเภทลูกค้า:</span> นิติบุคคล</p>
        <p><span class="text-gray-600">เลขประจำตัวผู้เสียภาษี:</span> 1234567890123</p>
        <p><span class="text-gray-600">ที่อยู่:</span> 111/226 หมู่ 16 ต.บ้านเป็ด อ.เมืองขอนแก่น จ.ขอนแก่น 40000</p>
        <p><span class="text-gray-600">อีเมล:</span> morty@gmail.com</p>
        <p><span class="text-gray-600">เบอร์โทร:</span> +66 62 189 6577</p>
      </div>
    </div>


  </div>
</template>

