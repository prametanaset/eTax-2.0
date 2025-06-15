<template>
  <div>
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
        <!-- <DropdownMenuItem class="cursor-pointer" @click="getProduct(row.original)"
        >รายละเอียด</DropdownMenuItem
      > -->
        <DropdownMenuSeparator />
        <DropdownMenuItem
          @click="editProduct(row.original)"
          class="cursor-pointer"
          >แก้ไข
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          class="cursor-pointer"
          @click="deletedProduct(row.original)"
        >
          ลบสินค้า
          <DropdownMenuShortcut><Trash2 class="w-4" /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- ยืนยันการลบ -->
    <AlertDialog :open="isAlertOpen" @update:open="isAlertOpen = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจหรือไม่ที่จะลบสินค้า?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong class="text-primary">{{
              `${productToDelete?.sku} : ${productToDelete?.name}`
            }}</strong>
            <div>
              การลบนี้ไม่สามารถย้อนกลับได้
              <span class="text-red-600">สินค้าจะถูกลบถาวร</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="isAlertOpen = false"
            >ยกเลิก</AlertDialogCancel
          >
          <AlertDialogAction @click="handleConfirmDelete"
            >ยืนยัน</AlertDialogAction
          >
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- เรียก Dialog Component -->
    <BaseAddProductDialog
      v-model="isDialogOpen"
      mode="edit"
      :product="selectedProduct"
      @product-updated="handleUpdateProduct"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Row } from "@tanstack/vue-table";
import type { Product, ProductPayload } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-vue-next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DotsHorizontalIcon from "~icons/radix-icons/dots-horizontal";
import {} from "~/composables/useProductService";

import { productSchema } from "./data/schema";
import { toast } from "~/components/ui/toast";

interface DataTableRowActionsProps {
  row: Row<Product>;
}

const isDialogOpen = ref(false);
const isAlertOpen = ref(false);
const props = defineProps<DataTableRowActionsProps>();
const productStore = useProductStore();
const selectedProduct = ref<ProductPayload[]>([]);
const productToDelete = ref<Product | null>(null);

const Product = computed(() => productSchema.parse(props.row.original));
const { updateProduct, deleteProduct } = useProductService();
const editProduct = async (product: Product) => {
  const res = await productStore.getProductFromId(product.id); // 🟢 รอข้อมูลมาก่อน

  const formattedProduct = {
    id: res.product.id,
    sku: res.product.sku,
    name: res.product.name,
    price: res.product.price,
    image: res.images?.[0]?.url || "",
    taxType: res.product.vat_type || "include",
  };

  selectedProduct.value = formattedProduct;
  isDialogOpen.value = true;
};

const handleUpdateProduct = async (product: any) => {
  try {
    await updateProduct(product);
    isDialogOpen.value = false;
    await productStore.getProduct(); // ✅ Store จะอัปเดตค่าเอง

    toast({
      title: "บันทึกข้อมูลสินค้าแล้ว",
    });
  } catch (err) {
    console.error("❌ Error updated product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้า",
    });
  }
};

const deletedProduct = (product: Product) => {
  productToDelete.value = product;
  isAlertOpen.value = true;
};

const handleConfirmDelete = async () => {
  if (!productToDelete.value) return;
  try {
    await deleteProduct(productToDelete.value.id);
    await productStore.getProduct();

    toast({ title: "ลบข้อมูลสินค้าแล้ว" });
  } catch (err) {
    console.error("❌ Error delete product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการลบข้อมูลสินค้า",
    });
  } finally {
    isAlertOpen.value = false;
    productToDelete.value = null;
  }
};
</script>

<style></style>
