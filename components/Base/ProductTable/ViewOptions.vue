<template>
  <DropdownMenu>
    <div class="mr-4">
      <Toaster />
      <Button @click="isDialogOpen = true"> เพิ่มสินค้า </Button>
      <!-- เรียก Dialog Component -->
      <BaseAddProductDialog
        v-model="isDialogOpen"
        mode="add"
        @product-added="handleCreateProduct"
      />
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
import type { Table } from "@tanstack/vue-table";
// import type { Product } from "./data/schema";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MixerHorizontalIcon from "~icons/radix-icons/mixer-horizontal";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "~/components/ui/toast/use-toast";

const { toast } = useToast();

interface DataTableViewOptionsProps {
  table: Table<Product>;
}

const { createProduct } = useProductService();

const props = defineProps<DataTableViewOptionsProps>();

const isDialogOpen = ref(false);

const productStore = useProductStore();

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    )
);

async function addProduct(productData: any) {
  try {
    await createProduct(productData);
  } catch (err) {
    throw err;
  }
}

const handleCreateProduct = async (product: any) => {
  try {
    await addProduct(product);
    isDialogOpen.value = false;
    await productStore.getProduct(); // ✅ Store จะอัปเดตค่าเอง
    toast({
      title: "สร้างสินค้าสำเร็จ",
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการสร้างสินค้า",
    });
  }
};
</script>

<style></style>
