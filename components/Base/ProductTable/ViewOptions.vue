<template>
  <DropdownMenu>
    <div class='mr-4'>
        <BaseDialog text='เพิ่มสินค้า' bg-button='bg-primary-500' title='เพิ่มสินค้า' >
            <template #content>
                <div class='grid gap-y-4'>
                  <div>
                    <Label>ชื่อสินค้า</Label>
                    <Input placeholder='กรอกชื่อสินค้า' v-model='product.name'/>
                  </div>
                  <div>
                    <Label>รายละเอียดสินค้า</Label>
                    <Textarea placeholder='กรอกชื่อสินค้า' v-model='product.desc'/>
                  </div>
                  <div>
                    <Label>ราคา</Label>
                    <Input placeholder='0' type='number' v-model='product.price'/>
                  </div>
                  <div class='grid gap-2'>
                    <div class='flex gap-2 items-center'>
                      <Switch id="airplane-mode" v-model='product.include_vat'/>
                      <Label>VAT %</Label>
                    </div>
                    <Input v-if='product.include_vat' placeholder='0' type='number' min='0' v-model='product.vat_value'/>
                    <!-- <NumberField  v-if='product.include_vat' v-model='product.vat_value' >
                      <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                      </NumberFieldContent>
                    </NumberField> -->
                  </div>
                </div>
            </template> 
            <template #footer>
              <div class='flex justify-end '>
                <div class='flex gap-2'>
                  <DialogClose as-child>
                    <Button variant="outline">ยกเลิก</Button>
                  </DialogClose>
                  <Button type="submit">สร้าง</Button>
                </div>
              </div>
            </template>
          </BaseDialog>
      </div>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex bg-[hsl(var(--card))]"
      >
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :model-value="column.getIsVisible()"
        @update:model-value="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import type { Table } from '@tanstack/vue-table'
import type { Product } from './data/schema'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import MixerHorizontalIcon from '~icons/radix-icons/mixer-horizontal'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

interface DataTableViewOptionsProps {
  table: Table<Product>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))


const product = reactive({
  id: 0,
  name: '',
  desc: '',
  price: 0,
  include_vat: false,
  vat_value: 0
})
</script>

<style>

</style>