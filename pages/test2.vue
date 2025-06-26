<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";



const open = ref(false);
const storeName = ref("");
const taxId = ref("");
const contactName = ref("");
const personalId = ref("");
const branchCode = ref("");

const provinces = ref([]);

const loadProvinces = async () => {
  try {
    const locateService = useLocateService();
    provinces.value = await locateService.fetchProvinces() || [];
    provinces.value = await locateService.fetchProvinces() || [];
    provinces.value = await locateService.fetchProvinces() || [];
  } catch (error) {
    console.error("Error fetching provinces:", error);
  }
};

// ให้โหลด provinces พร้อมเปิด dialog
const openDialog = async () => {
  open.value = true;
  await loadProvinces();
};
</script>

<template>

  <div>
  <BaseLocationPicker />
  <Button @click="openDialog">ตั้งค่าร้านค้า</Button>

  <Dialog v-model:open="open">
    <DialogContent
      class="sm:max-w-4xl w-full max-h-[90dvh] bg-[hsl(var(--card))]"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Left: Tabs Form -->
        <div>
          <DialogHeader>
            <DialogTitle>ตั้งค่าร้านค้า</DialogTitle>
            <DialogDescription>
              เลือกประเภทและกรอกข้อมูลให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>

          <Tabs default-value="corporate" class="w-full mt-4">
            <TabsList class="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="corporate">นิติบุคคล</TabsTrigger>
              <TabsTrigger value="person">บุคคลธรรมดา</TabsTrigger>
            </TabsList>

            <!-- Corporate (นิติบุคคล) -->
            <TabsContent value="corporate">
              <Card>
                <CardHeader>
                  <CardTitle>นิติบุคคล</CardTitle>
                  <CardDescription>
                    กรอกชื่อร้านค้าและเลขประจำตัวผู้เสียภาษี
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <Label for="storeName">ชื่อร้านค้า</Label>
                    <Input
                      id="storeName"
                      v-model="storeName"
                      placeholder="ชื่อบริษัท / ร้านค้า"
                    />
                  </div>
                  <div class="flex gap-4">
                    <!-- Tax ID -->
                    <div class="flex-1">
                      <Label for="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                      <Input id="taxId" v-model="taxId" placeholder="13 หลัก" />
                    </div>

                    <!-- Branch Code -->
                    <div class="w-[120px]">
                      <Label for="branchCode">เลขที่สาขา</Label>
                      <Input
                        id="branchCode"
                        v-model="branchCode"
                        placeholder="5 หลัก"
                        maxlength="5"
                        inputmode="numeric"
                      />
                    </div>
                  </div>
                  <div>
    <div>
    <Label class="mb-1 block text-sm font-medium">
      ที่อยู่ร้านค้า <span class="text-red-500">*</span>
    </Label>
    <Textarea
      v-model="address"
      class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      rows="2"
      placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
      required
      maxlength="150"
    />
  </div>
    <!-- ใส่ LocationPicker -->
    <BaseLocationPicker />
  </div>
                  
                </CardContent>
                <CardFooter>
                  <Button>บันทึก</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <!-- Personal (บุคคลธรรมดา) -->
            <TabsContent value="person">
              <Card>
                <CardHeader>
                  <CardTitle>บุคคลธรรมดา</CardTitle>
                  <CardDescription>
                    กรอกชื่อผู้ติดต่อและเลขบัตรประชาชน
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <Label for="contactName">ชื่อผู้ติดต่อ</Label>
                    <Input
                      id="contactName"
                      v-model="contactName"
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </div>
                  <div>
                    <Label for="personalId">เลขบัตรประชาชน</Label>
                    <Input
                      id="personalId"
                      v-model="personalId"
                      placeholder="13 หลัก"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>บันทึก</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter class="mt-6">
            <DialogClose as-child>
              <Button variant="ghost">ปิด</Button>
            </DialogClose>
          </DialogFooter>
        </div>

        <!-- Right: Preview -->
        <!-- ห่อใน container preview -->
        <div
          class="relative top-16 left-10 w-full max-w-3xl bg-white border rounded-md shadow-lg p-6 space-y-4"
        >
          <!-- โลโก้ + ข้อมูลบริษัท -->
          <div class="flex items-start gap-4 pb-4">
            <!-- Logo -->
            <div class="shrink-0">
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

            <!-- ข้อมูลร้านค้า -->
            <div class="flex flex-col text-[0.75rem] leading-relaxed mb-10">
              <h1 class="text-lg font-bold">บริษัท ซันสเกลอัพ จำกัด</h1>
              <p class="text-sm font-semibold">Sunscale Up Co., Ltd.</p>
              <p>
                111/226 หมู่ที่ 16 ตำบลบ้านเป็ด อำเภอเมืองขอนแก่น จ.ขอนแก่น
                40000
              </p>
              <p>โทรศัพท์ 098-765-4321</p>
              <p>เลขประจำตัวผู้เสียภาษี 0123456789123</p>
            </div>
          </div>
          <!-- <Skeleton class="h-[125px] w-[250px] rounded-xl" /> -->

          <div class="space-y-3">
            <!-- หัวตาราง -->
            <div class="flex gap-4">
              <Skeleton class="h-6 w-[70px] rounded" />
              <!-- ลำดับ -->
              <Skeleton class="h-6 w-[500px] rounded" />
              <!-- รายการ -->
              <Skeleton class="h-6 w-[90px] rounded" />
              <!-- จำนวน -->
              <Skeleton class="h-6 w-[110px] rounded" />
              <!-- ราคาต่อหน่วย -->
              <Skeleton class="h-6 w-[120px] rounded" />
              <!-- ราคารวม -->
            </div>

            <!-- บรรทัดที่ 1 -->
            <div class="flex gap-4">
              <Skeleton class="h-6 w-[70px] rounded" />
              <Skeleton class="h-6 w-[500px] rounded" />
              <Skeleton class="h-6 w-[90px] rounded" />
              <Skeleton class="h-6 w-[110px] rounded" />
              <Skeleton class="h-6 w-[120px] rounded" />
            </div>

            <!-- บรรทัดที่ 2 -->
            <div class="flex gap-4">
              <Skeleton class="h-6 w-[70px] rounded" />
              <Skeleton class="h-6 w-[500px] rounded" />
              <Skeleton class="h-6 w-[90px] rounded" />
              <Skeleton class="h-6 w-[110px] rounded" />
              <Skeleton class="h-6 w-[120px] rounded" />
            </div>

            <!-- บรรทัดที่ 3 -->
            <div class="flex gap-4">
              <Skeleton class="h-6 w-[70px] rounded" />
              <Skeleton class="h-6 w-[500px] rounded" />
              <Skeleton class="h-6 w-[90px] rounded" />
              <Skeleton class="h-6 w-[110px] rounded" />
              <Skeleton class="h-6 w-[120px] rounded" />
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  </div>
</template>
