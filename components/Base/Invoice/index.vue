<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@unovis/ts/components/bullet-legend/style";
import thaiBaht from "thai-baht-text";

const invoice = {
  number: "INV1069",
  issued: "May 27, 2015",
  due: "June 27, 2015",
  client: {
    name: "นายสมชาย หมายปอง",
    email: "JohnDoe@gmail.com",
    phone: "555-555-5555",
    address: "1/226 หมู่ที่ 16 ตำบลบ้านเป็ด อำเภอเมืองขอนแก่น จ.ขอนแก่น 40000",
    taxId: "0123456789123",
  },
  items: Array.from({ length: 30 }, (_, i) => ({
    id: `P-00${i + 1}`,
    desc: `สินค้า-Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, vero.${
      i + 1
    }`,
    qty: 2 + (i % 5),
    unit: "ชิ้น",
    price: 200,
  })),
  taxRate: 0.13,
};

const store_data = {
  profile: "",
  storeNameTH: "บริษัท ซันสเกลอัพ จำกัด",
  storeNameEN: "Sunscale Up Co., Ltd.",
  storeAddress:
    "111/226 หมู่ที่ 16 ตำบลบ้านเป็ด อำเภอเมืองขอนแก่น จ.ขอนแก่น 40000",
  phone: "098-765-4321",
  taxNo: "0123456789123",
};

const itemsPerPage = computed(() => {
  return invoice.items.length > 18 ? 25 : 18;
});

const pages = computed(() => {
  const result: Array<(typeof invoice.items)[0][]> = [];
  const perPage = itemsPerPage.value;
  const totalItems = invoice.items.length;

  for (let i = 0; i < totalItems; i += perPage) {
    result.push(invoice.items.slice(i, i + perPage));
  }

  // กรณีที่จำนวน item มากกว่า 10 และพอดีกับ perPage → เพิ่มหน้า footer
  const shouldAddEmptyPage = totalItems > 19 && result.length === 1;

  if (shouldAddEmptyPage) {
    result.push([]); // หน้าใหม่สำหรับ footer
  }

  return result;
});
</script>

