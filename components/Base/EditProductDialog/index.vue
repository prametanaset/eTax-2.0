<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const props = defineProps<{ modelValue: boolean }>();
const { productsToEdit } = useProductStore();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (
    e: "product-added",
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
      taxType: string;
    }
  ): void;
}>();

const editProduct = ref({
  id: productsToEdit.ID,
  name: productsToEdit.Name,
  price: productsToEdit.Price,
  image: productsToEdit.Img,
  taxType: productsToEdit.VatType,
});

const calculatedPrice = computed(() => {
  const vatRate = 0.07;
  const price = editProduct.value.price;
  return editProduct.value.taxType === "exclude"
    ? price * (1 + vatRate)
    : price;
});

function handleEditProduct() {
  emit("product-added", {
    id: Date.now(),
    name: editProduct.value.name,
    price: parseFloat(calculatedPrice.value.toFixed(2)),
    image: editProduct.value.image || "/images/products/default.jpg",
    taxType: editProduct.value.taxType,
  });
  emit("update:modelValue", false);
  editProduct.value = {
    name: "",
    price: 0,
    image: "",
    taxType: "include",
  };
}
</script>

<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>แก้ไขสินค้า</DialogTitle>
        <DialogDescription>
          กรอกรายละเอียดสินค้า เลือกรูปแบบภาษี แล้วตรวจสอบราคาสุทธิ
        </DialogDescription>
      </DialogHeader>

      <Card class="border shadow-sm rounded-lg">
        <CardContent class="py-6 px-4 space-y-5">
          <!-- ชื่อสินค้า -->
          <div class="space-y-2">
            <Label for="name">ชื่อสินค้า</Label>
            <Input
              id="name"
              v-model="newProduct.name"
              class="bg-[hsl(var(--card))]"
            />
          </div>

          <!-- ราคาขาย -->
          <div class="space-y-2">
            <Label for="price">ราคาขาย</Label>
            <Input
              id="price"
              type="number"
              placeholder="ระบุราคาสินค้า"
              v-model="newProduct.price"
              class="bg-[hsl(var(--card))]"
            />
          </div>

          <!-- ประเภทภาษี -->
          <div class="space-y-2">
            <Label>ประเภทภาษี</Label>
            <Select v-model="newProduct.taxType">
              <SelectTrigger class="shadow-none w-full">
                <SelectValue placeholder="เลือกภาษี" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="include">รวม VAT 7%</SelectItem>
                <SelectItem value="exclude">ไม่รวม VAT (บวกภายหลัง)</SelectItem>
                <SelectItem value="exempt">ยกเว้นภาษี</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- ลิงก์รูป -->
          <div class="space-y-2">
            <Label for="image">ลิงก์รูป</Label>
            <Input
              id="image"
              v-model="newProduct.image"
              class="bg-[hsl(var(--card))]"
            />
          </div>

          <!-- ตัวอย่างรูป -->
          <div class="flex justify-center">
            <div v-if="newProduct.image" class="w-32 h-32">
              <img
                :src="newProduct.image"
                alt="preview"
                class="w-32 h-32 object-cover rounded-md border shadow"
              />
            </div>
            <div
              v-else
              class="w-32 h-32 flex items-center justify-center text-center text-sm text-gray-500 bg-gray-50 rounded-md border border-dashed shadow"
            >
              ยังไม่มีรูปสินค้า
            </div>
          </div>

          <!-- ราคาสุทธิ -->
          <div class="text-center mt-4">
            <Badge variant="outline">
              {{
                newProduct.taxType === "include"
                  ? "รวม VAT"
                  : newProduct.taxType === "exclude"
                  ? "ไม่รวม VAT"
                  : "ยกเว้นภาษี"
              }}
            </Badge>
            <div class="mt-2 text-lg font-bold">
              ราคาสุทธิ:
              {{
                calculatedPrice.toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })
              }}
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogFooter class="pt-6">
        <DialogClose as-child>
          <Button type="button" variant="outline">ยกเลิก</Button>
        </DialogClose>
        <Button @click="handleEditProduct">แก้ไข</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
