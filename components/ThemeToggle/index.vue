<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const colorMode = useColorMode()
</script>

<template>
  <div class="w-fit">
    <ToggleGroup type="single">
    <ToggleGroupItem value="a" @click="colorMode.preference = 'light'">
      <Icon icon="radix-icons:sun" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
    </ToggleGroupItem>
    <ToggleGroupItem value="b" @click="colorMode.preference = 'dark'">
      <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] scale-100 transition-all"  />
    </ToggleGroupItem>
    <ToggleGroupItem value="c" @click="colorMode.preference = 'system'">
      <Icon icon="radix-icons:desktop" class="h-[1.2rem] w-[1.2rem] scale-100 transition-all"  />
    </ToggleGroupItem>
  </ToggleGroup>
  </div>
</template>