<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-9">
      <Card class="w-full">
        <CardHeader>
          <Card class="p-4 relative overflow-hidden border-primary-500">
            <div class="relative z-999 grid sm:grid-cols-2 gap-8">
              <div class="flex gap-2 items-start">
                <Avatar>
                  <AvatarImage
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfFMnAPTdXxxWJ33Y4J-lmax6Ey6xGv82CQ&s"
                    alt="@unovue"
                  />
                </Avatar>
                <div>
                  <CardTitle>{{ storeApi.storeName }}</CardTitle>
                  <CardDescription class="text-muted-500">{{
                    storeApi.address
                  }}</CardDescription>
                </div>
              </div>
              <div class="grid gap-2">
                <div
                  class="flex flex-col justify-between items-center sm:text-end"
                >
                  <p class="w-full text-success-500 text-sm">
                    หมายเลขใบกำกับภาษี
                  </p>
                  <CardTitle class="w-full mt-1">{{
                    storeApi.invNo
                  }}</CardTitle>
                </div>
                <div
                  class="flex flex-col justify-between items-center sm:text-end"
                >
                  <p class="w-full text-success-500 text-sm">วันที่</p>
                  <p class="w-full">{{ formatThaiDate(new Date()) }}</p>
                </div>
              </div>
            </div></Card
          >
        </CardHeader>
        <CardContent>
          <div class="grid gap-y-6 sm:flex-row border-b pb-4">
            <div class="grid w-full gap-y-2">
              <CardTitle class="text-success-500">ผู้รับ</CardTitle>
              <div class="flex flex-col sm:grid gap-y-2">
                <div class="sm:w-[50%]">
                  <BaseSelectCustomer></BaseSelectCustomer>
                </div>
                <div>
                  <CardDescription>
                    <div class="grid sm:grid-cols-2 gap-4">
                      <!-- customer info -->
                      <div class="sm:flex mt-2">
                        <p class="text-muted-400">
                          เลขประจำตัวผู้เสียภาษี :&nbsp;
                        </p>
                        <p class="font-bold">1234567890123</p>
                      </div>
                      <!-- END customer info -->
                      <!-- section address -->
                      <div class="sm:text-end">
                        <div
                          class="flex items-center sm:justify-end hover:underline cursor-pointer"
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger as-child>
                                <p class="text-muted-400">ที่อยู่</p>
                                <span>
                                  <Pencil class="w-3 ml-1 text-muted-400"
                                /></span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>แก้ไขที่อยู่</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div>
                          979 ถ. พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน
                          กรุงเทพมหานคร 10330
                        </div>
                      </div>
                      <!-- END section address -->
                    </div>
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
          <div class="grid gap-4 mt-8 overflow-hidden">
            <p class="text-lg">รายการสินค้า</p>
            <!-- product table form -->
            <Table class="min-w-[800px] overflow-x-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>ลำดับ</TableHead>
                  <TableHead class="w-[200px]"> สินค้า </TableHead>
                  <TableHead>จำนวน/หน่วย</TableHead>
                  <TableHead>ราคาหน่วย</TableHead>
                  <TableHead>ส่วนลด</TableHead>
                  <TableHead>VAT</TableHead>
                  <TableHead class="text-right min-w-[100px]">
                    จำนวนเงิน
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(item, index) in invoice.invItem" :key="index">
                  <TableCell>{{ index + 1 }}</TableCell>
                  <TableCell>
                    <Input v-model="item.itemName" />
                  </TableCell>
                  <TableCell>
                    <Input
                      v-model="item.qty"
                      type="number"
                      @input="item.qty = Math.max(0, item.qty)"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      v-model="item.price"
                      type="number"
                      @input="item.price = Math.max(0, item.price)"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      v-model="item.discount"
                      type="number"
                      @input="item.discount = Math.max(0, item.discount)"
                    />
                  </TableCell>
                  <TableCell>
                    <Select v-model="item.includeVat">
                      <SelectTrigger>
                        <SelectValue v-model="item.includeVat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ยกเว้นภาษี">
                            ยกเว้นภาษี
                          </SelectItem>
                          <SelectItem value="รวมภาษีมูลค่าเพิ่มแล้ว">
                            รวมภาษีมูลค่าเพิ่มแล้ว
                          </SelectItem>
                          <SelectItem value="ยังไม่รวมภาษีมูลค่าเพิ่ม">
                            ยังไม่รวมภาษีมูลค่าเพิ่ม
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell class="text-right min-w-[100px]">
                    {{ currencyFormat(item.totalPrice) }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div class="">
              <Button @click="addItem">
                <Plus />
                เพิ่มสินค้า
              </Button>
            </div>
          </div>
          <div class="grid sm:grid-cols-2 mt-8 pt-8 border-t">
            <div class="sm:col-end-3 mb-8">
              <div class="grid">
                <div class="">
                  <Label>ส่วนลด</Label>
                  <Input
                    type="number"
                    placeholder="ส่วนลด"
                    v-model="invoice.invDiscount"
                  />
                </div>
              </div>
              <div class="flex flex-col justify-end mt-8">
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ยอดเงินรวม</p>
                  <p>{{ currencyFormat(totalAmount) }}</p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ส่วนลด</p>
                  <p>{{ currencyFormat(totalDiscount) }}</p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ยอดเงินก่อนภาษี</p>
                  <p>{{ currencyFormat(subtotal) }}</p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ภาษีมูลค่าเพิ่ม</p>
                  <p>{{ currencyFormat(totalVat) }}</p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-muted-400">ยอดสุทธิ</p>
                  <p>{{ currencyFormat(grandTotal) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full">
            <Label for="email">หมายเหตุ</Label>
            <Textarea />
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <Card class="w-full">
        <div class="grid sm:grid-cols-2 gap-4 p-4">
          <Button><Eye />ตัวอย่าง</Button>
          <Button><Save />สร้าง</Button>
          <Button class="col-span-2"><Send />สร้าง และ ส่ง</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Eye, Send, Save, ChevronDown } from "lucide-vue-next";
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

definePageMeta({
  title: "สร้างใบกำกับภาษี",
});

const storeApi = reactive({
  storeName: "MIXUE",
  address:
    "ศูนย์อาหารและบริการที่ 1 (คอมเพล็กซ์) มหาวิทยาลัยขอนแก่น ในเมือง อำเภอเมืองขอนแก่น ขอนแก่น 40002",
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
      }
      return sum + item.totalPrice; // ราคาสินค้าที่ยังไม่รวม VAT
    }, 0) - totalDiscount.value // หักส่วนลดของบิลก่อนคำนวณ VAT
);

// ✅ คำนวณภาษีมูลค่าเพิ่ม (VAT) จากยอดที่หักส่วนลดแล้ว
const totalVat = computed(() => subtotal.value * 0.07);

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
</script>

<style></style>
