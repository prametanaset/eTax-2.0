<template>
  <div class="mx-auto max-w-sm mt-5 min-w-[300px]">
    <CardHeader>
      <CardTitle class="text-3xl"> Create account </CardTitle>
    </CardHeader>
    <CardContent>
      <Form class="grid gap-4" @submit="onSubmit">
        <div class="grid gap-2">
          <div class="">
            <Label for="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email address*"
              required
              v-model="email.value"
            />
            <span class="text-red-500 text-sm">{{ email.errorMessage }}</span>
          </div>
          <div class="">
            <Label for="email">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password*"
              required
              v-model="password.value"
            />
            <span class="text-red-500 text-sm">{{
              password.errorMessage
            }}</span>
          </div>
        </div>
        <Button class="w-full"> ดำเนินการต่อ </Button>
      </Form>
      <div class="mt-4 mb-8 text-center text-sm">
        Already have an account?
        <a href="/login" class="underline"> Login </a>
      </div>
      <Separator label="OR" />
      <div class="grid gap-2 mt-8 mb-4 text-sm">
        <Button class="w-full bg-white">
          <span class="w-6"
            ><img src="@/assets/img/google-logo.png" alt="" class="w-full"
          /></span>
          Continue with Google
        </Button>
        <Button class="w-full bg-white">
          <span class="w-6"
            ><img src="@/assets/img/thaiid-logo.png" alt="" class="w-full"
          /></span>
          Continue with ThaiID
        </Button>
      </div>
    </CardContent>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
  }
});

// ใช้ useForm() สำหรับจัดการฟอร์ม
const { handleSubmit } = useForm();

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
const onSubmit = handleSubmit(() => {});

// ใช้ useField() สำหรับแต่ละฟิลด์
const email = useField("email", checkEmailInDB);
const password = useField("password", validatePassword);
</script>

<style></style>