<template>
  <div class="bg-background text-black">
    <div
      v-for="(itemsOnPage, pageIndex) in pages"
      :key="pageIndex"
      class="relative bg-white shadow-xl w-[794px] max-w-[794px] h-[1123px] max-h-[1123px] mx-auto my-6 px-6 py-1 flex flex-col justify-between page"
    >
      <!-- Header -->
      <div>
        <div
          v-if="pageIndex === 0"
          class="flex justify-between items-start border-b pb-2 py-5"
        >
          <div class="flex gap-1 max-w-[50%]">
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                class="mr-1 mb-1 h-12 w-12"
                viewBox="0 0 300.000000 300.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                  fill="#7a27b2"
                  stroke="none"
                >
                  <path
                    d="M1161 2370 c-155 -165 -292 -312 -304 -327 -20 -26 -22 -36 -17 -132 l5 -103 350 373 c193 205 350 378 350 384 0 7 -23 33 -51 58 l-51 46 -282 -299z"
                  />
                  <path
                    d="M1472 2320 l-73 -80 520 0 521 0 0 80 0 80 -447 0 -448 0 -73 -80z"
                  />
                  <path
                    d="M570 1927 l0 -443 73 -72 c40 -39 76 -72 80 -72 4 0 7 232 7 515 l0 515 -80 0 -80 0 0 -443z"
                  />
                  <path
                    d="M2005 2151 l-79 -6 334 -314 c184 -173 354 -333 378 -355 l43 -41 49 55 c27 30 48 58 47 61 -1 4 -146 142 -322 308 -256 240 -325 300 -345 299 -14 -1 -61 -4 -105 -7z"
                  />
                  <path
                    d="M1400 1861 c-108 -35 -200 -113 -247 -209 -25 -51 -28 -67 -28 -162 0 -99 2 -110 32 -171 142 -288 553 -281 692 11 23 48 26 68 26 160 0 95 -3 111 -28 162 -37 76 -101 139 -178 179 -56 29 -75 33 -154 36 -49 1 -101 -1 -115 -6z m199 -171 c56 -28 107 -93 121 -151 23 -94 -21 -196 -107 -246 -39 -23 -60 -28 -113 -28 -111 0 -193 65 -221 177 -22 93 29 200 120 248 50 26 149 27 200 0z"
                  />
                  <path
                    d="M2270 1176 l0 -516 80 0 80 0 0 443 0 443 -62 60 c-35 33 -71 66 -80 73 -17 13 -18 -13 -18 -503z"
                  />
                  <path
                    d="M266 1499 c-25 -28 -46 -54 -45 -58 1 -11 640 -606 650 -605 5 1 52 2 105 3 53 0 94 5 92 10 -5 12 -740 701 -749 701 -4 0 -28 -23 -53 -51z"
                  />
                  <path
                    d="M1836 796 c-193 -205 -352 -378 -353 -383 -2 -6 20 -32 50 -57 l54 -46 80 82 c44 46 155 164 248 263 93 99 194 207 225 240 l57 60 -6 107 -6 106 -349 -372z"
                  />
                  <path
                    d="M562 643 l3 -78 440 -2 c242 -2 445 1 450 5 6 4 41 40 80 80 l69 72 -522 0 -523 0 3 -77z"
                  />
                </g>
              </svg>
            </div>
            <div class="grid text-[10px]">
              <CardTitle class="text-lg">{{
                store_data.storeNameTH
              }}</CardTitle>
              <p class="font-bold text-sm">{{ store_data.storeNameEN }}</p>
              <p>{{ store_data.storeAddress }}</p>
              <p>โทรศัพท์ {{ store_data.phone }}</p>
              <p>เลขประจำตัวผู้เสียภาษี {{ store_data.taxNo }}</p>
            </div>
          </div>
          <div class="text-right max-w-[50%]">
            <CardTitle class="text-lg">ใบเสร็จรับเงิน/ใบกำกับภาษี</CardTitle>
            <CardTitle class="text-lg">Receipt/Tax Invoice </CardTitle>
            <p class="text-sm">(ต้นฉบับ/Original)</p>
          </div>
        </div>
        <div
          v-if="pageIndex === 0"
          class="grid grid-cols-2 items-start border-b pb-2 py-5 gap-4 text-[10px]"
        >
          <div class="w-[110%] flex p-2">
            <div class="flex flex-col gap-2">
              <div class="flex gap-4">
                <p class="font-semibold min-w-[7rem] max-w-[7rem]">
                  ลูกค้า/Customer
                </p>
                <p>{{ invoice.client.name }}</p>
              </div>
              <div class="flex gap-4">
                <p class="font-semibold min-w-[7rem] max-w-[7rem]">
                  ที่อยู่/Address
                </p>
                <p>{{ invoice.client.address }}</p>
              </div>
              <div class="flex gap-4">
                <p class="font-semibold min-w-[7rem] max-w-[7rem]">
                  เลขผู้เสียภาษี/Tax ID
                </p>
                <p>{{ invoice.client.taxId }}</p>
              </div>
            </div>
          </div>
          <div class="w-[90%] h-full p-2 ml-10">
            <div class="flex flex-col gap-2">
              <div class="flex gap-4">
                <p class="font-semibold min-w-[8rem] max-w-[8rem]">
                  เลขที่ใบกำกับภาษี/Tax Invoice NO.
                </p>
                <p>{{ invoice.number }}</p>
              </div>
              <div class="flex gap-4">
                <p class="font-semibold min-w-[8rem] max-w-[8rem]">
                  เลขที่อ้างอิง/Ref NO.
                </p>
                <p>{{ invoice.number }}</p>
              </div>
              <div class="flex gap-4">
                <p class="font-semibold min-w-[8rem] max-w-[8rem]">
                  วันที่/Date
                </p>
                <p>{{ formatThaiDate(new Date()) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Info (only on first page) -->
        <!-- <div
          v-if="pageIndex === 0"
          class="grid grid-cols-2 gap-6 border-b py-4"
        ></div> -->

        <!-- Table -->
        <div class="overflow-x-auto py-4 text-[10px]">
          <table v-if="itemsOnPage.length > 0" class="w-full rounded-md">
            <thead class="bg-muted-200">
              <tr>
                <th class="p-2 border border-muted-800 text-start">ลำดับ</th>
                <th class="p-2 border border-muted-800 text-start">รหัส</th>
                <th class="p-2 border border-muted-800 text-start">คำอธิบาย</th>
                <th class="p-2 border border-muted-800 text-center">จำนวน</th>
                <th class="p-2 border border-muted-800 text-right">หน่วย</th>
                <th class="p-2 border border-muted-800 text-right">
                  มูลค่าก่อนภาษี
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in itemsOnPage" :key="i">
                <td class="p-2">{{ i + 1 }}</td>
                <td class="p-2">{{ item.id }}</td>
                <td class="p-2 max-w-[15rem] text-overflow-ellipsis">
                  {{ item.desc }}
                </td>
                <td class="p-2 text-center">{{ item.qty }}</td>
                <td class="p-2 text-right">{{ item.unit }}</td>
                <td class="p-2 text-right">
                  {{ currencyFormat((item.qty * item.price).toFixed(2)) }}
                </td>
              </tr>
            </tbody>
          </table>
          <table v-if="pageIndex === pages.length - 1" class="w-full">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="font-bold">
                <td class="p-2 border border-muted-800">
                  จำนวนเงินรวมทั้งสิ้น
                </td>
                <td class="p-2 border border-muted-800 text-right" colspan="2">
                  {{
                    thaiBaht(
                      invoice.items.reduce(
                        (sum, item) => sum + item.qty * item.price,
                        0
                      ) +
                        invoice.items.reduce(
                          (sum, item) => sum + item.qty * item.price,
                          0
                        ) *
                          invoice.taxRate
                    )
                  }}
                </td>

                <td class="p-2 border border-muted-800 text-right" colspan="2">
                  {{
                    currencyFormat(
                      (
                        invoice.items.reduce(
                          (sum, item) => sum + item.qty * item.price,
                          0
                        ) +
                        invoice.items.reduce(
                          (sum, item) => sum + item.qty * item.price,
                          0
                        ) *
                          invoice.taxRate
                      ).toFixed(2)
                    )
                  }}
                </td>
              </tr>
              <!-- Total & Tax (only on last page) -->
              <tr v-if="pageIndex === pages.length - 1">
                <td
                  class="p-2 border border-muted-800 text-sm align-top"
                  colspan="3"
                >
                  <p>หมายเหตุ/Remark</p>
                  <p>-</p>
                </td>
                <td class="p-2 border border-muted-800 text-right" colspan="2">
                  <div class="flex justify-between py-1">
                    <p>ยอดเงินรวม</p>
                    <p>
                      {{
                        currencyFormat(
                          invoice.items
                            .reduce(
                              (sum, item) => sum + item.qty * item.price,
                              0
                            )
                            .toFixed(2)
                        )
                      }}
                    </p>
                  </div>
                  <div class="flex justify-between py-1">
                    <p>ส่วนลด</p>
                    <p>-</p>
                  </div>
                  <div class="flex justify-between py-1">
                    <p>ยอดก่อนภาษี</p>
                    <p>
                      {{
                        currencyFormat(
                          invoice.items
                            .reduce(
                              (sum, item) => sum + item.qty * item.price,
                              0
                            )
                            .toFixed(2)
                        )
                      }}
                    </p>
                  </div>
                  <div class="flex justify-between py-1">
                    <p>ภาษีมูลค่าเพิ่ม</p>
                    <p>
                      {{
                        currencyFormat(
                          (
                            invoice.items.reduce(
                              (sum, item) => sum + item.qty * item.price,
                              0
                            ) * invoice.taxRate
                          ).toFixed(2)
                        )
                      }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="pageIndex === pages.length - 1" class="mt-5">
            <p>
              ใบเสร็จรับเงิน/ใบกํากับภาษีฉบับนี้ได้จัดทําขึ้นอย่างสมบูรณ์แล้วโดยไม่ต้องมีลายเซ็นของเจ้าหน้าที่บริษัทแต่อย่างใด
            </p>
            <p>
              เอกสารนี้ได้จัดทำและส่งข้อมูลให้แก่กรมสรรพาการด้วยวิธีการทางอิเล็กทรอนิกส์
            </p>
          </div>
        </div>
      </div>

      <!-- Footer (only on last page) -->
      <div
        class="absolute right-5 bottom-5 flex flex-row justify-end items-start gap-6 pt-6 text-[12px]"
      >
        หน้าที่ {{ `${pageIndex + 1}/${pages.length}` }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 21cm;
  min-height: 29.7cm;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  .page {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}
</style>
