<template>
  <BaseProfile>
    <div class="grid gap-10 m-auto max-w-lg py-5">
      <p class="text-lg text-primary-500">ตั้งค่าร้านค้า</p>
      <div class="grid gap-10">
        <section class="grid gap-5">
          <p class="text-md font-light">รูปโปรไฟล์</p>
          <div class="picture relative">
            <span
              type="file"
              class="absolute bottom-0 right-[40%] z-10 shadow-md rounded-[50%] border-2 border-white/50 p-1 bg-muted-500 hover:bg-primary-500"
              ><Plus
            /></span>

            <img v-if="false" />
            <div v-else class="flex justify-center">
              <div class="w-[6rem] h-[6rem] rounded-full bg-muted-500 relative">
                <span class="absolute top-[35%] left-[30%] text-3xl"> ST </span>
              </div>
            </div>
          </div>
        </section>
        <section class="grid gap-5">
          <p class="text-md font-light">ข้อมูลร้านค้า</p>
          <Form action="">
            <div class="grid sm:grid-cols-2 sm:gap-5 gap-2">
              <div class="relative items-center col-span-2">
                <Label>ชื่อร้านค้า</Label>
                <Input id="search" type="text" class="pl-10" />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <StoreIcon class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="relative items-center">
                <Label>Email</Label>
                <Input id="search" type="text" class="pl-10" />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <Mail class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="relative items-center">
                <Label>เบอร์ติดต่อ</Label>
                <Input id="search" type="text" class="pl-10" />
                <span
                  class="absolute start-0 top-6 inset-y-0 flex items-center justify-center px-2"
                >
                  <Phone class="size-4 text-muted-foreground" />
                </span>
              </div>
              <div class="items-center col-span-2">
                <Label>ที่อยู่</Label>
                <Textarea id="search" type="text" />
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
  Store,
  StoreIcon,
} from "lucide-vue-next";
definePageMeta({
  // layout: "default",
  title: "โปรไฟล์",
});
</script>

<style></style>
