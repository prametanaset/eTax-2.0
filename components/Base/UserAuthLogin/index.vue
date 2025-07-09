<template>
  <!-- Wrapper กึ่งกลางแนวตั้ง–แนวนอน และให้ background จางๆ -->
  <div class="min-h-screen flex items-center justify-center p-4">
    <!-- Card container -->
    <div class="w-full max-w-sm">
      <div class="grid gap-6">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">
            ขอต้อนรับกลับมา
          </h1>
          <p class="text-sm text-muted-foreground">
            ออกใบกำกับภาษีง่าย ไม่ต้องใช้ CA พร้อมส่งสรรพากร
          </p>
        </div>

        <form @submit.prevent="onLogin" class="grid gap-3">
          <FormField name="email" v-slot="{ field }">
            <FormItem>
              <FormLabel>อีเมลผู้ใช้งาน</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="text"
                  placeholder="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
                  class="w-full placeholder:font-normal h-10 sm:h-12 bg-[hsl(var(--card))] invalid:border-red-500 rounded-lg"
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
                    class="w-full pr-10 placeholder:font-normal h-10 sm:h-12 bg-[hsl(var(--card))] invalid:border-red-500 rounded-lg"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                    tabindex="-1"
                  >
                    <component
                      :is="showPassword ? EyeOff : Eye"
                      class="w-4 h-4"
                    />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

           <div class="text-right">
              <Button
                variant="link"
                type="button"
                @click="
                  toggleStore.resetPassword = true;
                  toggleStore.isLogin = false;
                "
                class="p-0 -mt-2 text-sm"
              >
                ลืมรหัสผ่านใช่หรือไม่
              </Button>
            </div>



          <Button
            type="submit"
            class="w-full py-3 text-md sm:text-base font-semibold bg-primary-500 rounded-full mt-3"
          >
            <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            เข้าสู่ระบบ
          </Button>
        </form>
        <div>
          <div class="relative mb-5">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-muted-foreground"> หรือ </span>
            </div>
          </div>

          <client-only>
            <div class="flex flex-col gap-3">
              <Button
              variant="outline"
              type="button"
              :disabled="isLoading"
              @click="signInWith('google')"
              class="w-full py-2 sm:py-3 text-sm sm:text-sm rounded-full"
            >
              <NuxtImg
                src="/logo/google-logo.png"
                alt="Google logo"
                width="16"
                height="16"
                class="mr-2 h-4 w-4"
              />
              ดำเนินการต่อด้วย Google 
            </Button>
            <Button
              variant="outline"
              type="button"
              :disabled="isLoading"
              @click="signInWith('github')"
              class="w-full py-2 sm:py-3 text-sm sm:text-sm rounded-full"
            >
              <Github class="mr-2 h-4 w-4" />
              ดำเนินการต่อด้วย Github
            </Button>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Loader, Eye, EyeOff, Github } from "lucide-vue-next";

const { signIn } = useAuth();
const toggleStore = useToggleResetPasswordStores(); 

const errorLogin = ref(false);
const isLoading = ref(false);
const showPassword = ref(false);

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
const { handleSubmit, setErrors } = useForm({
  validationSchema: formSchema,
});

const signInWith = async (provider: "google" | "github") => {
  console.log(`Sign in with ${provider}`);
  await signIn(provider);
};

const onLogin = handleSubmit(async (values) => {
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
    setErrors({
      password: 'ที่อยู่อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    })
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
