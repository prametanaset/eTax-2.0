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

interface Dropdown {
  dvalue: number;
  dlabel: string;
}

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
      name: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      zipCode: number;
      vatNo?: string | null;
      address: string;
      provinceId: number;
      districtsId: number;
      subdistrictsId: number;
    }
  ): void;
}>();

const selectedProvince = ref<Dropdown | null>(null);
const selectedDistrict = ref<Dropdown | null>(null);
const selectedSubDistrict = ref<Dropdown | null>(null);
const zipCode = ref<number | null>(null);
const activeTab = ref<"individual" | "corporate">("individual");

const individual = ref({
  firstName: "",
  lastName: "",
  phone: "",
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
  address: "",
  email: "",
  phone: "",
  zipCode: 0,
  provinceId: 0,
  districtsId: 0,
  subdistrictsId: 0,
});

watch(
  () => props.modelValue,
  (open) => {
    if (open && props.mode === "edit") {
      const c = props.customer;
      zipCode.value = c.zipCode;
      selectedProvince.value = { dvalue: c.provinceId, dlabel: "" };
      selectedDistrict.value = { dvalue: c.districtsId, dlabel: "" };
      selectedSubDistrict.value = { dvalue: c.subdistrictsId, dlabel: "" };

      if (c.vatNo) {
        activeTab.value = "corporate";
        corporate.value = {
          companyName: c.firstName,
          tin: c.vatNo,
          address: c.address,
          email: c.email,
          phone: c.phone,
          zipCode: c.zipCode,
          provinceId: c.provinceId,
          districtsId: c.districtsId,
          subdistrictsId: c.subdistrictsId,
        };
      } else {
        activeTab.value = "individual";
        individual.value = {
          firstName: c.firstName,
          lastName: c.lastName,
          phone: c.phone,
          email: c.email,
          zipCode: c.zipCode,
          address: c.address,
          provinceId: c.provinceId,
          districtsId: c.districtsId,
          subdistrictsId: c.subdistrictsId,
        };
      }
    }
  },
  { immediate: true }
);

function submitCustomer(type: "individual" | "corporate") {
  if (
    !selectedProvince.value ||
    !selectedDistrict.value ||
    !selectedSubDistrict.value ||
    zipCode.value === null
  )
    return;

  const data =
    type === "individual"
      ? {
          name: `${individual.value.firstName} ${individual.value.lastName}`.trim(),
          firstName: individual.value.firstName,
          lastName: individual.value.lastName,
          email: individual.value.email,
          phone: individual.value.phone,
          zipCode: zipCode.value,
          address: individual.value.address,
          provinceId: selectedProvince.value.dvalue,
          districtsId: selectedDistrict.value.dvalue,
          subdistrictsId: selectedSubDistrict.value.dvalue,
        }
      : {
          name: corporate.value.companyName,
          firstName: corporate.value.companyName,
          lastName: corporate.value.companyName,
          email: corporate.value.email,
          phone: corporate.value.phone,
          zipCode: zipCode.value,
          vatNo: corporate.value.tin,
          address: corporate.value.address,
          provinceId: selectedProvince.value.dvalue,
          districtsId: selectedDistrict.value.dvalue,
          subdistrictsId: selectedSubDistrict.value.dvalue,
        };

  emit(props.mode === "edit" ? "customer-updated" : "customer-added", data);
  emit("update:modelValue", false);
}

const locationService = useLocationService();

const onProvinceSelected = (province: Dropdown) => {
  selectedProvince.value = province;
  selectedDistrict.value = null;
  selectedSubDistrict.value = null;
  zipCode.value = null;
};

const onDistrictSelected = (district: Dropdown) => {
  selectedDistrict.value = district;
  selectedSubDistrict.value = null;
  zipCode.value = null;
};

const onSubDistrictSelected = async (subdistrict: Dropdown) => {
  selectedSubDistrict.value = subdistrict;
  zipCode.value = await locationService.getZipCode(subdistrict.dvalue);
};
</script>

