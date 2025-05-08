<template>
  <div>
    <div >
      <Popover  v-model:open="isOpen">
        <PopoverTrigger class="w-full h-fit" as-child>
          <Button variant="outline" class="flex items-center bg-[hsl(var(--card))] justify-between text-left py-3">
            <!-- Display the currently selected customer's avatar -->
            <BaseAvatar
              :text="selectedCustomer.value.substring(0,2).toUpperCase()"
              :title="selectedCustomer.title"
              :description="selectedCustomer.email"
              :img="selectedCustomer.url"
            />
            <ChevronDown class="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0" align="start">
          <!-- The Command component now uses the selected customer object -->
          <Command v-model="selectedCustomer" v-model:open="isOpen">
            <CommandInput placeholder="Select customer..." class="font-thin" />
            <CommandList>
              <CommandEmpty>No customers found.</CommandEmpty>
              <CommandGroup>
                <!-- Loop through the customers array to render each avatar -->
                <CommandItem
                  v-for="customer in customers"
                  :key="customer.value"
                  :value="customer"
                  class="flex items-center px-4 py-2"
                  @select="onStatusSelect(customer.value)"
                >
                  <BaseAvatar
                    :text="customer.value.substring(0,2).toUpperCase()"
                    :title="customer.title"
                    :description="customer.email"
                    :img="customer.url"
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDown } from 'lucide-vue-next'

// Define your customers array
const customers = [
  { value: 'Morty', title: 'Morty Smith', email: 'morty@gmail.com', url: '/avatars/shadcn.png' },
  { value: 'Rick', title: 'Rick Sanchez', email: 'Sanchez@gmail.com', url: '/avatars/rick.png' },
  { value: 'Summer', title: 'Summer Smith', email: 'summer@gmail.com', url: '/avatars/summer.png' },
]

// Set the default selected customer (here using the first customer)
const selectedCustomer = ref(customers[0])
const isOpen = ref(false)
const selectedStatus = ref<Status | null>(null)

function onStatusSelect(status: Status) {
  selectedStatus.value = status
  isOpen.value = false
}
</script>

<style>
/* Add your styles here if needed */
</style>
