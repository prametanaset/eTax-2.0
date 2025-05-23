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
    class="w-full bg-background mx-auto border-none print:shadow-none print:max-w-full"
  >
    <CardHeader class="gap-6">
      <div class="flex justify-between">
        <div>
          <CardTitle class="text-xl font-semibold">
            ใบแจ้งหนี้ #{{ invoice.id }}
          </CardTitle>
          <p class="text-sm text-muted-foreground">
            ออก {{ invoice.issueDate }} · กำหนดชำระ {{ invoice.dueDate }}
          </p>
        </div>
        <Badge
          :variant="
            invoice.status === 'PAID'
              ? 'success'
              : invoice.status === 'OVERDUE'
              ? 'destructive'
              : 'secondary'
          "
          class="h-fit"
        >
          {{
            invoice.status === "PAID"
              ? "ชำระแล้ว"
              : invoice.status === "OVERDUE"
              ? "เลยกำหนด"
              : "ยังไม่ชำระ"
          }}
        </Badge>
      </div>
    </CardHeader>

    <Separator></Separator>

    <CardContent class="space-y-6 mt-3">
      <!-- ข้อมูลลูกค้า -->
      <div>
        <h3 class="text-sm font-medium text-muted-foreground mb-2">ลูกค้า</h3>
        <div class="flex items-center gap-4 text-sm">
          <span class="font-medium">โซเฟีย เฮล</span>
          <span>070 123 4567</span>
          <span>example@mail.com</span>
        </div>
      </div>

      <!-- วิธีชำระเงิน + วิธีจัดส่ง -->
      <div class="grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 class="font-medium mb-1">วิธีชำระเงิน</h4>
          <p class="text-muted-foreground">บัตรเครดิต</p>
          <p><span class="font-medium">รหัสธุรกรรม:</span> 000001-TXT</p>
          <p><span class="font-medium">ยอดเงิน:</span> 2,500 บาท</p>
        </div>

        <div>
          <h4 class="font-medium mb-1">วิธีจัดส่ง</h4>
          <p class="text-muted-foreground">ขนส่งเอกชน</p>
          <p><span class="font-medium">รหัสติดตามพัสดุ:</span> FX-012345-6</p>
          <p><span class="font-medium">วันที่ส่ง:</span> 15/12/2561</p>
        </div>
      </div>

      <!-- สถานะจัดส่ง + สถานะการชำระ -->
      <div class="grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <p><span class="font-medium">สถานะการจัดส่ง:</span> จัดส่งแล้ว</p>
        </div>
        <div>
          <p class="flex items-center gap-2">
            <span class="font-medium">สถานะการชำระเงิน:</span>
            <Badge variant="outline" class="text-green-600 border-green-600"
              >ชำระแล้ว</Badge
            >
          </p>
        </div>
      </div>
    </CardContent>
    <Separator></Separator>

    <CardContent class="grid sm:grid-cols-2 gap-6 text-sm mt-3">
      <div>
        <h4 class="font-medium mb-2">ที่อยู่สำหรับเรียกเก็บเงิน</h4>
        <p><span class="font-medium">ชื่อ:</span> โจเซฟ</p>
        <p><span class="font-medium">นามสกุล:</span> วิลเลียม</p>
        <p><span class="font-medium">ที่อยู่:</span> 4898 ถนนโจแอนน์ เลน</p>
        <p><span class="font-medium">เขต/อำเภอ:</span> บอสตัน</p>
        <p><span class="font-medium">ประเทศ:</span> สหรัฐอเมริกา</p>
        <p><span class="font-medium">รัฐ:</span> แมสซาชูเซตส์</p>
        <p><span class="font-medium">รหัสไปรษณีย์:</span> 02110</p>
        <p><span class="font-medium">โทร:</span> +1 (070) 123-4567</p>
      </div>

      <div>
        <h4 class="font-medium mb-2">ที่อยู่สำหรับจัดส่ง</h4>
        <p><span class="font-medium">ชื่อ:</span> ซาร่า</p>
        <p><span class="font-medium">นามสกุล:</span> ซูแดน</p>
        <p><span class="font-medium">ที่อยู่:</span> 4898 ถนนโจแอนน์ เลน</p>
        <p><span class="font-medium">เขต/อำเภอ:</span> บอสตัน</p>
        <p><span class="font-medium">ประเทศ:</span> สหรัฐอเมริกา</p>
        <p><span class="font-medium">รัฐ:</span> แมสซาชูเซตส์</p>
        <p><span class="font-medium">รหัสไปรษณีย์:</span> 02110</p>
        <p><span class="font-medium">โทร:</span> +1 (070) 123-4567</p>
      </div>
    </CardContent>

    <!-- <CardFooter class="flex justify-end gap-2 print:hidden">
      <Button variant="outline" @click="handlePrint">พิมพ์</Button>
      <Button @click="handleDownload">ดาวน์โหลด PDF</Button>
    </CardFooter> -->
  </Card>
</template>
