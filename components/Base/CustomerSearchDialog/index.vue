<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  modelValue: boolean
  customerType: 'corporation' | 'person'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select-customer', customer: Customer): void
}>()

type Customer = {
  id: number
  name: string
  taxId?: string
}

const searchQuery = ref('')
const selectedCustomer = ref<Customer | null>(null)

// Dummy customer list for demo
const allCustomers = ref<Customer[]>([
  { id: 1, name: 'บริษัท ABC จำกัด', taxId: '0105546001234' },
  { id: 2, name: 'นายสมชาย ใจดี' },
  { id: 3, name: 'บริษัท XYZ อินเตอร์เนชั่นแนล', taxId: '0105558005678' },
  { id: 4, name: 'นางสาววิภาดา มีสุข' },
])

const filteredCustomers = computed(() =>
  allCustomers.value.filter(c =>
    props.customerType === 'corporation' ? !!c.taxId : !c.taxId
  ).filter(c => c.name.includes(searchQuery.value))
)

function handleSelect(c: Customer) {
  selectedCustomer.value = c
  emit('select-customer', c)
  emit('update:modelValue', false)
}
</script>

<template>
  <Dialog :open="modelValue" @update:open="val => emit('update:modelValue', val)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>ค้นหาลูกค้า ({{ customerType === 'corporation' ? 'นิติบุคคล' : 'บุคคลธรรมดา' }})</DialogTitle>
        <DialogDescription>พิมพ์ชื่อเพื่อค้นหาและเลือกลูกค้า</DialogDescription>
      </DialogHeader>

      <div class="grid gap-2">
        <Label>ค้นหา</Label>
        <Input v-model="searchQuery" placeholder="ค้นหาชื่อลูกค้า..." />
        <div class="max-h-60 overflow-auto border rounded p-2 space-y-1">
          <template v-for="customer in filteredCustomers" :key="customer.id">
            <Button
              variant="outline"
              class="w-full justify-start"
              @click="handleSelect(customer)"
            >
              {{ customer.name }}
              <span v-if="customer.taxId" class="text-xs text-muted-foreground ms-2">
                ({{ customer.taxId }})
              </span>
            </Button>
          </template>
        </div>
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary">ปิด</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
