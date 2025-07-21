<script setup lang="ts">
import type { Customer } from '~/types/customer';

defineProps<{
  customers: Customer[]
}>()

const emit = defineEmits<{
  (e: 'select', c: Customer): void
  (e: 'openCreate'): void
}>()

const handleSelect = (c: Customer) => emit('select', c)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="absolute top-7 -right-[12%] px-3 rounded-lg" style="transform: translate(-50%, -50%)">
        <Plus /> เลือกข้อมูลลูกค้า
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Command class="bg-transparent">
        <CommandInput placeholder="ค้นหาชื่อลูกค้า..." />
        <CommandList>
          <CommandEmpty>ไม่พบลูกค้า</CommandEmpty>
          <CommandGroup>
            <CommandItem value="add" @click="emit('openCreate')">
              <span class="text-primary-500 flex gap-2"><Plus /> เพิ่มข้อมูลลูกค้า</span>
            </CommandItem>

            <CommandItem
              v-for="p in customers"
              :key="p.ID"
              :value="p.ID"
              @select="handleSelect(p)"
            >
              <div class="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback class="dark:text-white">
                    {{ p.FirstName[0] + (p.CustomerType === 'บุคคลธรรมดา' ? p.LastName[0] : p.FirstName[1]) }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{{ p.CustomerType === 'บุคคลธรรมดา' ? `${p.FirstName} ${p.LastName}` : p.FirstName }}</p>
                  <span class="text-sm text-muted-500">{{ p.Tin }}</span>
                </div>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogContent>
  </Dialog>
</template>
