<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'

const [UseTemplate, DiscountForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')
const isOpen = ref(false)

const product = reactive({
  discountType: null,
  discountValue: null
})
</script>

<template>
  <UseTemplate>
    <form class="grid gap-4 px-4 py-2">
      <div class="grid grid-cols-3 items-center gap-4">
        <Label>ประเภท</Label>
        <Select v-model="product.discountType">
          <SelectTrigger class="col-span-2 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="%">%</SelectItem>
            <SelectItem value="บาท">บาท</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-3 items-center gap-4">
        <Label>มูลค่า</Label>
        <Input type="number" v-model="product.discountValue" min="0" class="col-span-2 h-8 text-center" />
      </div>
      <Button type="submit">
        บันทึก
      </Button>
    </form>
  </UseTemplate>

  <!-- Dialog for Desktop -->
  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" class="w-full sm:w-20 text-center text-sm truncate">
        {{ product.discountValue }} {{ product.discountType }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>เพิ่มส่วนลด</DialogTitle>
        <DialogDescription>กรุณาเลือกประเภทและมูลค่าของส่วนลด</DialogDescription>
      </DialogHeader>
      <DiscountForm />
    </DialogContent>
  </Dialog>

  <!-- Drawer for Mobile -->
  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button variant="outline" class="w-full sm:w-20 text-center text-sm truncate">
        {{ product.discountValue }} {{ product.discountType }}
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>เพิ่มส่วนลด</DrawerTitle>
        <DrawerDescription>กรุณาเลือกประเภทและมูลค่าของส่วนลด</DrawerDescription>
      </DrawerHeader>
      <DiscountForm />
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline">ยกเลิก</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