<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <!-- เปลี่ยนสี ความทึบ และเบลอของฉากหลังตรงนี้ -->

    <DialogContent class="max-w-2xl overflow-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{{
          props.mode === "edit" ? "แก้ไขข้อมูลลูกค้า" : "เพิ่มลูกค้าใหม่"
        }}</DialogTitle>
        <DialogDescription>กรอกข้อมูลลูกค้า</DialogDescription>
      </DialogHeader>

      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="individual">บุคคลธรรมดา</TabsTrigger>
          <TabsTrigger value="corporate">นิติบุคคล</TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลบุคคลธรรมดา</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label>ชื่อ</Label>
                  <Input
                    v-model="individual.firstName"
                    placeholder="ชื่อจริง"
                  />
                </div>
                <div>
                  <Label>นามสกุล</Label>
                  <Input v-model="individual.lastName" placeholder="นามสกุล" />
                </div>
              </div>
              <div>
                <Label>เบอร์โทร</Label>
                <Input v-model="individual.phone" placeholder="0812345678" />
              </div>
              <div>
                <Label>อีเมล</Label>
                <Input
                  v-model="individual.email"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>ที่อยู่</Label>
                <Input
                  v-model="individual.address"
                  placeholder="ที่อยู่ตามทะเบียน"
                />
              </div>
              <div>
                <Label>จังหวัด</Label>
                <BaseDropdown
                  v-model="selectedProvince"
                  type="province"
                  @selected-data="onProvinceSelected"
                />
              </div>
              <div>
                <Label>อำเภอ/เขต</Label>
                <BaseDropdown
                  v-model="selectedDistrict"
                  type="district"
                  :id="selectedProvince?.dvalue"
                  @selected-data="onDistrictSelected"
                />
              </div>
              <div>
                <Label>ตำบล</Label>
                <BaseDropdown
                  v-model="selectedSubDistrict"
                  type="subdistrict"
                  :id="selectedDistrict?.dvalue"
                  @selected-data="onSubDistrictSelected"
                />
              </div>
              <div>
                <Label>รหัสไปรษณีย์</Label>
                <Input v-model="zipCode" readonly />
              </div>
            </CardContent>
            <CardFooter class="flex gap-3 justify-end">
              <DialogClose as-child>
                <Button type="button" variant="outline">ยกเลิก</Button>
              </DialogClose>
              <Button @click="addIndividual">บันทึก</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="corporate">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลนิติบุคคล</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div>
                <Label>ชื่อบริษัท</Label>
                <Input
                  v-model="corporate.companyName"
                  placeholder="ชื่อบริษัท"
                />
              </div>
              <div>
                <Label>เลขประจำตัวผู้เสียภาษี</Label>
                <Input v-model="corporate.tin" placeholder="010xxxxxxxxxxx" />
              </div>
              <div>
                <Label>ที่อยู่</Label>
                <Input
                  v-model="corporate.address"
                  placeholder="ที่อยู่ตามทะเบียน"
                />
              </div>
              <div>
                <Label>อีเมล</Label>
                <Input
                  v-model="corporate.email"
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <Label>จังหวัด</Label>
                <BaseDropdown
                  v-model="selectedProvince"
                  type="province"
                  @selected-data="onProvinceSelected"
                />
              </div>
              <div>
                <Label>อำเภอ/เขต</Label>
                <BaseDropdown
                  v-model="selectedDistrict"
                  type="district"
                  :id="selectedProvince?.dvalue"
                  @selected-data="onDistrictSelected"
                />
              </div>
              <div>
                <Label>ตำบล</Label>
                <BaseDropdown
                  v-model="selectedSubDistrict"
                  type="subdistrict"
                  :id="selectedDistrict?.dvalue"
                  @selected-data="onSubDistrictSelected"
                />
              </div>
              <div>
                <Label>รหัสไปรษณีย์</Label>
                <Input v-model="zipCode" readonly />
              </div>
            </CardContent>
            <CardFooter class="flex gap-3 justify-end">
              <DialogClose as-child>
                <Button type="button" variant="outline">ยกเลิก</Button>
              </DialogClose>
              <Button @click="addCorporate">บันทึก</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
