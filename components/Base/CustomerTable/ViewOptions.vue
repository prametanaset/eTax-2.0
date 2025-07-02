<template>
  <DropdownMenu>
    <div class="mr-4">
      <Toaster />
      <Button @click="isDialogOpen = true">เพิ่มข้อมูลลูกค้า</Button>
      <BaseAddCustomerForm
        v-model="isDialogOpen"
        mode="create"
        @customer-added="handleCreateCustomer"
      />
    </div>

    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex bg-[hsl(var(--card))]"
      >
        <MixerHorizontalIcon class="mr-2 h-4 w-4" /> View
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
import { ref, reactive, computed, watch } from "vue";
import type { Table } from "@tanstack/vue-table";
import type { Customer } from "@/types/customer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";
import MixerHorizontalIcon from "~icons/radix-icons/mixer-horizontal";

const { toast } = useToast();

const props = defineProps<{ table: Table<Customer> }>();
const customerStore = useCustomerStore();
const { createCustomerService, updateCustomerService, deleteCustomerService } =
  useCustomerService();

const isDialogOpen = ref(false);

const customer = reactive<Customer>({
  ID: 0,
  StoreId: "",
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Address: "",
  Tin: "",
  CustomerType: "",
});

const resetCustomer = () => {
  Object.assign(customer, {
    ID: 0,
    StoreId: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Address: "",
    Tin: "",
  });
};

watch(
  () => customerStore.customerToDelete,
  async (val) => {
    if (val) await handleDeleteCustomer();
  }
);

const handleCreateCustomer = async (newCustomer: Customer) => {
  try {
    // console.log(newCustomer);
    const type = newCustomer.branchCode ? "company" : "person";
    if (newCustomer.branchCode) {
      const payload = {
        ...newCustomer,
        tin: `${newCustomer.tin}${newCustomer.branchCode}`,
        firstName: `${newCustomer.companyName}`,
      };
      await createCustomerService(payload, type);
    } else {
      await createCustomerService(newCustomer, type);
    }

    isDialogOpen.value = false;
    await customerStore.getCustomer();
    resetCustomer();
    toast({ title: "เพิ่มข้อมูลลูกค้าสำเร็จ" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลลูกค้า",
    });
  }
};

const handleDeleteCustomer = async () => {
  try {
    // await deleteCustomerService(customerStore.customerToDelete);
    await customerStore.getCustomer();
    toast({ title: "ลบข้อมูลลูกค้าแล้ว" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการลบข้อมูลลูกค้า",
    });
  }
};

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter((col) => typeof col.accessorFn !== "undefined" && col.getCanHide())
);
</script>
