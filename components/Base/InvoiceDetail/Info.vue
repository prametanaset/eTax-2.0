<script setup lang="ts">
import { computed } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ✅ ใช้ mock data ภายใน component
const invoice = {
  id: "INV-0001",
  issueDate: "2025-05-01",
  dueDate: "2025-05-15",
  status: "DUE",
  currency: "THB",
  seller: {
    name: "บริษัท A จำกัด",
    address: "123 ถนนสุขุมวิท",
    taxId: "1234567890123",
  },
  buyer: {
    name: "บริษัท B จำกัด",
    address: "456 ถนนเพลินจิต",
    taxId: "9876543210987",
  },
  items: [
    { description: "บริการ A", qty: 1, unitPrice: 1000, vatRate: 7 },
    { description: "บริการ B", qty: 2, unitPrice: 500, vatRate: 7 },
  ],
} as const;

const subTotal = computed(() =>
  invoice.items.reduce((t, i) => t + i.qty * i.unitPrice, 0)
);
const vatTotal = computed(() =>
  invoice.items.reduce((t, i) => t + i.qty * i.unitPrice * (i.vatRate / 100), 0)
);
const grandTotal = computed(() => subTotal.value + vatTotal.value);

function handlePrint() {
  window.print();
}

function handleDownload() {
  // ใส่ logic สำหรับสร้าง PDF ได้ภายหลัง
}


</script>

<template>
  <Card
    class="w-full max-w-4xl bg-background mx-auto border-none print:shadow-none print:max-w-full print:p-2"
  >
    <CardHeader class="pb-4 border-b pt-0">
      <div class="flex justify-between items-start">
        <div>
          <CardTitle class="text-2xl font-bold mb-1">
            ใบแจ้งหนี้ #{{ invoice.id }}
          </CardTitle>
          <p class="text-sm text-muted-foreground">
            วันที่ออก: {{ invoice.issueDate }} · กำหนดชำระ: {{ invoice.dueDate }}
          </p>
        </div>
        <Badge
          :variant="invoice.status === 'PAID'
              ? 'success'
              : invoice.status === 'OVERDUE'
              ? 'destructive'
              : 'secondary'"
          class="h-fit"
        >
          {{
            invoice.status === 'PAID'
              ? 'ชำระแล้ว'
              : invoice.status === 'OVERDUE'
              ? 'เลยกำหนด'
              : 'ยังไม่ชำระ'
          }}
        </Badge>
      </div>
    </CardHeader>

    <CardContent class="grid sm:grid-cols-2 gap-6 text-sm py-6">
      <div>
        <h4 class="font-semibold text-base mb-2">ที่อยู่ลูกค้า</h4>
        <p><span class="font-medium">ชื่อ:</span> โจเซฟ วิลเลียม</p>
        <p><span class="font-medium">ที่อยู่:</span> 4898 ถนนโจแอนน์</p>
        <p><span class="font-medium">เมือง:</span> บอสตัน</p>
        <p><span class="font-medium">ประเทศ:</span> สหรัฐอเมริกา</p>
        <p><span class="font-medium">รัฐ:</span> แมสซาชูเซตส์</p>
        <p><span class="font-medium">รหัสไปรษณีย์:</span> 02110</p>
        <p><span class="font-medium">เบอร์โทร:</span> +1 (070) 123-4567</p>
      </div>
      <div>
        <h4 class="font-semibold text-base mb-2">ผู้ขาย</h4>
        <p><span class="font-medium">ชื่อ:</span> {{ invoice.seller.name }}</p>
        <p><span class="font-medium">ที่อยู่:</span> {{ invoice.seller.address }}</p>
        <p><span class="font-medium">เลขประจำตัวผู้เสียภาษี:</span> {{ invoice.seller.taxId }}</p>
      </div>
    </CardContent>

    <CardContent class="mt-4">
      <h4 class="font-semibold text-base mb-3">รายละเอียดสินค้า</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[5%]">#</TableHead>
            <TableHead>รายการ</TableHead>
            <TableHead class="text-right">จำนวน</TableHead>
            <TableHead class="text-right">ราคาต่อหน่วย ({{ invoice.currency }})</TableHead>
            <TableHead class="text-right">ภาษี (%)</TableHead>
            <TableHead class="text-right">รวม ({{ invoice.currency }})</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(item, index) in invoice.items" :key="index">
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ item.description }}</TableCell>
            <TableCell class="text-right">{{ item.qty }}</TableCell>
            <TableCell class="text-right">{{ item.unitPrice.toLocaleString() }}</TableCell>
            <TableCell class="text-right">{{ item.vatRate }}</TableCell>
            <TableCell class="text-right">
              {{
                (item.qty * item.unitPrice * (1 + item.vatRate / 100)).toLocaleString()
              }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div class="mt-6 flex justify-end">
        <div class="w-full sm:w-1/2 space-y-2 text-sm border-t pt-4">
          <div class="flex justify-between">
            <span class="text-muted-foreground">ยอดรวมก่อนภาษี</span>
            <span>{{ subTotal.toLocaleString() }} {{ invoice.currency }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">ภาษีมูลค่าเพิ่ม</span>
            <span>{{ vatTotal.toLocaleString() }} {{ invoice.currency }}</span>
          </div>
          <div class="flex justify-between font-semibold text-base">
            <span>ยอดรวมทั้งสิ้น</span>
            <span>{{ grandTotal.toLocaleString() }} {{ invoice.currency }}</span>
          </div>
        </div>
      </div>
    </CardContent>

    <!-- <CardFooter class="flex justify-end gap-2 print:hidden">
      <Button variant="outline" @click="handlePrint">พิมพ์</Button>
      <Button @click="handleDownload">ดาวน์โหลด PDF</Button>
    </CardFooter> -->
  </Card>
</template>
