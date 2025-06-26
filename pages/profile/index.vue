<template>
  <BaseProfile>
    <div class="grid gap-10 m-auto max-w-lg py-5">
      <p class="text-lg font-medium text-primary-500">ข้อมูลส่วนตัว</p>
      <div class="grid gap-10">
        <section class="grid gap-5">
          <p class="text-md font-medium">รูปโปรไฟล์</p>
          <div class="picture relative">
            <span
              type="file"
              class="absolute bottom-0 right-[40%] z-10 shadow-md rounded-[50%] border-2 border-white/50 p-1 bg-muted-500 hover:bg-primary-500"
              ><Plus
            /></span>

            <img v-if="data_user.profileUrl != ''" src="" alt="" />
            <div v-else class="flex justify-center">
              <div class="w-[6rem] h-[6rem] rounded-full bg-muted-500 relative">
                <span class="absolute top-[35%] left-[30%] text-3xl">
                  {{ data_user.firstName[0] + data_user.lastName[0] }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section class="grid gap-5">
          <p class="text-md font-medium">ข้อมูลส่วนตัว</p>
          <Form action="">
            <div class="grid sm:grid-cols-2 sm:gap-5 gap-2">
              <div class="relative items-center">
                <Label>ชื่อ</Label>
                <Input
                  id="search"
                  type="text"
                  class="pl-10"
                  v-model="data_user.firstName"
                />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <User class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="relative items-center">
                <Label>สกุล</Label>
                <Input
                  id="search"
                  type="text"
                  class="pl-10"
                  v-model="data_user.lastName"
                />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <User class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="relative items-center">
                <Label>Email</Label>
                <Input
                  id="search"
                  type="text"
                  class="pl-10"
                  v-model="data_user.email"
                />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <Mail class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="relative items-center">
                <Label>เบอร์ติดต่อ</Label>
                <Input
                  id="search"
                  type="text"
                  class="pl-10"
                  v-model="data_user.phone"
                />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <Phone class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="relative items-center col-span-2">
                <Label>เลขประจำตัวผู้เสียภาษี</Label>
                <Input
                  id="search"
                  type="text"
                  class="pl-10"
                  v-model="data_user.taxNo"
                />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <CreditCard class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="items-center col-span-2">
                <Label>ที่อยู่</Label>
                <Textarea id="search" type="text" v-model="data_user.address" />
              </div>
            </div>
          </Form>
        </section>
      </div>
    </div>
  </BaseProfile>
</template>

<script lang="ts" setup>
import {
  User,
  Phone,
  Mail,
  Plus,
  CreditCard,
  Map,
  MapPin,
} from "lucide-vue-next";
definePageMeta({
  // layout: "default",
  title: "โปรไฟล์",
  auth: {
    unauthenticatedOnly: false,
  }
});

const data_user = {
  id: 1,
  firstName: "John",
  lastName: "Wick",
  email: "prametanaset147@gmail.com",
  phone: "098-765-321",
  taxNo: "1111111111111",
  profileUrl: "",
  address: "3801 Chalk Butte Rd, Cut Bank, MT 59427, United States",
  address2: "",
  payment: {},
};
</script>

<style></style>
