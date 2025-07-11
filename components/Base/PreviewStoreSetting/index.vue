<template>
  <div class="absolute -right-14 top-24 w-full font-sans">
    <div
      class="absolute top-[5%] left-8 w-[10%] lg:h-[95%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
    ></div>
    <Card
      class="relative bg-white aspect-[210/297] max-w-[1194px] w-full mx-auto px-4 shadow-lg rounded-xl"
    >
      <CardHeader class="border-b pb-2 py-10 text-black">
        <div class="flex justify-between items-start">
          <!-- ซ้าย: โลโก้ + ข้อมูลร้านค้า -->
          <div class="flex gap-1 max-w-[50%]">
            <!-- โลโก้ SVG -->
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                class="-ml-2 mr-2 mb-1 h-16 w-16"
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
            <!-- ข้อมูลร้านค้า -->
            <div class="grid">
              <CardTitle
                class="text-3xl flex-none w-screen"
                :class="shop.storeName ? '' : 'text-gray-400'"
                >{{
                  shop.storeName ? shop.storeName : "ชื่อบริษัท / ร้านค้า"
                }}
                <span>{{ shop.branchCode === "00000" ? "(สำนักงานใหญ่)" : '' }}</span>
                </CardTitle
              >
              <!-- <p class="font-bold text-lg">Tanaset</p> -->
              <div class="mt-2 font-normal">
                <p class="text-lg" :class="shop.address ? '' : 'text-gray-400'">
                  {{ shop.address ? shop.address : "ที่อยู่ธุรกิจ" }}
                </p>
                <p class="text-lg">
                  <span
                    :class="
                      shop.subdistrict.label ? 'text-black' : 'text-gray-400'
                    "
                    >{{
                      shop.subdistrict?.label
                        ? `ตำบล${shop.subdistrict.label} `
                        : "ตำบล "
                    }}</span
                  >
                  <span
                    :class="
                      shop.district.label ? 'text-black' : 'text-gray-400'
                    "
                    >{{
                      shop.district?.label
                        ? `อำเภอ${shop.district.label} `
                        : "อำเภอ "
                    }}</span
                  >
                  <span
                    :class="
                      shop.province.label ? 'text-black' : 'text-gray-400'
                    "
                    >{{
                      shop.province?.label
                        ? `จังหวัด${shop.province.label} `
                        : "จังหวัด "
                    }}</span
                  >
                  <span
                    :class="shop.zipcode ? 'text-black' : 'text-gray-400'"
                    >{{ shop.zipcode || "รหัสไปรษณีย์ " }}</span
                  >
                </p>
                <!-- <p class="text-lg">โทรศัพท์ Tanaset</p> -->
                <p class="text-lg" :class="shop.taxId ? '' : 'text-gray-400'">
                  <span
                    :class="shop.taxId && shop.taxId.length > 12 ? 'text-black' : 'text-gray-400'"
                    >
                  {{
                    shop.taxId
                      ? `เลขประจำตัวผู้เสียภาษี ${shop.taxId} `
                      : "เลขประจำตัวผู้เสียภาษี "
                  }}
                  </span><span
                    :class="shop.branchCode && shop.branchCode.length > 4 ? 'text-black' : 'text-gray-400'"
                    >{{
                      shop.branchCode !== "00000"
                        ? `สาขาที่ ${shop.branchCode}` :
                        shop.branchCode === "00000"
                        ? ""
                        : "เลขที่สาขา"
                    }}</span
                  >
                </p>
              </div>
            </div>
          </div>


        </div>
      </CardHeader>

      <!-- ส่วนอื่น ๆ เช่น รายการสินค้า, QR, รวมเงิน สามารถเติมต่อได้ -->
      <CardContent class="space-y-6 mt-6 opacity-35">
        <div class="flex justify-between items-start">
          <!-- โลโก้ + ชื่อร้าน -->
          <div class="flex gap-4">
            <!-- <Skeleton class="w-16 h-16 rounded-full" /> -->
            <div class="space-y-2">
              <Skeleton class="h-5 w-[200px]" />
              <Skeleton class="h-4 w-[300px]" />
              <Skeleton class="h-4 w-[250px]" />
            </div>
          </div>
          <!-- ชื่อเอกสาร -->
          <div class="text-right space-y-2">
            <Skeleton class="h-5 w-[180px]" />
            <Skeleton class="h-5 w-[150px]" />
          </div>
        </div>
        <!-- ตารางสินค้า -->
        <div class="space-y-4">
          <!-- <div class="grid grid-cols-5 gap-5 text-sm text-gray-500 font-medium">
          <div>ลำดับ</div>
          <div>รายการ</div>
          <div>จำนวน</div>
          <div>หน่วยละ</div>
          <div>รวม</div>
        </div> -->
          <div v-for="i in 4" :key="i" class="grid grid-cols-5 gap-4">
            <Skeleton class="h-14 col-span-1" />
            <Skeleton class="h-14 col-span-1.5" />
            <Skeleton class="h-14 col-span-0.5" />
            <Skeleton class="h-14 col-span-1" />
            <Skeleton class="h-14 col-span-1" />
          </div>
        </div>

        <!-- รวมเงิน / QR -->
        <div class="flex justify-between items-end mt-8">
          <Skeleton class="h-32 w-32 rounded" />
          <div class="space-y-2 w-[250px]">
            <Skeleton class="h-14 w-full" />
            <Skeleton class="h-14 w-full" />
            <Skeleton class="h-14 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const shop = useShopFormStore();
</script>

<style scoped></style>
