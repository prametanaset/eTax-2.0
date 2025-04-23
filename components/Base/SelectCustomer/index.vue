<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { ChevronsUpDown, Search } from "lucide-vue-next";

const { getCustomersService } = useCustomerService();

// กำหนด Type ให้ `customers`
type Customer = {
  ID: number;
  StoreId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  CreatedAt: string; // หรือ Date ถ้าจะใช้เป็น Date object
  UpdatedAt: string;
};

const customers = ref<Customer[]>([]);
onMounted(async () => {
  try {
    customers.value = await getCustomersService();
  } catch (error) {
    console.error("❌ Failed to load customers:", error);
  }
});

// กำหนด `value` ให้รองรับ `Customer | null`
const value = ref<Customer | null>(null);
</script>

<template>
  <Combobox v-model="value" by="ID">
    <ComboboxAnchor class="w-full h-fit" as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          class="justify-between font-normal text-left bg-[hsl(var(--card))]"
        >
          <!-- แสดงข้อมูลลูกค้าที่เลือก -->
          <BaseAvatar
            v-if="value"
            :text="`${value.FirstName[0]} ${value.LastName[0]}`"
            :title="`${value.FirstName} ${value.LastName}`"
            :description="value.Email"
          />
          <p v-else>กรุณาเลือกข้อมูลลูกค้า</p>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="p-1 w-[var(--reka-popper-anchor-width)]">
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10 w-[var(--reka-popper-anchor-width)]"
          placeholder="ค้นหาลูกค้า..."
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
        >
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty> ไม่มีข้อมูลลูกค้า </ComboboxEmpty>

      <ComboboxGroup>
        <!-- แสดงรายการลูกค้าจากข้อมูล -->
        <ComboboxItem
          v-for="customer in customers"
          :key="customer.ID"
          :value="customer"
        >
          <BaseAvatar
            :text="`${customer.FirstName[0]} ${customer.LastName[0]}`"
            :title="`${customer.FirstName} ${customer.LastName}`"
            :description="customer.Email"
          />
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
