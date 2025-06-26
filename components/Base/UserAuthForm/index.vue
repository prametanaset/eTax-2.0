<script setup lang="ts">
import { cn } from "@/lib/utils";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Github, Loader } from "lucide-vue-next";
import { useForm } from "vee-validate";
const { signIn } = useAuth()  

const isLoading = ref(false);
const errorLogin = ref(false);
const showPasswordField = ref(false);
const isRegistering = ref(false); // สมัครใช้งาน

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, "กรุณากรอกอีเมล"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัว").optional(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onCheckMail = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const userService = useUserService();
    const response = await userService.checkEmail({ username: values.email });
    errorLogin.value = response.data.taken;
    showPasswordField.value = !response.data.taken;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

const onRegister = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const userService = useUserService();

    // สมัครสมาชิก
    await userService.register({
      username: values.email,
      password: values.password as string,
    });

    // ล็อกอินทันทีหลังสมัครสำเร็จ
    const loginResponse = await signIn('credentials', {
    username: values.email,
    password: values.password,
    redirect: false,            // ต้องใส่อันนี้
    callbackUrl: '/dashboard',  // ยังคงใส่ได้
  })

    // 🔐 บันทึก token หรือตั้ง session ตามที่ระบบคุณใช้
    // เช่น saveAccessToken(loginResponse.data.token)

    // ✅ ย้ายหน้า หรือแสดงข้อความว่าเข้าสู่ระบบสำเร็จ
    navigateTo("/dashboard"); // หรือ path ที่คุณต้องการ

  } catch (error) {
    console.error("Register/Login failed:", error);
  } finally {
    isLoading.value = false;
  }
});


</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm text-muted-foreground">
        Enter your email below to create your account
      </p>
    </div>

    <form
      @submit.prevent="showPasswordField ? onRegister() : onCheckMail()"
      class="grid gap-2"
    >
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

      <FormField v-if="showPasswordField" name="password" v-slot="{ field }">
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
        อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น
      </span>

      <Button type="submit" :disabled="isLoading">
        <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Sign In with Email
      </Button>
    </form>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>

    <client-only>
      <Button variant="outline" type="button" :disabled="isLoading">
        <Github class="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </client-only>

    <p class="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our
      <a href="/terms" class="underline underline-offset-4 hover:text-primary">
        Terms of Service
      </a>
      and
      <a
        href="/privacy"
        class="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </a>
      .
    </p>
  </div>
</template>
