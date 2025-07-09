<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShopFormStore } from "@/stores/useShopFormStore";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const merchantService = useMerchantService();
const open = ref(false);
const shop = useShopFormStore();
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
// Example: reset store when open dialog
function openDialog() {
  shop.reset();
  open.value = true;
}

async function save() {
  try {
    const payload = buildMerchantPayloadFromStore(shop);
    const { data } = await merchantService.registerMerchant(payload);
    alert("บันทึกข้อมูลเรียบร้อย! " + (data?.message ?? ""));
    open.value = false;
  } catch (e: any) {
    alert(e?.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึก");
  }
}
const { data } = useAuth();
</script>

<template>
  <div class="flex gap-4 flex-col w-full">
    <div>
      {{ data }}
    </div>
    <Button @click="openDialog">ตั้งค่าร้านค้า</Button>
    <Dialog v-model:open="open">
      <DialogContent
        class="max-w-lg w-full max-h-[90dvh] bg-[hsl(var(--card))] overflow-y-auto"
      >
        <div class="flex flex-col">
          <!-- Header -->
          <DialogHeader>
            <DialogTitle>ตั้งค่าร้านค้า</DialogTitle>
            <DialogDescription>
              เลือกประเภทและกรอกข้อมูลให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>

          <!-- Stepper -->
          <div class="flex items-center gap-2 my-3 mx-2">
            <span
              class="flex-1 h-1.5 rounded-full transition-all"
              :class="
                step === 1 ? 'bg-primary' : 'bg-muted-200 dark:bg-muted-700'
              "
            />
            <span
              class="flex-1 h-1.5 rounded-full transition-all"
              :class="
                step === 2 ? 'bg-primary' : 'bg-muted-200 dark:bg-muted-700'
              "
            />
            <span
              class="flex-1 h-1.5 rounded-full transition-all"
              :class="
                step === 3 ? 'bg-primary' : 'bg-muted-200 dark:bg-muted-700'
              "
            />
          </div>

          <!-- Tabs manual -->
          <div class="flex gap-2 mb-4 px-2">
            <Button
              :variant="tab === 'corporate' ? 'default' : 'outline'"
              class="flex-1"
              @click="tab = 'corporate'"
              >นิติบุคคล</Button
            >
            <Button
              :variant="tab === 'person' ? 'default' : 'outline'"
              class="flex-1"
              @click="tab = 'person'"
              >บุคคลธรรมดา</Button
            >
          </div>

          <!-- Step 1: ข้อมูลทั่วไป -->
          <form
            v-if="step === 1"
            @submit.prevent="shop.nextStep()"
            class="space-y-5 px-2"
          >
            <template v-if="tab === 'corporate'">
              <div>
                <Label for="storeName">ชื่อร้านค้า</Label>
                <Input
                  id="storeName"
                  v-model="storeName"
                  required
                  placeholder="ชื่อบริษัท / ร้านค้า"
                  class="w-full"
                />
              </div>
              <div>
                <Label for="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                <Input
                  id="taxId"
                  v-model="taxId"
                  required
                  maxlength="13"
                  placeholder="13 หลัก"
                  class="w-full"
                />
              </div>
              <div>
                <Label for="branchCode">เลขที่สาขา</Label>
                <Input
                  id="branchCode"
                  v-model="branchCode"
                  maxlength="5"
                  inputmode="numeric"
                  placeholder="5 หลัก"
                  class="w-full"
                />
              </div>
            </template>
            <template v-else>
              <div>
                <Label for="contactName">ชื่อผู้ติดต่อ</Label>
                <Input
                  id="contactName"
                  v-model="contactName"
                  required
                  placeholder="ชื่อ-นามสกุล"
                  class="w-full"
                />
              </div>
              <div>
                <Label for="personalId">เลขบัตรประชาชน</Label>
                <Input
                  id="personalId"
                  v-model="personalId"
                  required
                  maxlength="13"
                  placeholder="13 หลัก"
                  class="w-full"
                />
              </div>
            </template>
            <Button type="submit" class="w-full mt-3">ดำเนินการต่อ</Button>
          </form>

          <!-- Step 2: ที่อยู่ -->
          <form
            v-else-if="step === 2"
            @submit.prevent="shop.nextStep()"
            class="space-y-5 px-2"
          >
            <div>
              <Label>ที่อยู่ <span class="text-red-500">*</span></Label>
              <Textarea
                v-model="address"
                required
                class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows="2"
                maxlength="150"
                placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
              />
            </div>
            <!-- Replace with your real component -->
            <div class="my-1"><BaseLocationPicker /></div>
            <div class="flex gap-2 mt-6">
              <Button
                @click.prevent="shop.prevStep()"
                variant="outline"
                class="flex-1"
                >ย้อนกลับ</Button
              >
              <Button type="submit" class="flex-1">ดำเนินการต่อ</Button>
            </div>
          </form>

          <!-- Step 3: Preview/Confirm -->
          <div v-else-if="step === 3" class="space-y-5 px-2">
            <h2 class="text-xl font-semibold text-center mb-2">ยืนยันข้อมูล</h2>
            <template v-if="tab === 'corporate'">
              <div><b>ชื่อร้านค้า:</b> {{ storeName }}</div>
              <div><b>เลขประจำตัวผู้เสียภาษี:</b> {{ taxId }}</div>
              <div><b>เลขที่สาขา:</b> {{ branchCode }}</div>
              <div><b>ที่อยู่:</b> {{ address }}</div>
            </template>
            <template v-else>
              <div><b>ชื่อผู้ติดต่อ:</b> {{ contactName }}</div>
              <div><b>เลขบัตรประชาชน:</b> {{ personalId }}</div>
              <div><b>ที่อยู่:</b> {{ address }}</div>
            </template>
            <div class="flex gap-2 mt-6">
              <Button @click="shop.prevStep()" variant="outline" class="flex-1"
                >ย้อนกลับ</Button
              >
              <Button @click="save" class="flex-1">บันทึก</Button>
            </div>
          </div>

          <DialogFooter class="mt-6">
            <DialogClose as-child>
              <Button variant="ghost">ปิด</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>

    <BaseConnectGmail />
    <!-- <pre>{{ emailHtml }}</pre> -->

    <!-- <SafeHtml
      v-if="emailHtml"
      :html="emailHtml"
      :options="{ allowedTags: false, allowedAttributes: false }"
    /> -->
  </div>
</template>
