<template>
   <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">ขอต้อนรับกลับมา</h1>
      <p class="text-sm text-muted-foreground">
        Enter your email below to login your account
      </p>
    </div>
    
  <form @submit.prevent="onLogin" class="grid gap-4">
    <FormField name="email" v-slot="{ field }">
      <FormItem>
        <FormLabel>อีเมลผู้ใช้งาน</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
            v-bind="field"
            class="placeholder:font-normal h-10 bg-[hsl(var(--card))] invalid:border-red-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="password" v-slot="{ field }">
      <FormItem>
        <FormLabel>รหัสผ่าน</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="รหัสผ่าน"
            v-bind="field"
            class="placeholder:font-normal h-10 bg-[hsl(var(--card))] invalid:border-red-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <span v-if="errorLogin" class="text-red-500 text-sm">
      หมายเลขโทรศัพท์ ชื่อผู้ใช้ อีเมล หรือรหัสผ่าน ไม่ถูกต้อง
    </span>

    <Button type="submit" class="w-full text-md font-semibold">
              <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />

      เข้าสู่ระบบ
    </Button>
  </form>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader } from "lucide-vue-next";

import * as z from 'zod'


const { signIn } = useAuth()  // สมมุติว่ามี useAuth hook
const errorLogin = ref(false)
const isLoading = ref(false);

// สร้าง schema ด้วย zod + vee-validate/zod
const formSchema = toTypedSchema(
  z.object({
    // email: z.string().min(1, 'กรุณากรอกอีเมล').email('รูปแบบอีเมลไม่ถูกต้อง'),
    email: z.string().min(1, 'กรุณากรอกอีเมล'),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  })
)

// เรียก useForm เพื่อผูก form schema
const form = useForm({
  validationSchema: formSchema,
})

// ฟังก์ชัน submit ที่ได้จาก useForm.handleSubmit
const onLogin = form.handleSubmit(async (values) => {
  errorLogin.value = false
  isLoading.value = true;
  const result = await signIn('credentials', {
    username: values.email,
    password: values.password,
    redirect: false,            // ต้องใส่อันนี้
    callbackUrl: '/dashboard',  // ยังคงใส่ได้
  })

  if (result?.error) {
    errorLogin.value = true
    isLoading.value = false;

  } else if (result?.url) {
    // ทำ redirect ตรงนี้เอง
    
    navigateTo('/dashboard')   // หรือจะใช้ useRouter().push() ก็ได้
    isLoading.value = false;
  }
})

</script>

<style scoped>
.font-ibm {
  font-family: 'Noto Sans Thai';
}
</style>
