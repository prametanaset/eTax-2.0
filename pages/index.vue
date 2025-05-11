<template>
  <div class="flex h-screen">
    <BaseLogin></BaseLogin>
   
  </div>
</template>


<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
const device = useDevice();

definePageMeta({
  layout: false,
});

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
  console.log("tValue:",tValue);
  console.log("tOutput:",tOutput);

  console.log("Form submitted!"); // all fields passed validation
  navigateTo('/')
})
// ใช้ useField() สำหรับแต่ละฟิลด์
const email = useField("email", checkEmailInDB);
const password = useField("password", validatePassword);
</script>

<style scoped>
.font-ibm {
  font-family: "Noto Sans Thai";
}
</style>
