<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/vue";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Moon } from "lucide-vue-next";

const colorMode = useColorMode();
</script>

<template>
  <div class="w-fit">
    <ToggleGroup v-model="colorMode.preference" type="single">
      <ToggleGroupItem value="light">
        <Icon
          icon="radix-icons:sun"
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
        />
      </ToggleGroupItem>

      <ToggleGroupItem value="dark">
        <Moon class="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
      </ToggleGroupItem>

      <ToggleGroupItem value="system">
        <Icon
          icon="radix-icons:desktop"
          class="h-[1.2rem] w-[1.2rem] scale-100 transition-all"
        />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
