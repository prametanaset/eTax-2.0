<template>
  <DropdownMenu>
    <div class="mr-4">
      <Toaster />
      <BaseDialog
        v-model:open="isDialogOpen"
        text="เพิ่มสินค้า"
        bg-button="bg-primary-500"
        :title="productStore.productsToEdit ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'"
      >
        <template #content>
          <div class="grid gap-y-4">
            <div>
              <Label>ชื่อสินค้า <span class="text-red-500">*</span></Label>
              <Input placeholder="กรอกชื่อสินค้า" v-model="product.Name" />
            </div>
            <div>
              <Label>รายละเอียดสินค้า</Label>
              <Textarea
                placeholder="รายละเอียดสินค้า"
                v-model="product.Description"
              />
            </div>
            <div>
              <Label>ราคา<span class="text-red-500">*</span></Label>
              <Input placeholder="0" type="number" v-model="product.Price" />
            </div>
            <div class="grid gap-2">
              <div class="flex gap-2 items-center">
                <Switch id="airplane-mode" v-model="product.Vat" />
                <Label>VAT</Label>
              </div>
              <Input
                v-if="product.Vat"
                placeholder="0"
                type="number"
                min="0"
                v-model="product.VatRate"
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <div class="flex gap-2">
              <DialogClose as-child>
                <Button variant="outline">ยกเลิก</Button>
              </DialogClose>
              <Button
                v-if="productStore.productsToEdit === null"
                :disabled="!canCreate"
                type="submit"
                @click="handleCreateProduct"
                >สร้าง</Button
              >
              <Button
                v-else
                :disabled="!canCreate"
                type="submit"
                @click="handleUpdateProduct"
                >บันทึก</Button
              >
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
import type { Table } from "@tanstack/vue-table";
import type { Product } from "./data/schema";
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

const { createProduct, updateProduct, deleteProduct } = useProductService();

const props = defineProps<DataTableViewOptionsProps>();

const canCreate = ref(false);
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

const product = reactive({
  ID: 0,
  StoreId: 0,
  ProductCode: "",
  Name: "",
  Description: "",
  Price: 0,
  Vat: false,
  VatRate: 0,
});

async function addProduct() {
  try {
    await createProduct(product);
  } catch (err) {
    throw err;
  }
}
async function editProduct() {
  try {
    await updateProduct(product);
  } catch (err) {
    throw err;
  }
}
async function removeProduct() {
  try {
    await deleteProduct(productStore.productsToDelete);
  } catch (err) {
    throw err;
  }
}

const handleCreateProduct = async () => {
  try {
    await addProduct();
    isDialogOpen.value = false;
    await productStore.getProduct(); // ✅ Store จะอัปเดตค่าเอง

    // Clear ข้อมูลของ product
    product.ID = 0;
    product.StoreId = 0;
    product.ProductCode = "";
    product.Name = "";
    product.Description = "";
    product.Price = 0;
    product.Vat = false;
    product.VatRate = 0;

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
const handleUpdateProduct = async () => {
  try {
    await editProduct();
    isDialogOpen.value = false;
    await productStore.getProduct(); // ✅ Store จะอัปเดตค่าเอง

    // Clear ข้อมูลของ product
    product.ID = 0;
    product.StoreId = 0;
    product.ProductCode = "";
    product.Name = "";
    product.Description = "";
    product.Price = 0;
    product.Vat = false;
    product.VatRate = 0;

    toast({
      title: "บันทึกข้อมูลสินค้าแล้ว",
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้า",
    });
  }
};

const handleDeleteProduct = async () => {
  try {
    await removeProduct();
    await productStore.getProduct(); // ✅ Store จะอัปเดตค่าเอง

    toast({
      title: "ลบข้อมูลสินค้าแล้ว",
    });
  } catch (err) {
    console.error("❌ Error delete product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการลบข้อมูลสินค้า",
    });
  }
};

watch(
  () => productStore.productsToEdit,
  (newValue) => {
    if (newValue) {
      isDialogOpen.value = true;
    }
  },
  { deep: true }
);

watch(
  () => productStore.productsToDelete,
  (newValue) => {
    if (newValue) {
      handleDeleteProduct();
    }
  },
  { deep: true }
);

watch(
  () => isDialogOpen.value, // ✅ ใช้ฟังก์ชันแทนค่า
  (newVal) => {
    if (!newVal) {
      productStore.clearProductToEdit();

      product.ID = 0;
      product.Name = "";
      product.ProductCode = "";
      product.Description = "";
      product.Price = 0;
      product.Vat = false;
      product.VatRate = 0;
    } else {
      product.ID = productStore.productsToEdit.ID;
      product.StoreId = productStore.productsToEdit.StoreId;
      product.Name = productStore.productsToEdit.Name;
      product.ProductCode = productStore.productsToEdit.ProductCode;
      product.Description = productStore.productsToEdit.Description;
      product.Price = productStore.productsToEdit.Price;
      product.Vat = productStore.productsToEdit.Vat;
      product.VatRate = productStore.productsToEdit.VatRate;
    }
  }
);

watch(
  product,
  (newVal) => {
    if (
      newVal &&
      newVal.Name.trim() !== "" &&
      newVal.Price !== null &&
      newVal.Price > 0
    ) {
      canCreate.value = true;
    } else {
      canCreate.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style></style>
