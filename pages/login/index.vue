<template>
  <div class="flex h-screen">
    <div class="w-3/5">
      <!-- <p>Background here!</p> -->
      <ClientOnly>
        <BaseThreeLinesEffect class="z-50" />
        <!-- <BaseThreeLinesEffectIndexVue /> -->
      </ClientOnly>

      <div v-if="false" class="content">
        <div class="content__container">
          <!-- <p class="content__container__text">
            Hello
          </p> -->

          <ul class="content__container__list">
            <li class="content__container__list__item">เราสร้างสิ่งนี้... เพราะเรารู้ว่า มันควรจะง่ายกว่านี้</li>
            <li class="content__container__list__item">เราทำสิ่งที่รัฐบาลควรจะทำให้มันง่าย แต่มันไม่เคยง่าย</li>
            <li class="content__container__list__item">จนกระทั่งตอนนี้</li>
            <li class="content__container__list__item">จากวุ่นวาย...สู่เรียบง่าย ในคลิกเดียว</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-2/5 bg-white p-40">
      <div class="my-auto">
        <CardHeader>
          <CardTitle class="text-3xl">เริ่มต้นใช้งาน</CardTitle>
        </CardHeader>
        <CardContent>
          <Form class="grid gap-4" @submit="onSubmit">
            <div class="grid gap-2">
              <div>
                <Label for="email">Email</Label>
                <Input name="email" type="email" placeholder="Email address*" required v-model="email.value" />
                <span class="text-red-500 text-sm">{{ email.errorMessage }}</span>
              </div>
              <div>
                <Label for="password">Password</Label>
                <Input name="password" type="password" placeholder="Password*" required v-model="password.value" />
                <span class="text-red-500 text-sm">{{ password.errorMessage }}</span>
              </div>
            </div>
            <Button class="w-full">เข้าสู่ระบบ</Button>
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
          </Form>
          <div class="mt-4 mb-8 text-center text-sm">
            Don't have an account? <a href="/register" class="underline">Sign up</a>
          </div>
          <Separator label="OR" />
          <div class="grid gap-2 mt-8 mb-4 text-sm">
            <Button class="w-full bg-white text-muted-800 hover:text-white">
              <span class="w-6"><img src="@/assets/img/google-logo.png" alt="" class="w-full" /></span>
              Continue with Google
            </Button>
            <Button class="w-full bg-white text-muted-800 hover:text-white">
              <span class="w-6"><img src="@/assets/img/thaiid-logo.png" alt="" class="w-full" /></span>
              Continue with ThaiID
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useForm, useField } from "vee-validate";

definePageMeta({
  layout: false,
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
const onSubmit = handleSubmit(() => { });

// ใช้ useField() สำหรับแต่ละฟิลด์
const email = useField("email", checkEmailInDB);
const password = useField("password", validatePassword);
</script>

<style scoped>

</style>
