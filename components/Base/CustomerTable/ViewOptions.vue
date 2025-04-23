<template>
  <DropdownMenu>
    <div class="mr-4">
      <Toaster />
      <BaseDialog
        v-model:open="isDialogOpen"
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
              <Input
                placeholder="กรอก Email"
                name="email"
                v-model="customer.Email"
              />
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
          <div class="flex justify-end">
            <div class="flex gap-2">
              <DialogClose as-child>
                <Button variant="outline">ยกเลิก</Button>
              </DialogClose>
              <Button
                v-if="
                  customerStore.customerToUpdate === null ||
                  customerStore.customerToUpdate.length === 0
                "
                :disabled="!canCreate"
                type="submit"
                @click="handleCreateCustomer"
                >เพิ่มข้อมูล</Button
              >
              <Button
                v-else
                :disabled="!canCreate"
                type="submit"
                @click="handleUpdateCustomer"
                >บันทึกข้อมูล</Button
              >
            </div>
          </div>
        </template>
      </BaseDialog>
    </div>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex bg-[hsl(var(--card))]"
      >
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        View
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
import type { Table } from "@tanstack/vue-table";
import type { Customer } from "./data/schema";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useField } from "vee-validate";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MixerHorizontalIcon from "~icons/radix-icons/mixer-horizontal";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "~/components/ui/toast/use-toast";
import { string } from "zod";
import { Phone } from "lucide-vue-next";
import DialogClose from "~/components/ui/dialog/DialogClose.vue";

const { toast } = useToast();

interface DataTableViewOptionsProps {
  table: Table<Customer>;
}

const { createCustomerService, updateCustomerService, deleteCustomerService } =
  useCustomerService();

const props = defineProps<DataTableViewOptionsProps>();

const canCreate = ref(false);
const isDialogOpen = ref(false);
const phoneisValid = ref(true);

const customerStore = useCustomerStore();

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    )
);

const customer = reactive({
  ID: 0,
  StoreId: 0,
  FirstName: "",
  Email: "",
  LastName: "",
  Address: "",
  TaxIdNo: "",
  Phone: "",
});

async function createCustomer() {
  try {
    await createCustomerService(customer);
  } catch (err) {
    throw err;
  }
}
async function editProduct() {
  try {
    await updateCustomerService(customer);
  } catch (err) {
    throw err;
  }
}
async function removeCustomer() {
  try {
    await deleteCustomerService(customerStore.customerToDelete);
  } catch (err) {
    throw err;
  }
}

const handleCreateCustomer = async () => {
  try {
    await createCustomer();
    isDialogOpen.value = false;
    await customerStore.getCustomer(); // ✅ Store จะอัปเดตค่าเอง

    // Clear ข้อมูลของ customer
    customer.ID = 0;
    customer.StoreId = 0;
    customer.FirstName = "";
    customer.LastName = "";
    customer.Email = "";
    customer.Address = "";
    customer.TaxIdNo = "";
    customer.Phone = "";
    toast({
      title: "เพิ่มข้อมูลลูกค้าสำเร็จ",
    });
  } catch (err) {
    console.error("❌ Error creating customer:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลลูกค้าสำเร็จ",
    });
  }
};
const handleUpdateCustomer = async () => {
  try {
    await editProduct();
    isDialogOpen.value = false;
    await customerStore.getCustomer(); // ✅ Store จะอัปเดตค่าเอง

    // Clear ข้อมูลของ customer
    customer.ID = 0;
    customer.StoreId = 0;
    customer.FirstName = "";
    customer.LastName = "";
    customer.Email = "";
    customer.Address = "";
    customer.TaxIdNo = "";
    customer.Phone = "";

    toast({
      title: "อัพเดทข้อมูลแล้ว",
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการอัพเดทข้อมูลลูกค้าสำเร็จ",
    });
  }
};

const handleDeleteCustomer = async () => {
  try {
    await removeCustomer();
    await customerStore.getCustomer(); // ✅ Store จะอัปเดตค่าเอง

    toast({
      title: "ลบข้อมูลแล้ว",
    });
  } catch (err) {
    console.error("❌ Error delete product:", err);
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการลบข้อมูลลูกค้า",
    });
  }
};

