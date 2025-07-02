<template>
  <div
    class="bg-white dark:bg-purple-950/60 border border-gray-200 dark:border-purple-700 rounded-lg p-5 transition-colors"
  >
    <h2
      class="text-gray-700 dark:text-purple-100 text-lg font-semibold flex items-center gap-2 mb-4"
    >
      <Store class="w-5 h-5 text-gray-700 dark:text-purple-300" />
      ข้อมูลร้านค้า
    </h2>

    <div class="text-base text-gray-700 dark:text-purple-100 space-y-1">
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300"
          >ชื่อบริษัท:
        </span>
        <span v-if="seller.name">{{ seller.name }}</span>
        <span v-else class="text-gray-400 italic dark:text-purple-400"
          >ไม่มีข้อมูล</span
        >
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300"
          >เลขประจำตัวผู้เสียภาษี:
        </span>
        <span v-if="seller.taxNo">{{ seller.taxNo }}</span>
        <span v-else class="text-gray-400 italic dark:text-purple-400"
          >ไม่มีข้อมูล</span
        >
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300"
          >ที่อยู่:
        </span>
        <span v-if="seller.address">{{ seller.address }}</span>
        <span v-else class="text-gray-400 italic dark:text-purple-400"
          >ไม่มีข้อมูล</span
        >
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300"
          >อีเมล:
        </span>
        <span v-if="seller.email">{{ seller.email }}</span>
        <span v-else class="text-gray-400 italic dark:text-purple-400"
          >ไม่มีข้อมูล</span
        >
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300"
          >เบอร์โทร:
        </span>
        <span v-if="seller.phone">{{ seller.phone }}</span>
        <span v-else class="text-gray-400 italic dark:text-purple-400"
          >ไม่มีข้อมูล</span
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Store } from "lucide-vue-next";

const profileStore = useProfileStore();

const seller = ref({
  name: "บริษัท แสงทอง จำกัด",
  taxNo: "0105539039991",
  address: "88/88 ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ 10900",
  email: null,
  phone: null,
  logo: null,
});
</script>

<style></style>
