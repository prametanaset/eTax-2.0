<template>
  <Tabs
    v-model="activeTab"
    default-value="corporate"
    class="w-[400px] rounded-lg"
  >
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
        <CardHeader class="px-0">
          <CardTitle>ตั้งค่าร้านค้านิติบุคคล</CardTitle>
        </CardHeader>
        <CardContent class="space-y-5 px-0">
          <!-- ชื่อร้านค้า -->
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

          <!-- เลขผู้เสียภาษี + สาขา -->
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="space-y-1 w-full sm:w-2/3">
              <Label for="taxId">เลขประจำตัวผู้เสียภาษี</Label>
              <Input
                id="taxId"
                v-model="taxId"
                required
                maxlength="13"
                placeholder="13 หลัก"
                pattern="[0-9]*"
                @input="(e: Event) => taxId = (e.target as HTMLInputElement).value.replace(/\D/g, '')"
                class="w-full bg-[hsl(var(--card))]"
              />
            </div>
            <div class="space-y-1 w-full sm:w-1/3">
              <Label for="branchCode">เลขที่สาขา</Label>
              <Input
                id="branchCode"
                v-model="branchCode"
                maxlength="5"
                inputmode="numeric"
                placeholder="5 หลัก"
                pattern="[0-9]*"
                @input="(e: Event) => branchCode = (e.target as HTMLInputElement).value.replace(/\D/g, '')"
                class="w-full bg-[hsl(var(--card))]"
              />
            </div>
          </div>

          <!-- ที่อยู่ -->
          <div class="space-y-1">
            <Label>ที่อยู่ <span class="text-red-500">*</span></Label>
            <Textarea
              v-model="address"
              required
              rows="2"
              maxlength="150"
              placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
              class="w-full border rounded-lg px-3 py-2 text-sm bg-[hsl(var(--card))] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- ตัวเลือกจังหวัด/อำเภอ/ตำบล -->
          <div class="space-y-1">
            <BaseLocationPicker @location-data="handleSelectLocation" />
          </div>
        </CardContent>

        <CardFooter class="px-0">
          <Button
            class="w-full rounded-full hover:bg-primary/90 transition"
            :disabled="isButtonDisabled"
            @click="save"
          >
            <template v-if="isSubmitting">กำลังบันทึก...</template>
            <template v-else>ดำเนินการต่อ</template>
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="person">
      <Card class="border-none">
        <!-- Header -->
        <CardHeader class="px-0">
          <CardTitle>ตั้งค่าร้านทั่วไป</CardTitle>
        </CardHeader>

        <!-- Content -->
        <CardContent class="space-y-5 px-0">
          <!-- ชื่อผู้ติดต่อ -->
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

          <!-- เลขบัตรประชาชน -->
          <div class="space-y-1">
            <Label for="personalId">เลขบัตรประชาชน</Label>
            <Input
              id="personalId"
              v-model="personalId"
              required
              maxlength="13"
              pattern="[0-9]*"
              @input="(e: Event) => personalId = (e.target as HTMLInputElement).value.replace(/\D/g, '')"
              placeholder="13 หลัก"
              class="w-full bg-[hsl(var(--card))]"
            />
          </div>

          <!-- ที่อยู่ -->
          <div class="space-y-1">
            <Label>ที่อยู่ <span class="text-red-500">*</span></Label>
            <Textarea
              v-model="address"
              required
              rows="2"
              maxlength="150"
              placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
              class="w-full border rounded-lg px-3 py-2 text-sm bg-[hsl(var(--card))] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- ตัวเลือกจังหวัด/อำเภอ/ตำบล -->
          <div class="space-y-1">
            <BaseLocationPicker />
          </div>
        </CardContent>

        <!-- Footer -->
        <CardFooter class="px-0">
          <Button
            class="w-full rounded-full hover:bg-primary/90 transition"
            :disabled="isButtonDisabled"
            @click="save"
          >
            <template v-if="isSubmitting">กำลังบันทึก...</template>
            <template v-else>ดำเนินการต่อ</template>
          </Button>
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
const isSubmitting = ref(false);

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
  shop.province.code = data.provinceId;
  shop.province.label = data.provinces;
  shop.district.code = data.districtId;
  shop.district.label = data.districts;
  shop.subdistrict.code = data.subdistrictId;
  shop.subdistrict.label = data.subdistricts;
  shop.zipcode = data.zipCode;
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
  };
}

// ✅ เงื่อนไขตรวจว่าปุ่มควร disable ไหม
const isButtonDisabled = computed(() => {
  if (isSubmitting.value) return true;

  const addressOk = address.value?.length > 0;
  const locationOk =
    shop.province.code && shop.district.code && shop.subdistrict.code;

  if (activeTab.value === "corporate") {
    return (
      !storeName.value ||
      !taxId.value ||
      taxId.value.length < 13 ||
      !addressOk ||
      !locationOk
    );
  } else {
    return (
      !contactName.value ||
      !personalId.value ||
      personalId.value.length < 13 ||
      !addressOk ||
      !locationOk
    );
  }
});

async function save() {
  isSubmitting.value = true;
  try {
    const payload = buildMerchantPayloadFromStore(shop);
    const { data } = await merchantService.registerMerchant(payload);
    alert("บันทึกข้อมูลเรียบร้อย! " + (data?.message ?? ""));
    navigateTo("/dashboard");
  } catch (e: any) {
    alert(e?.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึก");
  } finally {
    isSubmitting.value = false;
  }
}

watch(activeTab, (newTab, oldTab) => {
  shop.reset?.();
});
</script>

<style></style>
