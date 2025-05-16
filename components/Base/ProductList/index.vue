<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Input } from "@/components/ui/input";
import Draggable from "vuedraggable";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash, Plus, CirclePlus, GripVertical } from "lucide-vue-next";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";

const availableProducts = ref([
  {
    id: 1,
    name: "เสื้อยืด",
    price: 125000,
    image: "/images/products/shirt.jpg",
  },
  {
    id: 2,
    name: "กางเกงยีน",
    price: 250000,
    image: "/images/products/jeans.jpg",
  },
  {
    id: 3,
    name: "รองเท้าผ้าใบ",
    price: 180000,
    image: "/images/products/sneakers.jpg",
  },
]);

const products = ref<any[]>([]);
const isPopoverOpen = ref(false);
const isDialogOpen = ref(false);
const lastAddedProductId = ref<number | null>(null);

const handleNewProductAdded = (product: any) => {
  availableProducts.value.push(product);
};

const addProduct = (selectedProduct: any) => {
  const existing = products.value.find((p) => p.id === selectedProduct.id);
  if (existing) {
    existing.quantity += 1;
    lastAddedProductId.value = existing.id;
  } else {
    const newProduct = {
      ...selectedProduct,
      quantity: 1,
      discountValue: 0,
      discountType: "%",
      tax: "10%",
    };
    products.value.push(newProduct);
    lastAddedProductId.value = newProduct.id;
  }

  isPopoverOpen.value = false;

  nextTick(() => {
    const el = document.querySelector(`#product-${lastAddedProductId.value}`);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
};

const removeProduct = (id: number) => {
  products.value = products.value.filter((p) => p.id !== id);
};

const screenWidth = ref(0);
const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};
onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const currencyFormat = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(value);
</script>

<template>
  <div class="space-y-4">
    <!-- Header Row -->
    <div
      v-if="true"
      class="grid grid-cols-[1fr_80px_80px_100px_50px_50px] gap-4 p-2 py-1 font-base border-b text-base  items-center max-sm:hidden"
    >
      <span>รายละเอียด</span>
      <span class="text-center">จำนวน</span>
      <span class="text-center">ส่วนลด</span>
      <span class="text-center">ภาษี</span>
      <span class="text-center">รวม</span>
      <span class="text-center"></span>

      <!-- Empty for delete button -->
    </div>
    <!-- Product Selection Popover -->
    <Popover v-if="!(products.length > 0)">
      <PopoverTrigger as-child>
        <Button
          class="flex items-center rounded-xl justify-between px-3 text-left"
        >
          <CirclePlus /> <span>เพิ่มรายการสินค้า</span>
        </Button>
      </PopoverTrigger>
      <!--       <PopoverContent class="p-0 w-[var(--reka-popper-anchor-width)]" align="end" >
 -->
      <PopoverContent class="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                :value="'new-product'"
                @select="isDialogOpen = true"
                class="flex items-center px-4 py-2 cursor-pointer text-blue-600 font-semibold"
              >
                <CirclePlus class="w-5 h-5 mr-3" />
                <span>เพิ่มสินค้าใหม่</span>
              </CommandItem>
              <CommandItem
                v-for="product in availableProducts"
                :key="product.id"
                @select="addProduct(product)"
                :value="product.id"
                class="flex items-center px-4 py-2 cursor-pointer"
              >
                <img
                  :src="product.image"
                  class="w-10 h-10 rounded-md object-cover mr-3"
                />
                <div>
                  <p class="font-medium">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">
                    {{ currencyFormat(product.price) }} บาท
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <Draggable
      v-model="products"
      item-key="id"
      handle=".drag-handle"
      tag="div"
      :animation="150"
      :ghost-class="'ghost'"
      class="space-y-3"
    >
      <template #item="{ element: product }">
        <div
          :key="product.id"
          :id="`product-${product.id}`"
          class="relative grid sm:grid-cols-[1fr_80px_80px_90px_80px_auto] gap-2 items-center border rounded-lg shadow-none bg-[hsl(var(--card))]"
          :class="screenWidth < 640 ? 'grid-cols-2' : ''"
        >
          <!-- <div
            class="absolute left-0 drag-handle cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700"
          >
            <GripVertical class="w-4 h-4" />
          </div> -->

          <!-- Product Info -->
          <div
            class="flex items-center space-x-4 w-full overflow-hidden py-3 pl-4 drag-handle cursor-grab active:cursor-grabbing"
            :class="screenWidth < 640 ? 'col-span-2' : ''"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-12 h-12 rounded-xl object-cover"
            />
            <div class="flex-1 min-w-0">
              <p class="font-semibold truncate">{{ product.name }}</p>
              <p class="text-xs font-medium text-gray-500">SKU: SHIRT-001</p>
            </div>
          </div>

          <!-- Quantity Input -->
          <div class="w-full sm:w-16 mx-auto">
            <Label class="block text-xs text-gray-600 sm:hidden">จำนวน</Label>
            <Input
              type="number"
              v-model="product.quantity"
              min="1"
              class="text-center w-full border-gray-300 rounded-md"
            />
          </div>

          <!-- Discount Popover -->
          <div>
            <Label class="block text-xs text-gray-600 sm:hidden">ส่วนลด</Label>
            <Popover v-if="screenWidth > 640">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  class="w-full sm:w-20 text-center text-sm truncate bg-[hsl(var(--card))]"
                >
                  {{ product.discountValue }} {{ product.discountType }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-80">
                <div class="grid gap-4">
                  <div class="space-y-2">
                    <h4 class="font-bold leading-none">เพิ่มส่วนลด</h4>
                    <p class="text-sm text-muted-foreground font-medium">
                      กรุณาเลือกประเภทและมูลค่าของส่วนลด
                    </p>
                  </div>
                  <div class="grid gap-2">
                    <div class="grid grid-cols-3 items-center gap-4">
                      <span class="font-semibold">ประเภท</span>
                      <Select v-model="product.discountType">
                        <SelectTrigger class="col-span-2 h-8 font-light">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="%" class="font-light"
                            >เปอร์เซ็นต์ (%)</SelectItem
                          >
                          <SelectItem value="บาท" class="font-light"
                            >บาท (฿)</SelectItem
                          >
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="grid grid-cols-3 items-center gap-4">
                      <span class="font-semibold">มูลค่า</span>
                      <Input
                        type="number"
                        v-model="product.discountValue"
                        min="0"
                        class="col-span-2 h-8 text-center"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <!-- Mobile Discount -->
            <Drawer v-else>
              <DrawerTrigger as-child>
                <Button
                  variant="outline"
                  class="w-full sm:w-20 text-center text-sm truncate"
                >
                  {{ product.discountValue }} {{ product.discountType }}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader class="text-left">
                  <DrawerTitle>เพิ่มส่วนลด</DrawerTitle>
                  <DrawerDescription
                    >กรุณาเลือกประเภทและมูลค่าของส่วนลด</DrawerDescription
                  >
                </DrawerHeader>
                <form class="grid gap-4 px-4 py-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label>ประเภท</Label>
                    <Select v-model="product.discountType">
                      <SelectTrigger class="col-span-2 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="%">%</SelectItem>
                        <SelectItem value="บาท">บาท</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label>มูลค่า</Label>
                    <Input
                      type="number"
                      v-model="product.discountValue"
                      min="0"
                      class="col-span-2 h-8 text-center"
                    />
                  </div>
                  <DrawerClose type="button">
                    <Button class="w-full"> บันทึก </Button>
                  </DrawerClose>
                </form>
                <DrawerFooter class="pt-2">
                  <DrawerClose as-child>
                    <Button variant="outline">ยกเลิก</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <!-- Tax Dropdown -->
          <div>
            <Label class="block text-xs text-gray-600 sm:hidden">ภาษี</Label>
            <Select v-model="product.tax">
              <SelectTrigger class="w-full sm:w-20 mx-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0%">0%</SelectItem>
                <SelectItem value="5%">5%</SelectItem>
                <SelectItem value="10%">10%</SelectItem>
                <SelectItem value="15%">15%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Subtotal Input -->
          <div class="w-full mx-auto">
            <Label class="block text-xs text-gray-600 sm:hidden">จำนวน</Label>
            <Input
              type="text"
              v-model="product.quantity"
              min="1"
              class="text-center w-full rounded-md"
            />
          </div>

          <!-- Delete Button -->
          <div>
            <Button
              variant="ghost"
              class="text-red-500 hover:text-red-600 w-full sm:w-auto mr-4"
              @click="removeProduct(product.id)"
            >
              <Trash class="w-5 h-5 mx-auto sm:mx-0" />
            </Button>
          </div>
        </div>
      </template>
    </Draggable>

    <!-- Product Selection Popover -->
    <Popover v-if="products.length" v-model:open="isPopoverOpen">
      <PopoverTrigger as-child>
        <Button
          variant="link"
          class="flex items-center justify-between text-left"
        >
          <Plus />
          <span>เพิ่มรายการสินค้า</span>
          <!-- <ChevronDown class="h-4 w-4 text-muted-foreground" /> -->
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-72" align="start">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                @select="isDialogOpen = true"
                class="flex items-center px-4 py-2 cursor-pointer text-blue-600 font-semibold"
              >
                <CirclePlus class="w-5 h-5 mr-3" />
                <span>เพิ่มสินค้าใหม่</span>
              </CommandItem>
              <CommandItem
                v-for="product in availableProducts"
                :key="product.id"
                @select="addProduct(product)"
                :value="product.id"
                class="flex items-center px-4 py-2 cursor-pointer"
              >
                <img
                  :src="product.image"
                  class="w-10 h-10 rounded-md object-cover mr-3"
                />
                <div>
                  <p class="font-medium">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">
                    {{ currencyFormat(product.price) }} บาท
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <!-- เรียก Dialog Component -->
    <BaseAddProductDialog
      v-model="isDialogOpen"
      @product-added="handleNewProductAdded"
    />
  </div>
</template>

<style scoped>
.custom-shadow {
  filter: drop-shadow(0 10px 15px rgba(6, 182, 212, 0.5)); /* cyan-500/50 */
}
.fade-move {
  transition: transform 0.3s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
