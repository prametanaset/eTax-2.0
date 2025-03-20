<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger, ComboboxCancel } from '@/components/ui/combobox'
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { ref } from 'vue'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const customers = [
  { value: 'Morty', title: 'Morty Smith', email: 'morty@gmail.com', url: '/avatars/shadcn.png' },
  { value: 'Rick', title: 'Rick Sanchez', email: 'Sanchez@gmail.com', url: '/avatars/rick.png' },
  { value: 'Summer', title: 'Summer Smith', email: 'summer@gmail.com', url: '/avatars/summer.png' },
]

const value = ref<typeof customers[0]>()
</script>

<template>
  <Combobox v-model="value" by="title">
    <ComboboxAnchor class="w-full h-fit" as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between font-normal text-left">
          <!-- {{ value?.title ?? 'Select framework' }} -->
          <BaseAvatar v-if="value" text="OM" :title="value?.title" :description="value?.email" :img="value?.url"/>
          <p v-else>
            กรุณาเพิ่มข้อมูลลูกค้า
          </p>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="p-1 w-72">
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10" placeholder="ค้นหาลูกค้า..." />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty>
        No framework found.
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="customer in customers"
          :key="customer.value"
          :value="customer"
        >
          <BaseAvatar text="OM" :title="customer.title" :description="customer.email" :img="customer.url"/>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>