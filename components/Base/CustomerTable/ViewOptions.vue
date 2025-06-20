<template>
  <DropdownMenu>
    <div class="mr-4">
      <Toaster />
      <!-- <BaseDialog
        v-model="isDialogOpen"
        text="เพิ่มข้อมูลลูกค้า"
        bg-button="bg-primary-500"
        :title="
          customerStore.customerToUpdate
            ? 'แก้ไขข้อมูลลูกค้า'
            : 'เพิ่มข้อมูลลูกค้า'
        "
      >
        <template #content>
          <div class="grid gap-y-4">
            <div>
              <Label>ชื่อลูกค้า <span class="text-red-500">*</span></Label>
              <Input placeholder="กรอกชื่อ" v-model="customer.FirstName" />
            </div>
            <div>
              <Label>นามสกุล<span class="text-red-500">*</span></Label>
              <Input placeholder="กรอกนามสกุล" v-model="customer.LastName" />
            </div>
            <div>
              <Label>Email<span class="text-red-500">*</span></Label>
              <Input placeholder="กรอก Email" v-model="customer.Email" />
              <span class="text-red-500 text-sm font-light">{{
                emailError
              }}</span>
            </div>
            <div>
              <Label>Phone<span class="text-red-500">*</span></Label>
              <Input placeholder="เบอร์โทรติดต่อ" v-model="customer.Phone" />
              <span class="text-red-500 text-sm font-light">{{
                phoneError
              }}</span>
            </div>
            <div>
              <Label
                >หมายเลขผู้เสียภาษี<span class="text-red-500">*</span></Label
              >
              <Input v-model="customer.TaxIdNo" />
            </div>
            <div>
              <Label>ที่อยู่<span class="text-red-500">*</span></Label>
              <Textarea placeholder="ที่อยู่" v-model="customer.Address" />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <DialogClose as-child>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <Button
              v-if="!customerStore.customerToUpdate"
              :disabled="!canCreate"
              @click="handleCreateCustomer"
            >
              เพิ่มข้อมูล
            </Button>
            <Button v-else :disabled="!canCreate" @click="handleUpdateCustomer">
              บันทึกข้อมูล
            </Button>
          </div>
        </template>
      </BaseDialog> -->
      <Button @click="isDialogOpen = true">เพิ่มข้อมูลลูกค้า</Button>
      <BaseAddCustomerForm
        v-model="isDialogOpen"
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
import { ref, reactive, computed, watch, watchEffect } from "vue";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DialogClose from "~/components/ui/dialog/DialogClose.vue";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";
import MixerHorizontalIcon from "~icons/radix-icons/mixer-horizontal";

const { toast } = useToast();

const props = defineProps<{ table: Table<Customer> }>();
const customerStore = useCustomerStore();
const { createCustomerService, updateCustomerService, deleteCustomerService } =
  useCustomerService();

const isDialogOpen = ref(false);
const canCreate = ref(false);
const phoneisValid = ref(true);
const emailError = ref("");
const phoneError = ref("");

const customer = reactive<Customer>({
  ID: 0,
  StoreId: "",
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Address: "",
  TaxIdNo: "",
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
    TaxIdNo: "",
  });
  emailError.value = "";
  phoneError.value = "";
  phoneisValid.value = true;
};

watch(
  () => customerStore.customerToDelete,
  async (val) => {
    if (val) await handleDeleteCustomer();
  }
);

const handleCreateCustomer = async (customer: Customer) => {
  try {
    console.log(customer);
    // await createCustomerService(customer);
    isDialogOpen.value = false;
    // await customerStore.getCustomer();
    resetCustomer();
    toast({ title: "เพิ่มข้อมูลลูกค้าสำเร็จ" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลลูกค้า",
    });
  }
};

const handleUpdateCustomer = async () => {
  try {
    await updateCustomerService(customer);
    isDialogOpen.value = false;
    await customerStore.getCustomer();
    resetCustomer();
    toast({ title: "อัพเดทข้อมูลลูกค้าแล้ว" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการอัพเดทข้อมูลลูกค้า",
    });
  }
};

const handleDeleteCustomer = async () => {
  try {
    await deleteCustomerService(customerStore.customerToDelete);
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

<style scoped></style>
