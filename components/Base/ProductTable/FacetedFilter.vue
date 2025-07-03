<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="h-8 border-dashed bg-[hsl(var(--card))]"
      >
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) =>
                  selectedValues.has(option.value)
                )"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="
                () => {
                  const valStr = String(option.value);
                  const isSelected = selectedValues.has(valStr);
                  if (isSelected) {
                    selectedValues.delete(valStr);
                  } else {
                    selectedValues.add(valStr);
                  }

                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }
              "
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(String(option.value))
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <CheckIcon class="h-4 w-4" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import type { Column } from "@tanstack/vue-table";
import type { Component } from "vue";
import type { Product } from "./data/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import CheckIcon from "~icons/radix-icons/check";
import PlusCircledIcon from "~icons/radix-icons/plus-circled";

interface DataTableFacetedFilter {
  column?: Column<Product, any>;
  title?: string;
  options: {
    label: string;
    value: boolean;
    icon?: Component;
  }[];
}

const props = defineProps<DataTableFacetedFilter>();

const facets = computed(() => props.column?.getFacetedUniqueValues());
const selectedValues = computed(() => {
  const value = props.column?.getFilterValue();
  if (Array.isArray(value)) {
    return new Set(value.map((v) => String(v)));
  }
  if (value !== undefined && value !== null) {
    return new Set([String(value)]);
  }
  return new Set();
});
</script>

<style></style>
