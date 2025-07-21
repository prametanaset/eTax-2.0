<script setup lang="ts">
import type { Customer } from '~/types/customer';

defineProps<{ customer: Customer }>()
</script>

<template>
  <div class="space-y-1 text-base text-gray-700 dark:text-purple-100">
    <p v-if="customer.CustomerType === 'person'">
      <span class="font-medium text-gray-600 dark:text-purple-300">ชื่อ-สกุล:</span>
      {{ customer.FirstName }} {{ customer.LastName }}
    </p>
    <p v-else>
      <span class="font-medium text-gray-600 dark:text-purple-300">ชื่อบริษัท:</span>
      {{ customer.FirstName }}
    </p>
    <p><span class="font-medium text-gray-600 dark:text-purple-300">อีเมล:</span> {{ customer.Email }}</p>
    <p><span class="font-medium text-gray-600 dark:text-purple-300">เบอร์โทร:</span> {{ customer.Phone }}</p>
    <p><span class="font-medium text-gray-600 dark:text-purple-300">ที่อยู่:</span> {{ customer.Address }}</p>
    <p v-if="customer.Tin"><span class="font-medium text-gray-600 dark:text-purple-300">เลขประจำตัวผู้เสียภาษี:</span> {{ customer.Tin }}</p>
  </div>
</template>
