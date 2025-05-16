<template>

    <div
      class="bg-white dark:bg-purple-950/60 border border-gray-200 dark:border-purple-700 rounded-lg p-5 transition-colors"
    >
      <h2
        class="text-gray-700 dark:text-purple-100 text-md font-semibold flex items-center gap-2 mb-4"
      >
        <Store class="w-5 h-5 text-gray-700 dark:text-purple-300" />
        ข้อมูลร้านค้า
      </h2>

      <div class="text-sm text-gray-700 dark:text-purple-100 space-y-1">
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >ชื่อบริษัท:</span
          >
          บริษัท แสงทอง จำกัด
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >เลขประจำตัวผู้เสียภาษี:</span
          >
          0105539039991
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >ที่อยู่:</span
          >
          88/88 ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ 10900
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >อีเมล:</span
          >
          <span class="text-gray-400 italic dark:text-purple-400"
            >ไม่มีข้อมูล</span
          >
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >เบอร์โทร:</span
          >
          <span class="text-gray-400 italic dark:text-purple-400"
            >ไม่มีข้อมูล</span
          >
        </p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { Store } from "lucide-vue-next";

</script>

<style>

</style>