<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'product-added', product: { id: number; name: string; price: number; image: string }): void
}>()

const newProduct = ref({ name: '', price: 0, image: '' })

const handleAddNewProduct = () => {
  const product = {
    id: Date.now(),
    name: newProduct.value.name,
    price: newProduct.value.price,
    image: newProduct.value.image || '/images/products/default.jpg',
  }

  emit('product-added', product)
  emit('update:modelValue', false)
  newProduct.value = { name: '', price: 0, image: '' }
}
</script>

<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>เพิ่มสินค้าใหม่</DialogTitle>
        <DialogDescription>กรอกชื่อ ราคา และลิงก์รูปภาพของสินค้าใหม่</DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">ชื่อสินค้า</Label>
          <Input id="name" v-model="newProduct.name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="price" class="text-right">ราคา</Label>
          <Input id="price" type="number" v-model="newProduct.price" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="image" class="text-right">ลิงก์รูป</Label>
          <Input id="image" v-model="newProduct.image" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="outline">ยกเลิก</Button>
        </DialogClose>
        <Button @click="handleAddNewProduct">เพิ่มสินค้า</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
