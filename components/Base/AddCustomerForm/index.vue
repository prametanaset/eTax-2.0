<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLocationService } from "@/composables/useLocationService";

const props = defineProps<{
  modelValue: boolean;
  mode: "create" | "edit";
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: number;
    vatNo: string | null;
    address: string;
    provinceId: number;
    districtsId: number;
    subdistrictsId: number;
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (
    e: "customer-added" | "customer-updated",
    customer: {
      firstName?: string;
      lastName?: string;
      companyName?: string;
      email: string;
      phone: string;
      branchCode?: string;
      zipCode: number;
      tin: string | null;
      address: string;
      provinceId: number;
      districtsId: number;
      subdistrictsId: number;
    }
  ): void;
}>();

const activeTab = ref<"person" | "corporate">("corporate");

const person = ref({
  firstName: "",
  lastName: "",
  phone: "",
  tin: "",
  email: "",
  zipCode: 0,
  address: "",
  provinceId: 0,
  districtsId: 0,
  subdistrictsId: 0,
});

const corporate = ref({
  companyName: "",
  tin: "",
  branchCode: "",
  address: "",
  email: "",
  phone: "",
  zipCode: 0,
  provinceId: 0,
  districtsId: 0,
  subdistrictsId: 0,
});

function submitCustomer(type: "person" | "corporate") {
  const data = type === "person" ? person.value : corporate.value;

  emit(props.mode === "edit" ? "customer-updated" : "customer-added", data);
  emit("update:modelValue", false);
}

const handleSelectLocation = (data: any) => {
  if (activeTab.value === "person") {
    person.value.provinceId = data.provinceId;
    person.value.districtsId = data.districtId;
    person.value.subdistrictsId = data.subdistrictId;
    person.value.zipCode = data.zipCode;
  } else {
    corporate.value.provinceId = data.provinceId;
    corporate.value.districtsId = data.districtId;
    corporate.value.subdistrictsId = data.subdistrictId;
    corporate.value.zipCode = data.zipCode;
  }
};
</script>

<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <!-- เปลี่ยนสี ความทึบ และเบลอของฉากหลังตรงนี้ -->

    <DialogContent
      class="sm:max-w-4xl w-full max-h-[90dvh] bg-[hsl(var(--card))] overflow-hidden"
    >
      <div class="grid gap-6">
        <!-- Left: Tabs Form -->
        <div>
          <DialogHeader>
            <DialogTitle>ตั้งค่าร้านค้า</DialogTitle>
            <DialogDescription>
              เลือกประเภทและกรอกข้อมูลให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>

          <Tabs v-model="activeTab" class="w-full mt-4">
            <TabsList class="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="corporate">นิติบุคคล</TabsTrigger>
              <TabsTrigger value="person">บุคคลธรรมดา</TabsTrigger>
            </TabsList>

            <!-- Corporate (นิติบุคคล) -->
            <TabsContent value="corporate">
              <Card>
                <CardHeader>
                  <CardTitle>นิติบุคคล</CardTitle>
                  <CardDescription>
                    กรอกชื่อร้านค้าและเลขประจำตัวผู้เสียภาษี
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <Label for="storeName">ชื่อร้านค้า</Label>
                    <Input
                      id="storeName"
                      v-model="corporate.companyName"
                      placeholder="ชื่อบริษัท / ร้านค้า"
                    />
                  </div>
                  <div class="flex gap-4">
                    <!-- Tax ID -->
                    <div class="flex-1">
                      <Label for="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                      <Input
                        id="taxId"
                        v-model="corporate.tin"
                        placeholder="13 หลัก"
                      />
                    </div>

                    <!-- Branch Code -->
                    <div class="w-[120px]">
                      <Label for="branchCode">เลขที่สาขา</Label>
                      <Input
                        id="branchCode"
                        v-model="corporate.branchCode"
                        placeholder="5 หลัก"
                        maxlength="5"
                        inputmode="numeric"
                      />
                    </div>
                  </div>
                  <div class="grid gap-4 grid-cols-2">
                    <div>
                      <Label for="email">อีเมล</Label>
                      <Input
                        id="email"
                        v-model="corporate.email"
                        placeholder="ที่อยู่อีเมล"
                      />
                    </div>
                    <div>
                      <Label for="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        v-model="corporate.phone"
                        placeholder="เบอร์ติดต่อ"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Label class="mb-1 block text-sm font-medium">
                        ที่อยู่ร้านค้า <span class="text-red-500">*</span>
                      </Label>
                      <Textarea
                        v-model="corporate.address"
                        class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="2"
                        placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
                        required
                        maxlength="150"
                      />
                    </div>
                  </div>
                  <!-- ใส่ LocationPicker -->
                  <BaseLocationPicker @location-data="handleSelectLocation" />
                </CardContent>
                <CardFooter class="flex justify-end">
                  <Button @click="submitCustomer('corporate')">บันทึก</Button>
                  <DialogClose as-child>
                    <Button variant="ghost">ปิด</Button>
                  </DialogClose>
                </CardFooter>
              </Card>
            </TabsContent>

            <!-- Personal (บุคคลธรรมดา) -->
            <TabsContent value="person">
              <Card>
                <CardHeader>
                  <CardTitle>บุคคลธรรมดา</CardTitle>
                  <CardDescription>
                    กรอกชื่อผู้ติดต่อและเลขบัตรประชาชน
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div class="grid gap-4 grid-cols-2">
                    <div>
                      <Label for="firstName">ชื่อ</Label>
                      <Input
                        id="firstName"
                        v-model="person.firstName"
                        placeholder="ชื่อจริง"
                      />
                    </div>
                    <div>
                      <Label for="lastName">นามสกุล</Label>
                      <Input
                        id="lastName"
                        v-model="person.lastName"
                        placeholder="นามสกุล"
                      />
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <!-- Tax ID -->
                    <div class="flex-1">
                      <Label for="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                      <Input
                        id="taxId"
                        v-model="person.tin"
                        placeholder="13 หลัก"
                      />
                    </div>
                  </div>
                  <div class="grid gap-4 grid-cols-2">
                    <div>
                      <Label for="email">อีเมล</Label>
                      <Input
                        id="email"
                        v-model="person.email"
                        placeholder="ที่อยู่อีเมล"
                      />
                    </div>
                    <div>
                      <Label for="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        v-model="person.phone"
                        placeholder="เบอร์ติดต่อ"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Label class="mb-1 block text-sm font-medium">
                        ที่อยู่ร้านค้า <span class="text-red-500">*</span>
                      </Label>
                      <Textarea
                        v-model="person.address"
                        class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="2"
                        placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
                        required
                        maxlength="150"
                      />
                    </div>
                  </div>
                  <!-- ใส่ LocationPicker -->
                  <BaseLocationPicker @location-data="handleSelectLocation" />
                </CardContent>
                <CardFooter class="flex justify-end">
                  <Button @click="submitCustomer('person')">บันทึก</Button>
                  <DialogClose as-child>
                    <Button variant="ghost">ปิด</Button>
                  </DialogClose>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