watch(
  () => customerStore.customerToUpdate,
  (newValue) => {
    if (newValue != null || newValue.length != 0) {
      isDialogOpen.value = true;
      phoneisValid.value = false;
    } else {
      isDialogOpen.value = false;
    }
  },
  { deep: true }
);

watch(
  () => customerStore.customerToDelete,
  (newValue) => {
    if (newValue) {
      handleDeleteCustomer();
    }
  },
  { deep: true }
);

watch(
  () => isDialogOpen.value, // ✅ ใช้ฟังก์ชันแทนค่า
  (newVal) => {
    if (!newVal) {
      customerStore.cleaCustomerToUpdate();

      // Clear ข้อมูลของ customer
      customer.ID = 0;
      customer.StoreId = 0;
      customer.FirstName = "";
      customer.LastName = "";
      customer.Email = "";
      customer.Address = "";
      customer.TaxIdNo = "";
      customer.Phone = "";
      emailError.value = "";
      phoneError.value = "";
      // clear email vee-validate
      phoneisValid.value = true;
    } else {
      customer.ID = customerStore.customerToUpdate.ID;
      customer.StoreId = customerStore.customerToUpdate.StoreID;
      customer.FirstName = customerStore.customerToUpdate.FirstName;
      customer.LastName = customerStore.customerToUpdate.LastName;
      customer.Email = customerStore.customerToUpdate.Email;
      customer.Address = customerStore.customerToUpdate.Address;
      customer.TaxIdNo = customerStore.customerToUpdate.TaxIdNo;
      customer.Phone = customerStore.customerToUpdate.Phone;
    }
  }
);

// --------------------------------------------------------------------------------------------------------

const emailError = ref("");

const validateEmail = (email: string): true | string => {
  if (!email && customerStore.customerToUpdate.Email !== "") {
    return "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "รูปแบบอีเมลไม่ถูกต้อง";

  return true;
};

// ✅ Watch แบบถูกต้อง
watch(
  () => customer.Email, // ต้องเป็น function
  (newVal) => {
    const result = validateEmail(newVal);
    if (result === true) {
      emailError.value = "";
    } else {
      emailError.value = result;
    }
  },
  { immediate: true }
);

// --------------------------------------------------------------------------------------------------------

const phoneError = ref("");

// ฟอร์แมตเบอร์โทรเป็น 123-456-7890
function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, ""); // ลบทุกอย่างที่ไม่ใช่ตัวเลข
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

  if (!match) return value;

  let result = "";
  if (match[1]) result = match[1];
  if (match[2]) result += "-" + match[2];
  if (match[3]) result += "-" + match[3];

  return result;
}

// ตรวจสอบว่าไม่มีตัวอักษร (ภาษาไทย/อังกฤษ)
const validatePhone = (phone: string): true | string => {
  if (!phone && customerStore.customerToUpdate.Phone !== "") {
    return "";
  }
  const hasLetter = /[A-Za-zก-๙]/.test(phone);
  if (hasLetter) return "กรุณากรอกเฉพาะตัวเลข";

  return true;
};

// Watch เมื่อ customer.Phone เปลี่ยนแปลง
watch(
  () => customer.Phone,
  (newVal) => {
    const result = validatePhone(newVal);
    if (result === true) {
      phoneError.value = "";
      customer.Phone = formatPhoneNumber(newVal); // ฟอร์แมตเมื่อ valid
      phoneisValid.value = false;
    } else {
      phoneError.value = result;
      phoneisValid.value = true;
    }
  }
);

// --------------------------------------------------------------------------------------------------------

watch(
  () => customer,
  (newVal) => {
    if (
      newVal &&
      newVal.FirstName.trim() !== "" &&
      newVal.LastName.trim() !== "" &&
      newVal.Email.trim() !== "" &&
      newVal.Address.trim() !== "" &&
      newVal.TaxIdNo !== "" &&
      phoneisValid.value === false
    ) {
      canCreate.value = true;
    } else {
      canCreate.value = false;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => customerStore.customerToDelete,
  (newValue) => {
    if (newValue) {
      handleDeleteCustomer();
    }
  },
  { deep: true }
);
</script>

<style></style>
