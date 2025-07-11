<template>
  <Tabs default-value="corporate" class="w-[400px] rounded-lg">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="corporate">
        <div class="flex gap-2">
          <Landmark class="h-4 w-4" />
          นิติบุคคล
        </div>
      </TabsTrigger>
      <TabsTrigger value="person">
        <div class="flex gap-2">
          <Store class="h-4 w-4" />
          บุคคลธรรมดา
        </div>
      </TabsTrigger>
    </TabsList>
    <TabsContent value="corporate">
      <Card class="border-none">
        <CardHeader>
          <CardTitle>ร้านค้านิติบุคคล</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="storeName">ชื่อร้านค้า</Label>
                <Input
                  id="storeName"
                  v-model="storeName"
                  required
                  placeholder="ชื่อบริษัท / ร้านค้า"
                  class="w-full bg-[hsl(var(--card))]"
                />
          </div>
         <div class="flex gap-4">
            <div class="space-y-1 w-2/3">
              <Label for="taxId">เลขประจำตัวผู้เสียภาษี</Label>
              <Input
                id="taxId"
                v-model="taxId"
                required
                maxlength="13"
                placeholder="13 หลัก"
                class="w-full bg-[hsl(var(--card))]"
              />
            </div>
            <div class="space-y-1 w-1/3">
              <Label for="branchCode">เลขที่สาขา</Label>
              <Input
                id="branchCode"
                v-model="branchCode"
                maxlength="5"
                inputmode="numeric"
                placeholder="5 หลัก"
                class="w-full bg-[hsl(var(--card))]"
              />
            </div>
          </div>
          <div class="space-y-1">
            <Label>ที่อยู่ <span class="text-red-500">*</span></Label>
            <Textarea
              v-model="address"
              required
              class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none  bg-[hsl(var(--card))]"
              rows="2"
              maxlength="150"
              placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
            />
          </div>
          <div class="space-y-1"><BaseLocationPicker @location-data="handleSelectLocation" /></div>
        </CardContent>
        <CardFooter>
          <Button class="w-full rounded-full" @click="save" >ดำเนินการต่อ</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="person">
      <Card class="border-none">
        <CardHeader>
          <CardTitle>ร้านทั่วไป</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
             <Label for="contactName">ชื่อผู้ติดต่อ</Label>
                <Input
                  id="contactName"
                  v-model="contactName"
                  required
                  placeholder="ชื่อ-นามสกุล"
                  class="w-full bg-[hsl(var(--card))]"
                />
          </div>
          <div class="space-y-1">
            <Label for="personalId">เลขบัตรประชาชน</Label>
                <Input
                  id="personalId"
                  v-model="personalId"
                  required
                  maxlength="13"
                  placeholder="13 หลัก"
                  class="w-full bg-[hsl(var(--card))]"
                />
          </div>
          <div class="space-y-1">
            <Label>ที่อยู่ <span class="text-red-500">*</span></Label>
              <Textarea
                v-model="address"
                required
                class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-[hsl(var(--card))]"
                rows="2"
                maxlength="150"
                placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
              />
          </div>
          <div class="space-y-1"> 
            <BaseLocationPicker />
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full rounded-full">ดำเนินการต่อ</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { Store, Landmark } from "lucide-vue-next";
const shop = useShopFormStore();
const merchantService = useMerchantService();

const activeTab = ref<"corporate" | "person">("corporate");

const {
  step,
  tab,
  storeName,
  taxId,
  branchCode,
  contactName,
  personalId,
  address,
} = storeToRefs(shop);

const handleSelectLocation = (data: any) => {
  if (activeTab.value === "person") {
    shop.province.code = data.provinceId;
    shop.province.label = data.provinces;
    shop.district.code = data.districtId;
    shop.district.label = data.districts;
    shop.subdistrict.code = data.subdistrictId;
    shop.subdistrict.label = data.subdistricts;
    shop.zipcode = data.zipCode;
  } else {
    shop.province.code = data.provinceId;
    shop.province.label = data.provinces;
    shop.district.code = data.districtId;
    shop.district.label = data.districts;
    shop.subdistrict.code = data.subdistrictId;
    shop.subdistrict.label = data.subdistricts;
    shop.zipcode = data.zipCode;
  }
};

function buildMerchantPayloadFromStore(
  shop: ReturnType<typeof useShopFormStore>
) {
  const isCorporate = shop.tab === "corporate";
  return {
    merchant_type: isCorporate ? "company" : "person",
    ...(isCorporate
      ? {
          company: {
            company_name: shop.storeName,
            vat_no: shop.taxId,
          },
        }
      : {
          person: {
            first_name: shop.contactName.split(" ")[0] ?? "",
            last_name: shop.contactName.split(" ")[1] ?? "",
            vat_no: shop.personalId,
          },
        }),
    store: {
      store_name: isCorporate ? shop.storeName : shop.contactName,
      branch_no: shop.branchCode || "00000",
      address_line1: shop.address,
      province_id: Number(shop.province.code) || 0,
      district_id: Number(shop.district.code) || 0,
      subdistrict_id: Number(shop.subdistrict.code) || 0,
      postal_code: shop.zipcode,
    },
    // Optional: เพิ่ม contacts ถ้ามี logic ของคุณเอง
    // contacts: [...]
  };
}

async function save() {
  try {
    const payload = buildMerchantPayloadFromStore(shop);
    const { data } = await merchantService.registerMerchant(payload);
    alert("บันทึกข้อมูลเรียบร้อย! " + (data?.message ?? ""));
    navigateTo('/dashboard')
  } catch (e: any) {
    alert(e?.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึก");
  }
}
</script>

<style></style>
