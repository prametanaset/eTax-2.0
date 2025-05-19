<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div>
      <p class="text-3xl font-bold font-ibm text-center">ขอต้อนรับกลับมา</p>
    </div>
    <div>
      <Form class="grid gap-4" @submit="onSubmit">
        <div class="grid gap-3">
          <div>
            <!-- <Label for="email">อีเมลผู้ใช้งาน</Label> -->
            <Input
              name="email"
              type="email"
              placeholder="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
              required
              v-model="email.value"
              class="placeholder:font-normal h-10 bg-[hsl(var(--card))]"
            />
            <span class="text-red-500 text-sm font-light">{{
              email.errorMessage
            }}</span>
          </div>
          <div>
            <!-- <Label for="password">Password</Label> -->
            <Input
              name="password"
              type="password"
              placeholder="รหัสผ่าน"
              required
              v-model="password.value"
              class="placeholder:font-normal h-10 bg-[hsl(va(--card))]"
            />
            <span class="text-red-500 text-sm font-light">{{
              password.errorMessage
            }}</span>
          </div>
        </div>
        <Button class="w-full text-md font-semibold">เข้าสู่ระบบ</Button>
        <link
          href="https://fonts.googleapis.com/css?family=Lato"
          rel="stylesheet"
        />
      </Form>
      <div class="mt-4 mb-8 text-center text-sm">
        ยังไม่มีบัญชีใช่ไหม?
        <!-- <a href="/register" class="underline">ลงชื่อสมัคร</a> -->
        <NuxtLink to="/register"
          ><Button variant="link" class="px-0 font-normal"
            >ลงชื่อสมัคร</Button
          ></NuxtLink
        >
      </div>
      <Separator />
      <div class="grid gap-2 mt-8 mb-4 text-sm">
        <Button class="w-full text-muted-800 bg-[hsl(var(--card))] shadow-md dark:text-white hover:bg-zinc-200 h-10">
          <span class="w-6"
            ><img src="@/assets/img/google-logo.png" alt="" class="w-full"
          /></span>
          ดำเนินการต่อด้วย Google
        </Button>
        <Button class="w-full bg-[hsl(var(--card))] shadow-md text-muted-800 dark:text-white hover:text-white h-10">
          <span class="w-6"
            ><img src="@/assets/img/thaiid-logo.png" alt="" class="w-full"
          /></span>
          ดำเนินการต่อด้วย ThaiID
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import { cn } from "@/lib/utils";

const device = useDevice();

// ใช้ useForm() สำหรับจัดการฟอร์ม
const { handleSubmit, validate, meta } = useForm();

const checkEmailInDB = (email: string) => {
  if (!email) return "กรุณากรอกอีเมล";
  return true;
};

const validatePassword = (value: string) => {
  if (!value) return "กรุณากรอกรหัสผ่าน";
  if (value.length < 6) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  return true;
};

// ฟังก์ชันเมื่อกด Submit
const onSubmit = handleSubmit((tValue, tOutput) => {
  console.log("tValue:", tValue);
  console.log("tOutput:", tOutput);

  console.log("Form submitted!"); // all fields passed validation
  navigateTo("/dashboard");
});
// ใช้ useField() สำหรับแต่ละฟิลด์
const email = useField("email", checkEmailInDB);
const password = useField("password", validatePassword);
</script>

<style scoped>
.font-ibm {
  font-family: "Noto Sans Thai";
}
</style>
