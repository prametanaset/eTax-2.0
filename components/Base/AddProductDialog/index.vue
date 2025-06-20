<script setup lang="ts">
import { ref, computed, watch } from "vue";
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
import type { ProductPayload } from "~/types/product";

const props = defineProps<{
  modelValue: boolean;
  mode: "create" | "edit";
  product?: {
    id: number;
    name: string;
    sku: string;
    price: number;
    image: string;
    taxType: string;
  };
}>();

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
  (
    e: "product-updated",
    product: {
      id: number;
      name: string;
      sku: string;
      price: number;
      image: string;
      taxType: string;
    }
  ): void;
}>();

const newProduct = ref({
  id: 0,
  name: "",
  sku: "",
  price: 0,
  image: "",
  taxType: "include",
});

const isPriceModified = ref(false);
const isTaxTypeModified = ref(false);
const originalPrice = ref(0);
const originalTaxType = ref("include");

watch(
  () => props.product,
  (product) => {
    if (props.mode === "edit" && product) {
      newProduct.value = {
        id: product.id,
        sku: product.sku,
        name: product.name,
        price: product.price,
        image: product.image || "",
        taxType: product.taxType || "include",
      };
      originalPrice.value = product.price;
      originalTaxType.value = product.taxType || "include";
      isPriceModified.value = false;
      isTaxTypeModified.value = false;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(
  () => newProduct.value.price,
  (newVal) => {
    if (props.mode === "edit") {
      isPriceModified.value = newVal !== originalPrice.value;
    }
  }
);

watch(
  () => newProduct.value.taxType,
  (newVal) => {
    if (props.mode === "edit") {
      isTaxTypeModified.value = newVal !== originalTaxType.value;
    }
  }
);

const calculatedPrice = computed(() => {
  const vatRate = 0.07;
  const price = newProduct.value.price;

  // กรณี edit: ต้องเปลี่ยนอย่างน้อย price หรือ taxType
  if (
    props.mode === "edit" &&
    !isPriceModified.value &&
    !isTaxTypeModified.value
  ) {
    return price;
  }

  if (newProduct.value.taxType === "exclude") {
    return price * (1 + vatRate);
  }

  return price;
});

function resetForm() {
  newProduct.value = {
    id: 0,
    name: "",
    sku: "",
    price: 0,
    image: "",
    taxType: "include",
  };
}

function handleSave() {
  const payload = {
    ...newProduct.value,
    price: parseFloat(calculatedPrice.value.toFixed(2)),
    image: newProduct.value.image || "/images/products/default.jpg",
  };

  if (props.mode === "edit") {
    emit("product-updated", payload);
  } else {
    emit("product-added", payload);
  }

  emit("update:modelValue", false);
  resetForm();
}
</script>

<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>
          {{ mode === "edit" ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่" }}
        </DialogTitle>
        <DialogDescription>
          กรอกรายละเอียดสินค้า เลือกรูปแบบภาษี แล้วตรวจสอบราคาสุทธิ
        </DialogDescription>
      </DialogHeader>

      <Card class="border shadow-sm rounded-lg">
        <CardContent class="py-6 px-4 space-y-5">
          <!-- รหัส -->
          <div v-if="props.mode == 'edit'" class="space-y-2">
            <Label for="name">รหัสสินค้า</Label>
            <Input id="name" disabled v-model="newProduct.sku" />
          </div>
          <!-- ชื่อสินค้า -->
          <div class="space-y-2">
            <Label for="name">ชื่อสินค้า</Label>
            <Input id="name" v-model="newProduct.name" />
          </div>

          <!-- ราคาขาย -->
          <div class="space-y-2">
            <Label for="price">ราคาขาย</Label>
            <Input id="price" type="number" v-model="newProduct.price" />
          </div>

          <!-- ประเภทภาษี -->
          <div class="space-y-2">
            <Label>ประเภทภาษี</Label>
            <Select v-model="newProduct.taxType">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="เลือกภาษี" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="include">รวม VAT 7%</SelectItem>
                <SelectItem value="exclude">ไม่รวม VAT</SelectItem>
                <SelectItem value="exempt">ยกเว้นภาษี</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- ลิงก์รูป -->
          <div class="space-y-2">
            <Label for="image">ลิงก์รูป</Label>
            <Input id="image" v-model="newProduct.image" />
          </div>

          <!-- รูปภาพ -->
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
              class="w-32 h-32 flex items-center justify-center text-gray-500 bg-gray-50 rounded-md border border-dashed"
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
        <Button @click="handleSave">
          {{ mode === "edit" ? "บันทึกการแก้ไข" : "เพิ่มสินค้า" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
