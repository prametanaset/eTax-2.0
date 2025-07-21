<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xl:col-span-9 relative">
      <div
        class="absolute top-[5%] right-0 w-[98%] lg:h-[95%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
      ></div>
      <Card class="w-full rounded-xl pb-6 z-10 relative">
        <CardHeader class="px-0 py-4 pt-3">
          <CardTitle class="px-6">
            <div class="mb-2">
              <div
                class="flex flex-col gap-4 mt-3 md:flex-row md:flex-nowrap md:items-center text-[1rem]"
              >
                <!-- Tax Invoice Number -->
                <div class="flex flex-col w-full md:w-1/4 gap-1.5">
                  <span class="font-medium dark:text-white text-black/80"
                    >เลขที่</span
                  >
                  <Input
                    v-model="invoiceStore.invoice.document_number"
                    type="text"
                    placeholder="กรอกเลขที่ใบกำกับภาษี"
                    class="h-10 font-normal bg-[hsl(var(--card))]"
                  />
                </div>
                <!-- Document Type Select -->
                <div class="flex flex-col w-full md:w-1/4 gap-1.5">
                  <span class="font-medium dark:text-white text-black/80"
                    >ประเภทเอกสาร</span
                  >
                  <Select v-model="invoiceStore.invoice.document_type">
                    <SelectTrigger class="h-10 bg-[hsl(var(--card))]">
                      <SelectValue
                        placeholder="เลือกประเภทเอกสาร"
                        :class="
                          invoiceStore.invoice.document_type !== ''
                            ? ''
                            : 'text-[#a1a8b3] font-normal'
                        "
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="TAX-INVOICE">ใบกำกับภาษี</SelectItem>
                        <SelectItem value="RECEIPT-TAX-INVOICE">
                          ใบเสร็จรับเงิน/ใบกำกับภาษี
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <!-- Issue Date -->
                <div class="flex flex-col w-full md:w-1/4 gap-1.5">
                  <span class="font-medium dark:text-white text-black/80"
                    >วันที่สร้าง</span
                  >
                  <BaseDateTimePicker />
                </div>

                <!-- Ref No -->
                <div class="flex flex-col w-full md:w-1/4 gap-1.5">
                  <span class="font-medium dark:text-white text-black/80"
                    >เลขอ้างอิง</span
                  >
                  <Input
                    v-model="invoiceStore.invoice.reference_id"
                    type="text"
                    placeholder="กรอกเลขอ้างอิง (Ref No.)"
                    class="h-10 font-normal bg-[hsl(var(--card))]"
                  />
                </div>
              </div>
            </div>
          </CardTitle>

          <!-- Seller & Customer Info -->
          <div class="z-999 grid sm:grid-cols-1 gap-2 px-4">
            <div v-if="false" class="mr-1 px-2">
              <p class="mb-1 text-md font-medium">From</p>
              <BaseCustomer v-model="customer" />
            </div>
            <div class="px-2">
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseSellerAddress />
                <BaseCustomerAddress />
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
          <Textarea v-model="invoiceStore.invoice.remarks" class="mt-1" />
        </div>
      </Card>
    </div>
    <div class="col-span-12 xl:col-span-3 sticky top-[4.5rem] self-start">
      <BaseNotificationCard class="w-full mb-3" />
      <Card class="w-full">
        <div class="grid sm:grid-cols-2 gap-4 p-6 w-full">
          <!-- <Button variant="outline" class="bg-[hsl(var(--card))]">
            <Eye />ตัวอย่าง
          </Button> -->
          <BasePreviewInvoice class="p-6" />
          <Button variant="outline" class="bg-[hsl(var(--card))]">
            <Save />สร้าง
          </Button>
          <Button class="col-span-2" @click="showAlert">
            <Send />สร้าง และ ส่ง
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Send,
  Save,
  Notebook,
} from "lucide-vue-next";

const invoiceStore = useInvoiceStore()

definePageMeta({
  title: "ออกใบกำกับภาษี",
  auth: {
    unauthenticatedOnly: false,
  },
});

onMounted(() => {
  invoiceStore.invoice.status = "IN-PROGRESS"
})

const showAlert = () => {
  Swal.fire({
    title: "สำเร็จ!",
    text: "ระบบได้ส่งข้อมูลของคุณเรียบร้อย",
    icon: "success",
    confirmButtonText: "ตกลง",
    customClass: {
      confirmButton:
        "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-400",
    },
  });
};


</script>

<style></style>
