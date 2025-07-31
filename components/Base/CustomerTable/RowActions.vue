<template>
  <div class="">
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
          @click="updateCustomer(row.original)"
          class="cursor-pointer"
          >แก้ไข</DropdownMenuItem
        >
        <DropdownMenuSeparator />
        <DropdownMenuItem
          class="cursor-pointer"
          @click="deleteCustomer(row.original)"
        >
          ลบข้อมูลลูกค้า
          <DropdownMenuShortcut><Trash2 class="w-4" /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- ยืนยันการลบ -->
    <AlertDialog :open="isAlertOpen" @update:open="isAlertOpen = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            >คุณแน่ใจหรือไม่ที่จะลบข้อมูลลูกค้า?</AlertDialogTitle
          >
          <AlertDialogDescription>
            <strong
              v-if="customerToDelete?.CustomerType === 'บุคคลธรรมดา'"
              class="text-primary"
              >{{
                `${customerToDelete?.FirstName} ${customerToDelete?.LastName}`
              }}</strong
            >
            <strong v-else class="text-primary">{{
              `${customerToDelete?.FirstName}`
            }}</strong>
            <div>การลบนี้ไม่สามารถย้อนกลับได้</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="isAlertOpen = false"
            >ยกเลิก</AlertDialogCancel
          >
          <AlertDialogAction @click="handleDeleteCustomer"
            >ยืนยัน</AlertDialogAction
          >
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <BaseAddCustomerForm
      v-model="isDialogOpen"
      mode="edit"
      :customer="selectCustomer"
      @customer-updated="handleUpdateCustomer"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Row } from "@tanstack/vue-table";
import type { Customer } from "./data/schema";
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
import { useToast } from "~/components/ui/toast/use-toast";

interface DataTableRowActionsProps {
  row: any;
}

const { toast } = useToast();
const props = defineProps<DataTableRowActionsProps>();
const customerStore = useCustomerStore();
const isDialogOpen = ref(false);
const isAlertOpen = ref(false);
const customerToDelete = ref<Customer | null>(null);

var selectCustomer = ref([]);
const {
  updateCustomerService,
  deleteCustomerService,
  getCustomersByIdService,
} = useCustomerService();

const updateCustomer = async (customer: Customer) => {
  const res = await getCustomersByIdService(customer.ID);
  selectCustomer = convertToFormProps(res);
  isDialogOpen.value = true;
};

const handleUpdateCustomer = async (customer: Customer) => {
  try {
    await updateCustomerService(customer.id, customer, customer.customerType);
    isDialogOpen.value = false;
    await customerStore.getCustomer();
    toast({ title: "อัพเดทข้อมูลลูกค้าแล้ว" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการอัพเดทข้อมูลลูกค้า",
    });
  }
};

const deleteCustomer = (customer: Customer) => {
  customerToDelete.value = customer;
  isAlertOpen.value = true;
};

const handleDeleteCustomer = async () => {
  try {
    await deleteCustomerService(customerToDelete.value.ID);
    await customerStore.getCustomer();
    toast({ title: "ลบข้อมูลลูกค้าแล้ว" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการลบข้อมูลลูกค้า",
    });
  }
};
</script>

<style></style>
