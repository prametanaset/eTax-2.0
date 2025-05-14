<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-9 relative">
      <div
        class="absolute top-[5%] right-0 w-[95%] lg:h-[95%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
      ></div>
      <Card class="w-full rounded-xl pb-6 z-10 relative">
        <CardHeader class="px-0 py-4">
          <CardTitle class="px-6">
            <div class="mb-2">
              <h1 class="text-2xl font-bold text-purple-700 dark:text-white">
                ใบกำกับภาษี
              </h1>
              <div class="flex items-center gap-3 text-base mt-2">
                <!-- Tax Invoice Number -->
                <div class="flex flex-col w-[24%]">
                  <span class="font-semibold dark:text-white">เลขที่</span>
                  <Input
                    type="text"
                    placeholder="กรอกเลขที่ใบกำกับภาษี"
                    class="h-10 font-normal"
                  />
                </div>

                <!-- Issue Date -->
                <div class="flex flex-col w-[24%]">
                  <span class="font-semibold dark:text-white">วันที่ออก</span>
                  <!-- <Popover>
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        :class="
                          cn(
                            'justify-start text-left font-normal',
                            !value && 'text-muted-400'
                          )
                        "
                        class="w-full bg-[hsl(var(--card))] h-10 shadow-none"
                      >
                        <CalendarIcon
                          class="mr-2 h-4 w-4 text-base font-normal"
                        />
                        {{
                          value
                            ? df.format(value.toDate(getLocalTimeZone()))
                            : "เลือกวันที่สร้าง"
                        }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                      <Calendar v-model="value" locale="th-TH" initial-focus />
                    </PopoverContent>
                  </Popover> -->
                  <BaseDateTimePicker></BaseDateTimePicker>
                </div>

              </div>
            </div>
          </CardTitle>
          <div class="z-999 grid sm:grid-cols-1 gap-2 px-4">
            <div v-if="false" class="mr-1 px-2">
              <p class="mb-1 text-md font-medium">From</p>
              <BaseCustomer v-model="customer"></BaseCustomer>
            </div>
            <div class="px-2">
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseSellerAddress></BaseSellerAddress>
                <BaseCustomerAddress></BaseCustomerAddress>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div class="grid gap-4 overflow-hidden my-4 mt-7 mb-0">
            <p class="text-xl font-semibold">รายการสินค้า</p>
            <!-- product table form -->
            <BaseProductList></BaseProductList>
          </div>
        </CardContent>
        <div class="px-6 mt-2">
          <!-- <BaseCustomerAddress></BaseCustomerAddress> -->
          <h3
            class="text-sm font-semibold text-purple-700 flex items-center gap-1"
          >
            <Notebook class="w-4 h-4" /> หมายเหตุ
          </h3>
          <Textarea class="mt-1" />
        </div>
      </Card>
    </div>
    <div class="col-span-12 lg:col-span-3 sticky top-[4.5rem] self-start">
      <BaseNotificationCard class="w-full mb-3" />
      <Card class="w-full">
        <div class="grid sm:grid-cols-2 gap-4 p-4">
          <!-- <Button variant="outline" class="bg-[hsl(var(--card))]">
            <Eye />ตัวอย่าง
          </Button> -->
          <BasePreviewInvoice></BasePreviewInvoice>
          <Button variant="outline" class="bg-[hsl(var(--card))]">
            <Save />สร้าง
          </Button>
          <Button class="col-span-2"> <Send />สร้าง และ ส่ง </Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Pencil,
  Eye,
  Send,
  Save,
  ChevronDown,
  MapPinned,
  UserRound,
  Edit,
  MapPin,
  Mail,
  Phone,
  Notebook,
} from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

definePageMeta({
  title: "สร้างใบกำกับภาษี",
});

import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref } from "vue";

const df = new DateFormatter("th-TH", {
  dateStyle: "long",
});

const value = ref<DateValue>();

const customer = ref(null);
const customerAddress = ref("");

const storeApi = reactive({
  storeName: "บริษัท ซันสเกลอัพ จำกัด",
  address: {
    building: "ศูนย์อาหารและบริการที่ 1 (คอมเพล็กซ์) มหาวิทยาลัยขอนแก่น",
    subDistrict: "ในเมือง",
    district: "เมืองขอนแก่น",
    province: "ขอนแก่น",
    postalCode: "40002",
  },
  invNo: "INV0000000000000",
});

const invoice = reactive({
  invId: 0,
  invNo: "",
  invDiscount: 0,
  invVat: 0,
  invTotalAmount: 0,
  invTotalDiscount: 0,
  invSubtotal: 0,
  invTotalVat: 0,
  invGrandTotal: 0,
  invItem: [
    {
      itemName: "",
      qty: 0,
      price: 0,
      discount: 0,
      vat: 0,
      totalPrice: 0,
      includeVat: "รวมภาษีมูลค่าเพิ่มแล้ว",
    },
  ],
});

const addItem = () => {
  invoice.invItem.push({
    itemName: "",
    qty: 0,
    price: 0,
    discount: 0,
    vat: 0,
    totalPrice: 0,
    includeVat: "รวมภาษีมูลค่าเพิ่มแล้ว",
  });
};

// ✅ คำนวณยอดรวมทั้งหมด (ก่อนหักส่วนลดและ VAT)
const totalAmount = computed(() =>
  invoice.invItem.reduce((sum, item) => sum + item.totalPrice, 0)
);

// ✅ คำนวณส่วนลดทั้งหมด (เฉพาะส่วนลดของบิล ไม่รวมส่วนลดของสินค้าแต่ละรายการ)
const totalDiscount = computed(() => invoice.invDiscount);

// ✅ คำนวณยอดรวมก่อนภาษี (Net Amount) โดยหักส่วนลดก่อน
const subtotal = computed(
  () =>
    invoice.invItem.reduce((sum, item) => {
      if (item.includeVat === "รวมภาษีมูลค่าเพิ่มแล้ว") {
        return sum + item.totalPrice / 1.07; // แยก VAT ออกจากราคาที่รวม VAT แล้ว
      } else {
        return sum + item.totalPrice; // ราคาสินค้าที่ยังไม่รวม VAT หรือยกเว้นภาษี
      }
    }, 0) - totalDiscount.value // หักส่วนลดของบิล
);

// ✅ คำนวณภาษีมูลค่าเพิ่ม (VAT) เฉพาะสินค้าที่ต้องเสียภาษี
const totalVat = computed(() =>
  invoice.invItem
    .filter((item) => item.includeVat !== "ยกเว้นภาษี") // คำนวณเฉพาะสินค้าที่ต้องเสียภาษี
    .reduce((sum, item) => {
      if (item.includeVat === "รวมภาษีมูลค่าเพิ่มแล้ว") {
        return sum + (item.totalPrice / 1.07) * 0.07; // แยก VAT ออกจากราคาที่รวม VAT แล้ว
      } else {
        return sum + item.totalPrice * 0.07; // คำนวณ VAT จากราคาที่ยังไม่รวมภาษี
      }
    }, 0)
);

// ✅ คำนวณยอดสุทธิ (Grand Total)
const grandTotal = computed(() => subtotal.value + totalVat.value);

// ✅ Watch คำนวณ totalPrice ใหม่ทุกครั้งที่ qty หรือ price เปลี่ยน
watch(
  invoice.invItem,
  (newVal) => {
    newVal.forEach((item, index) => {
      invoice.invItem[index].totalPrice = item.qty * item.price - item.discount;
    });
  },
  { deep: true }
);

watch(customer, (newAddress) => {
  if (customer.value) {
    customerAddress.value = newAddress.Address;
  }
});
</script>

<style></style>
