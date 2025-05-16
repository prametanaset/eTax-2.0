<script setup lang="ts">

const isDialogOpen = ref(false)
const selectedCustomer = ref()

function openCustomerSearch(type: 'corporation' | 'person') {
  customerType.value = type
  isDialogOpen.value = true
}

const customerType = ref<'corporation' | 'person'>('person')

function handleSelect(customer: any) {
  selectedCustomer.value = customer
}
</script>

<template>
  <div class="space-x-2">
    <Button @click="openCustomerSearch('person')">เลือกบุคคลธรรมดา</Button>
    <Button @click="openCustomerSearch('corporation')">เลือกนิติบุคคล</Button>
  </div>

  <div v-if="selectedCustomer" class="mt-4 text-sm text-muted-foreground">
    เลือกลูกค้า: {{ selectedCustomer.name }}
  </div>

  <BaseCustomerSearchDialog
    v-model="isDialogOpen"
    :customerType="customerType"
    @select-customer="handleSelect"
  />
</template>
