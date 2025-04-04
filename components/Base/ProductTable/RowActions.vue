<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px] cursor-pointer">
      <DropdownMenuItem
        @click="editProduct(row.original)"
        class="cursor-pointer"
        >แก้ไข</DropdownMenuItem
      >
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="cursor-pointer"
        @click="deleteProduct(row.original)"
      >
        ลบสินค้า
        <DropdownMenuShortcut><Trash2 class="w-4" /></DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import type { Row } from "@tanstack/vue-table";
import type { Product } from "./data/schema";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DotsHorizontalIcon from "~icons/radix-icons/dots-horizontal";

import { labels } from "./data/data";
import { productSchema } from "./data/schema";
import ViewOptions from "./ViewOptions.vue";

interface DataTableRowActionsProps {
  row: Row<Product>;
}
const props = defineProps<DataTableRowActionsProps>();
const productStore = useProductStore();

const Product = computed(() => productSchema.parse(props.row.original));

const editProduct = (product: Product) => {
  productStore.setProductToEdit(product);
};
const deleteProduct = (product: Product) => {
  productStore.setProductToDelete(product);
};
</script>

<style></style>
