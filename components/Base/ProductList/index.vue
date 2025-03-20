<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Trash, ChevronDown } from 'lucide-vue-next'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from '@/components/ui/command'
import { Label } from '@/components/ui/Label'

const [UseTemplate, DiscountForm] = createReusableTemplate()

const availableProducts = [
  { id: 1, name: 'Summer 2K23 T-shirt', price: 125000, image: '/avatars/shadcn.png' },
  { id: 2, name: 'Winter Jacket', price: 250000, image: '/avatars/rick.png' },
  { id: 3, name: 'Sneakers', price: 180000, image: '/avatars/summer.png' }
]

// Initially empty, user selects product first
const products = ref([])

const addProduct = (selectedProduct) => {
  const existingProduct = products.value.find(
    product => product.id === selectedProduct.id
  );

  if (existingProduct) {
    // If the product already exists, increment its quantity
    existingProduct.quantity += 1;
  } else {
    // Otherwise, add it as a new product with initial settings
    products.value.push({
      ...selectedProduct,
      quantity: 1,
      discountValue: 0,
      discountType: '%',
      tax: '10%'
    });
  }
}

const removeProduct = (id) => {
  products.value = products.value.filter(product => product.id !== id)
}

const screenWidth = ref(0); // Start with 0 or a default value

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWidth(); // Set initial width
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

</script>

<template>
  <div class="space-y-4">

    <!-- Product Selection Popover -->
    <Popover v-if="!(products.length > 0)">
      <PopoverTrigger as-child>
        <Button variant="outline" class="w-72 flex items-center justify-between text-left">
          <span>เพิ่มรายการสินค้า</span>
          <ChevronDown class="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-80" align="end">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              <CommandItem v-for="product in availableProducts" :key="product.id" @select="addProduct(product)"
                :value="product.id" class="flex items-center px-4 py-2 cursor-pointer">
                <img :src="product.image" class="w-10 h-10 rounded-md object-cover mr-3" />
                <div>
                  <p class="font-medium">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.price.toLocaleString() }} บาท</p>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <!-- Header Row -->
    <div v-if="products.length"
      class="grid grid-cols-[1fr_80px_80px_100px_50px] gap-4 p-2 text-gray-500 font-medium border-b items-center max-sm:hidden">
      <span class="pl-2">รายละเอียด</span>
      <span class="text-center">จำนวน</span>
      <span class="text-center">ส่วนลด</span>
      <span class="text-center">ภาษี</span>
      <span class="text-center"></span> <!-- Empty for delete button -->
    </div>

    <div class="space-y-4">
      <div v-for="product in products" :key="product.id"
        class="grid sm:grid-cols-[1fr_80px_80px_90px_50px] gap-4 items-center p-4 border rounded-lg shadow-sm bg-white"
        :class="screenWidth < 640 ? 'grid-cols-2' : 'grid-cols-1'">
        <!-- Product Info -->
        <div class="flex items-center space-x-4 w-full sm:w-48" :class="screenWidth < 640 ? 'col-span-2' : ''">
          <img :src="product.image" :alt="product.name" class="w-12 h-12 rounded-md object-cover" />
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ product.name }}</p>
            <p class="text-sm text-gray-500">
              {{ product.price.toLocaleString() }} บาท
            </p>
          </div>
        </div>

        <!-- Quantity Input -->
        <div class="w-full sm:w-16 mx-auto">
          <Label class="block text-xs text-gray-600 sm:hidden">จำนวน</Label>
          <Input type="number" v-model="product.quantity" min="1"
            class="text-center w-full border-gray-300 rounded-md" />
        </div>

        <!-- Discount Popover -->
        <div>
          <Label class="block text-xs text-gray-600 sm:hidden">ส่วนลด</Label>
          <Popover v-if="screenWidth > 640">
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-full sm:w-20 text-center text-sm truncate">
                {{ product.discountValue }} {{ product.discountType }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="font-medium leading-none">เพิ่มส่วนลด</h4>
                  <p class="text-sm text-muted-foreground">
                    กรุณาเลือกประเภทและมูลค่าของส่วนลด
                  </p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <span>ประเภท</span>
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
                    <span>มูลค่า</span>
                    <Input type="number" v-model="product.discountValue" min="0" class="col-span-2 h-8 text-center" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <!-- Mobile Discount -->
          <Drawer v-else>
            <DrawerTrigger as-child>
              <Button variant="outline" class="w-full sm:w-20 text-center text-sm truncate">
                {{ product.discountValue }} {{ product.discountType }}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader class="text-left">
                <DrawerTitle>เพิ่มส่วนลด</DrawerTitle>
                <DrawerDescription>กรุณาเลือกประเภทและมูลค่าของส่วนลด</DrawerDescription>
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
                  <Input type="number" v-model="product.discountValue" min="0" class="col-span-2 h-8 text-center" />
                </div>
                <!-- <Button type="submit"> -->

                <DrawerClose type="button">
                  <Button class="w-full">
                    บันทึก
                  </Button>
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

        <!-- Delete Button -->
        <div>
          <!-- <Label class="block text-xs text-gray-600 sm:hidden">ลบ</Label> -->
          <Button variant="ghost" class="text-red-500 hover:text-red-600 w-full sm:w-auto"
            @click="removeProduct(product.id)">
            <Trash class="w-5 h-5 mx-auto sm:mx-0" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Product Selection Popover -->
    <Popover v-if="products.length">
      <PopoverTrigger as-child>
        <Button variant="link" class="w-72 flex items-center justify-between text-left">
          <span>เพิ่มรายการสินค้า</span>
          <!-- <ChevronDown class="h-4 w-4 text-muted-foreground" /> -->
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-72" align="end">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              <CommandItem v-for="product in availableProducts" :key="product.id" @select="addProduct(product)"
                :value="product.id" class="flex items-center px-4 py-2 cursor-pointer">
                <img :src="product.image" class="w-10 h-10 rounded-md object-cover mr-3" />
                <div>
                  <p class="font-medium">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.price.toLocaleString() }} บาท</p>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>