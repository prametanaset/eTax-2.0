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
          @click="handleDeleteCustomer(row.original)"
        >
          ลบข้อมูลลูกค้า
          <DropdownMenuShortcut><Trash2 class="w-4" /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
  row: Row<Customer>;
}

const { toast } = useToast();
const props = defineProps<DataTableRowActionsProps>();
const customerStore = useCustomerStore();
const isDialogOpen = ref(false);

let selectCustomer = ref([]);

const {
  updateCustomerService,
  deleteCustomerService,
  getCustomersByIdService,
  getCustomersService,
} = useCustomerService();

const updateCustomer = async (customer: Customer) => {
  const res = await getCustomersByIdService(customer.ID);
  selectCustomer = convertToFormProps(res);
  isDialogOpen.value = true;
};

const handleUpdateCustomer = async (customer: Customer) => {
  try {
    await updateCustomerService(customer);
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

const handleDeleteCustomer = async (customer: Customer) => {
  try {
    await deleteCustomerService(customer);
    await customerStore.getCustomer();
    toast({ title: "ลบข้อมูลลูกค้าแล้ว" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการลบข้อมูลลูกค้า",
    });
  }
};

const convertToFormProps = (res: any) => {
  const person = res.person;
  const address = res.customer.customer_address;
  const contacts = res.contact;

  return {
    name: `${person.first_name} ${person.last_name}`.trim(),
    firstName: person.first_name,
    lastName: person.last_name,
    email:
      contacts.find((c: any) => c.contact_type === "email")?.contact_value ||
      "",
    phone:
      contacts.find((c: any) => c.contact_type === "phone")?.contact_value ||
      "",
    zipCode: parseInt(address.postal_code),
    vatNo: person.vat_no || null,
    address: address.address_line1,
    provinceId: address.province_id,
    districtsId: address.districts_id,
    subdistrictsId: address.subdistricts_id,
  };
};
</script>

<style></style>
