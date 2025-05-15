<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'product-added', product: { id: number; name: string; price: number; image: string; taxType: string }): void
}>()

const newProduct = ref({
  name: '',
  price: 0,
  image: '',
  taxType: 'include', // include, exclude, exempt
})

const calculatedPrice = computed(() => {
  const vatRate = 0.07
  const price = newProduct.value.price
  switch (newProduct.value.taxType) {
    case 'include':
      return price
    case 'exclude':
      return price * (1 + vatRate)
    case 'exempt':
      return price
    default:
      return price
  }
})

const handleAddNewProduct = () => {
  const product = {
    id: Date.now(),
    name: newProduct.value.name,
    price: parseFloat(calculatedPrice.value.toFixed(2)),
    image: newProduct.value.image || '/images/products/default.jpg',
    taxType: newProduct.value.taxType,
  }

  emit('product-added', product)
  emit('update:modelValue', false)
  newProduct.value = { name: '', price: 0, image: '', taxType: 'include' }
}
</script>

<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle class="text-purple-700 dark:text-purple-300">✨ เพิ่มสินค้าใหม่</DialogTitle>
        <DialogDescription class="text-gray-600 dark:text-gray-400">
          กรอกรายละเอียดสินค้า เลือกรูปแบบภาษี และตรวจสอบราคาสุทธิ
        </DialogDescription>
      </DialogHeader>

      <Card class="bg-purple-50/40 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-700 shadow-sm rounded-lg">
        <CardContent class="py-6 px-4 space-y-5">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right text-purple-800 dark:text-purple-200">ชื่อสินค้า</Label>
            <Input id="name" v-model="newProduct.name" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="price" class="text-right text-purple-800 dark:text-purple-200">ราคาขาย</Label>
            <Input id="price" type="number" v-model="newProduct.price" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right text-purple-800 dark:text-purple-200">ประเภทภาษี</Label>
            <Select v-model="newProduct.taxType">
              <SelectTrigger class="col-span-3 shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="include">รวม VAT 7%</SelectItem>
                <SelectItem value="exclude">ไม่รวม VAT (เพิ่มภายหลัง)</SelectItem>
                <SelectItem value="exempt">ยกเว้นภาษี</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="image" class="text-right text-purple-800 dark:text-purple-200">ลิงก์รูป</Label>
            <Input id="image" v-model="newProduct.image" class="col-span-3" />
          </div>

          <!-- 🖼 Widget ตัวอย่างรูปสินค้า -->
          <div class="flex justify-center">
  <div v-if="newProduct.image" class="w-32 h-32">
    <img
      :src="newProduct.image"
      alt="preview"
      class="w-32 h-32 object-cover rounded-md border border-purple-300 dark:border-purple-700 shadow"
    />
  </div>
  <div
    v-else
    class="w-32 h-32 flex items-center justify-center text-center text-sm text-purple-500 bg-purple-50 dark:bg-purple-900/40 rounded-md border border-dashed border-purple-300 dark:border-purple-700 shadow"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto mb-1 h-6 w-6 text-purple-400 dark:text-purple-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 11l4 4 4-4m0 0V7m0 4H8" />
      </svg>
      <span class="block">ยังไม่มีรูปสินค้า</span>
    </div>
  </div>
</div>


          <!-- 💰 ราคาสุทธิ + Badge -->
          <div class="text-center mt-4">
            <Badge variant="outline" class="text-purple-800 bg-purple-100 border-purple-300 dark:bg-purple-700 dark:text-white dark:border-purple-500">
              {{ newProduct.taxType === 'include' ? 'รวม VAT' : newProduct.taxType === 'exclude' ? 'ไม่รวม VAT' : 'ยกเว้นภาษี' }}
            </Badge>
            <div class="mt-2 text-lg font-bold text-purple-900 dark:text-purple-200">
              ราคาสุทธิ: {{ calculatedPrice.toLocaleString('th-TH', { style: 'currency', currency: 'THB' }) }}
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogFooter class="pt-6">
        <DialogClose as-child>
          <Button type="button" variant="outline">ยกเลิก</Button>
        </DialogClose>
        <Button @click="handleAddNewProduct" class="bg-purple-600 hover:bg-purple-700 text-white">
          เพิ่มสินค้า
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
