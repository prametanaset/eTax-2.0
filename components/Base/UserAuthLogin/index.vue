<template>
  <!-- Wrapper กึ่งกลางแนวตั้ง–แนวนอน และให้ background จางๆ -->
  <div class="min-h-screen flex items-center justify-center p-4">
    <!-- Card container -->
    <div class="w-full max-w-sm">
      <div class="grid gap-6">
        <div class="flex flex-col spm,,,,,,,,,,zhbnace-y-5 text-center">
          <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">
            ขอต้อนรับกลับมา
          </h1>
        </div>

        <form @submit.prevent="onLogin" class="grid gap-3 sm:gap-4">
          <FormField name="email" v-slot="{ field }">
            <FormItem>
              <FormLabel>อีเมลผู้ใช้งาน</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="text"
                  placeholder="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
                  class="w-full placeholder:font-normal h-10 sm:h-12 bg-[hsl(var(--card))] invalid:border-red-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="password" v-slot="{ field }">
    <FormItem>
      <FormLabel>รหัสผ่าน</FormLabel>
      <FormControl>
        <div class="relative">
          <Input
            v-bind="field"
            :type="showPassword ? 'text' : 'password'"
            placeholder="รหัสผ่าน"
            class="w-full pr-10 placeholder:font-normal h-10 sm:h-12 bg-[hsl(var(--card))] invalid:border-red-500"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
            tabindex="-1"
          >
            <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

          <span v-if="errorLogin" class="text-red-500 text-sm">
            หมายเลขโทรศัพท์ ชื่อผู้ใช้ อีเมล หรือรหัสผ่าน ไม่ถูกต้อง
          </span>

          <Button
            type="submit"
            class="w-full py-3 text-md sm:text-lg font-semibold bg-primary-500"
          >
            <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            เข้าสู่ระบบ
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Loader, Eye, EyeOff  } from "lucide-vue-next";

const { signIn } = useAuth();
const errorLogin = ref(false);
const isLoading = ref(false);
const showPassword = ref(false)

// ปรับ schema ให้ใช้ nonempty() พร้อมข้อความ
const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "ต้องระบุอีเมล" })
      .nonempty({ message: "กรุณากรอกอีเมลผู้ใช้งาน" }),
    // .email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
    password: z
      .string({ required_error: "ต้องระบุรหัสผ่าน" })
      .nonempty({ message: "กรุณากรอกรหัสผ่าน" })
      .min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onLogin = form.handleSubmit(async (values) => {
  errorLogin.value = false;
  isLoading.value = true;
  const result = await signIn("credentials", {
    username: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: "/dashboard",
  });

  if (result?.error) {
    errorLogin.value = true;
  } else if (result?.url) {
    navigateTo("/dashboard");
  }
  isLoading.value = false;
});
</script>

<style scoped>
.font-ibm {
  font-family: "Noto Sans Thai";
}
</style>
