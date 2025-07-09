<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <div class="grid gap-6">
        <!-- Header -->
        <div class="flex flex-col space-y-2 text-center" :class="resetPasswordSuccess? 'gap-1 mb-2':''">
          <div v-if="resetPasswordSuccess" class="flex justify-center">
            <div v-if="resetPasswordSuccess" class="flex justify-center mb-8">
              <LottiePlayer
                  ref="lottieRef"
                  :animationData="checkMark"
                  :loop="false"
                  class="scale-[4]"
                />
            </div>
          </div>
          <h1
            class="text-2xl sm:text-3xl font-semibold tracking-tight"
            style="white-space: pre-line"
          >
            {{
              showOtpField
                ? "ตรวจสอบกล่องข้อความ\nของคุณ"
                : showPasswordField
                ? "รีเซ็ตรหัสผ่านของคุณ"
                : resetPasswordSuccess
                ? "เปลี่ยนรหัสผ่านแล้ว"
                : "รีเซ็ตรหัสผ่าน"
            }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{
              showOtpField
                ? "กรอกรหัสการตรวจสอบยืนยันที่เราเพิ่งส่งไปให้คุณที่\n" +
                  authForm.email
                : showPasswordField
                ? "ป้อนรหัสผ่านใหม่ด้านล่างเพื่อเปลี่ยนรหัสผ่านของคุณ"
                : resetPasswordSuccess
                ? "เปลี่ยนรหัสผ่านของคุณเรียบร้อยแล้ว"
                : `คลิก "ดำเนินการต่อ" เพื่อรีเซ็ตรหัสผ่านของคุณ\n`
            }}
          </p>
        </div>

        <!-- Form -->
        <form
          v-if="hasMounted"
          @submit.prevent="onFormSubmit"
          class="grid gap-5 sm:gap-5"
        >
          <!-- Email -->
          <FormField v-if="showEmailField" name="email" v-slot="{ field }">
            <FormItem>
              <FormLabel>ที่อยู่อีเมล</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="email"
                  name="email"
                  autocomplete="username"
                  placeholder="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
                  hidden
                  aria-hidden="true"
                  class="w-full h-10 sm:h-12 placeholder:font-normal bg-[hsl(var(--card))] invalid:border-red-500 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- OTP -->
          <FormField
            v-if="showOtpField"
            name="pin"
            v-slot="{ componentField, value }"
          >
            <FormItem class="flex flex-col items-center">
              <BaseOtpInput
                :model-value="value"
                :length="OTP_LENGTH"
                id="pin-input"
                :name="componentField.name"
                @update:model-value="(arr: string[] | undefined) => form.setFieldValue('pin', arr)"
                @complete="handleComplete"
              />
              <FormMessage class="ml-8 self-start w-full text-left" />
            </FormItem>
          </FormField>

          <!-- Password -->
          <FormField
            v-if="showPasswordField"
            name="password"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>ตั้งรหัสผ่าน</FormLabel>
              <FormControl>
                <div class="relative">
                  <Input
                    ref="passwordInput"
                    v-bind="field"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    placeholder="รหัสผ่าน"
                    hidden
                    class="w-full pr-10 h-10 sm:h-12 placeholder:font-normal bg-[hsl(var(--card))] invalid:border-red-500 rounded-lg"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition ring-0"
                    tabindex="-1"
                  >
                    <component
                      :is="showPassword ? EyeOff : Eye"
                      class="w-5 h-5 text-gray-500"
                    />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Confirm Password -->
          <FormField
            v-if="showPasswordField && isPasswordValid"
            name="confirmPassword"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
              <FormControl>
                <div class="relative">
                  <Input
                    v-bind="field"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="ยืนยันรหัสผ่าน"
                    autocomplete="new-password"
                    class="w-full pr-10 h-10 sm:h-12 placeholder:font-normal bg-[hsl(var(--card))] invalid:border-red-500 rounded-lg"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition ring-0"
                    tabindex="-1"
                  >
                    <component
                      :is="showConfirmPassword ? EyeOff : Eye"
                      class="w-5 h-5 text-gray-500"
                    />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Password Rules -->
          <Alert v-if="showPasswordField" class="mt-3">
            <AlertTitle class="text-sm">รหัสผ่านของคุณต้องมี:</AlertTitle>
            <AlertDescription class="mt-2 space-y-2">
              <div
                class="flex items-center space-x-2"
                :class="
                  passwordRules.minLength ? 'text-green-600' : 'text-gray-500'
                "
              >
                <component
                  :is="passwordRules.minLength ? CheckCircle : Dot"
                  class="w-4 h-4"
                />
                <span>มีอย่างน้อย 8 ตัวอักษร</span>
              </div>

              <div
                class="flex items-center space-x-2"
                :class="
                  passwordRules.hasUpper ? 'text-green-600' : 'text-gray-500'
                "
              >
                <component
                  :is="passwordRules.hasUpper ? CheckCircle : Dot"
                  class="w-4 h-4"
                />
                <span>มีตัวอักษรพิมพ์ใหญ่ (A-Z)</span>
              </div>

              <div
                class="flex items-center space-x-2"
                :class="
                  passwordRules.hasLower ? 'text-green-600' : 'text-gray-500'
                "
              >
                <component
                  :is="passwordRules.hasLower ? CheckCircle : Dot"
                  class="w-4 h-4"
                />
                <span>มีตัวอักษรพิมพ์เล็ก (a-z)</span>
              </div>

              <div
                class="flex items-center space-x-2"
                :class="
                  passwordRules.hasNumberOrSymbol
                    ? 'text-green-600'
                    : 'text-gray-500'
                "
              >
                <component
                  :is="passwordRules.hasNumberOrSymbol ? CheckCircle : Dot"
                  class="w-4 h-4"
                />
                <span>มีตัวเลขหรืออักขระพิเศษ เช่น 0-9, !@#$</span>
              </div>
            </AlertDescription>
          </Alert>

          <!-- Buttons -->
          <div class="flex flex-col items-center">
            <Button
              type="submit"
              :disabled="isLoading || (showPasswordField &&
                  (!isPasswordValid ||
                    form.values.password !== form.values.confirmPassword)) || isOtpIncomplete"
              class="py-2 sm:py-5 text-sm sm:text-base font-semibold bg-primary-500 rounded-full"
              :class="showOtpField || resetPasswordSuccess ? 'w-72' : 'w-full'"
            >
              <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{
                showOtpField
                  ? "ยืนยัน OTP"
                  : showPasswordField
                  ? "ดำเนินการต่อ"
                  : resetPasswordSuccess
                  ? "ลงชื่อเข้าใช้งาน"
                  : "ดำเนินการต่อ"
              }}
            </Button>
          </div>
          <div v-if="showOtpField" class="text-center text-sm mt-2">
            <p v-if="isCountingDown" class="text-muted-foreground">
              ส่งอีกครั้งได้ใน ({{ countdown }} วินาที)
            </p>
            <Button
              v-else
              variant="link"
              type="button"
              :disabled="isLoading"
              @click="onSendOtpCode"
              class="p-0 h-auto text-black"
            >
              ส่งอีเมลซ้ำ
            </Button>
          </div>

          <div v-if="showEmailField" class="text-center text-sm">
            <Button
              variant="link"
              type="button"
              :disabled="isLoading"
              @click.prevent="goToLogin"
              class="p-0 h-auto text-black"
            >
              กลับไปที่ลงชื่อเข้าใช้
            </Button>
          </div>
        </form>

        <!-- Terms -->
        <ClientOnly>
          <p
            class="flex h-5 justify-center w-full space-x-4 mt-8 px-2 text-center text-xs sm:text-sm text-muted-foreground"
          >
            <a
              href="/terms"
              class="underline underline-offset-4 hover:text-primary"
              >เงื่อนไขการใช้งาน</a
            >
            <Separator orientation="vertical" />
            <a
              href="/privacy"
              class="underline underline-offset-4 hover:text-primary"
              >นโยบายความเป็นส่วนตัว</a
            >
          </p>
        </ClientOnly>
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Loader, CheckCircle, Dot, EyeOff, Eye } from "lucide-vue-next";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";
import checkMark from "@/assets/lotties/Animation-CheckMark.json";

const { toast } = useToast();

const hasMounted = ref(false);
onMounted(() => {
  hasMounted.value = true;
});

const OTP_LENGTH = 6;
const authForm = useResetPasswordStore();
const toggleStore = useToggleResetPasswordStores();

const isLoading = ref(false);
const showEmailField = ref(true);
const showPasswordField = ref(false);
const showOtpField = ref(false);
const resetPasswordSuccess = ref(false);
const isCountingDown = ref(false);
const countdown = ref(0);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errorOtpVerify = ref(false);
const errorOtpStatusCode = ref<number | null>(null);
const lottieRef = ref<any>(null);

let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  
});
const formSchema = computed(() => {
  // --- Schema for the Password Step ---
  if (showPasswordField.value) {
    return toTypedSchema(
      z
        .object({
          email: z.string().optional(), // Email is present but not validated on this step
          password: z.string({ required_error: "กรุณากรอกรหัสผ่าน" }),
          confirmPassword: z.string({ required_error: "กรุณายืนยันรหัสผ่าน" }),
          pin: z.array(z.string()).optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "รหัสผ่านไม่ตรงกัน",
          path: ["confirmPassword"], // Apply error to the 'confirmPassword' field
        })
    );
  }
  // --- Schema for the OTP Step ---
  if (showOtpField.value) {
    return toTypedSchema(
      z.object({
        email: z.string().optional(),
        pin: z
          .array(z.string())
          .refine((val) => val && val.length === OTP_LENGTH, {
            message: `ต้องกรอกรหัส ${OTP_LENGTH} หลัก`,
          }),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
      })
    );
  }
  // --- Schema for the Email Step (Default) ---
  return toTypedSchema(
    z.object({
      email: z
        .string({ required_error: "ต้องระบุอีเมล" })
        .email("รูปแบบอีเมลไม่ถูกต้อง"),
      pin: z.array(z.string()).optional(),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
  );
});

const form = useForm({
  validationSchema: formSchema,
});

const onFormSubmit = () => {
  if (showOtpField.value) {
    return onVerifyOtp();
  }
  if (showPasswordField.value) {
    return onResetPassword();
  } 

  if (resetPasswordSuccess.value) {
    return goToLogin();
  }
  return onCheckMail();
};

async function onCheckMail() {
  const { valid } = await form.validate();
  if (!valid) return;

  isLoading.value = true;
  try {
    const response = await useUserService().checkEmail({ username: authForm.email });

    if (response.data.taken === true) {
      await onSendOtpCode();
      showEmailField.value = false;
      showOtpField.value = true;
      await startCountdown();
    } else {
      form.setFieldError('email', 'ไม่พบที่อยู่อีเมลนี้ในระบบ');
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    form.setFieldError('email', 'เกิดข้อผิดพลาดบางอย่าง โปรดลองอีกครั้ง');

  } finally {
    isLoading.value = false;
  }
}

async function onResetPassword() {
  isLoading.value = true;
  try {
    const { data } = await useUserService().resetPassword({
      reset_token: authForm.resetToken,
      new_password: authForm.password
    })

    if (
      !data ||
      (typeof data === "object" && "error" in data && data.error)
    ) {
      throw new Error(data?.error || "การรีเซตล้มเหลว");
    }

    toast({
      title: "รีเซ็ตรหัสผ่านสำเร็จ",
      description: "ดำเนินการต่อไปได้",
    });

    showPasswordField.value = false;
    resetPasswordSuccess.value = true;
  } finally {
    isLoading.value = false;
  }

  return;
}

async function goToLogin() {
  console.log("reset password");
  // resetPasswordSuccess.value = false;
  // showEmailField.value = true;
  toggleStore.resetPassword = false;
  toggleStore.isLogin = true;
  return;
}

async function onVerifyOtp() {
  isLoading.value = true;
  try {
    const { data } = await useUseOtpService().verifyOtp({
      email: authForm.email,
      ref: authForm.refCode,
      code: authForm.otpValue.join(""),
      purpose: "reset_password",
    });

    if (!data?.reset_token) {
      throw new Error("ไม่พบข้อมูลอ้างอิง (token) จากระบบ");
    } else {
      authForm.resetToken = data.reset_token;
    }

    toast({
      title: "ยืนยัน OTP สำเร็จ",
      description: "ดำเนินการต่อไปได้",
    });

    showOtpField.value = false;
    showPasswordField.value = true;
    console.log('showPasswordField =', showPasswordField.value);
  }  catch (err: any) {
    console.error("ยืนยัน OTP ล้มเหลว:", err);

    const status = err?.response?.status;
    errorOtpStatusCode.value = status; // << เก็บไว้ตรงนี้

    const message =
      err?.response?.data?.message ||
      err.message ||
      "เกิดข้อผิดพลาดขณะยืนยัน OTP";

    toast({
      title: "ไม่สามารถยืนยัน OTP ได้",
      description: message,
      variant: "destructive",
    });

    throw err;
  } finally {
    isLoading.value = false;
  }
  
  return;
}

async function onSendOtpCode() {
  if (isCountingDown.value) return;

  isLoading.value = true;

  try {
    const { data } = await useUseOtpService().sendOtp({
      email: authForm.email,
      purpose: "reset_password",
    });
    console.log(data)
    if (!data?.ref) {
      throw new Error("ไม่พบข้อมูลอ้างอิง (ref) จากระบบ");
    }

    authForm.refCode = data.ref;

    toast({
      title: "ส่งรหัส OTP สำเร็จ",
      description: `รหัสถูกส่งไปยัง ${authForm.email} แล้ว`,
    });

    // เริ่มนับถอยหลังเมื่อส่งสำเร็จ
    await startCountdown();
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "เกิดข้อผิดพลาดขณะส่งรหัส OTP";

    toast({
      title: "ไม่สามารถส่งรหัส OTP ได้",
      description: message,
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
}

const isOtpIncomplete = computed(() => {
  return showOtpField.value && authForm.otpValue.join("").length !== OTP_LENGTH;
});


const otpErrorMessage = computed(() => {
  if (errorOtpStatusCode.value === 423) {
    return "OTP เกินจำนวนครั้ง กรุณากดส่งอีเมลซ้ำ";
  }

  if (errorOtpVerify.value) {
    return "OTP ไม่ถูกต้อง";
  }

  const len = OTP_LENGTH;
  const currentLength = authForm.otpValue?.join("")?.length || 0;

  if (currentLength < len) {
    return len === 6 ? "OTP ต้องมีหกหลัก" : `OTP ต้องมี ${len} หลัก`;
  }

  return "";
});

const startCountdown = async () => {
  if (timer) clearInterval(timer);
  isCountingDown.value = true;
  countdown.value = 60;

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      isCountingDown.value = false;
      clearInterval(timer!);
    }
  }, 1000);
};

function handleComplete(arr: string[]) {
  authForm.otpValue = arr;
  form.setFieldValue("pin", arr);
}

const passwordRules = computed(() => {
  const value = form.values.password || "";
  return {
    minLength: value.length >= 8,
    hasUpper: /[A-Z]/.test(value),
    hasLower: /[a-z]/.test(value),
    hasNumberOrSymbol: /[0-9!@#$%^&*]/.test(value),
  };
});

const isPasswordValid = computed(() => {
  const r = passwordRules.value;
  return r.minLength && r.hasUpper && r.hasLower && r.hasNumberOrSymbol;
});

watch(
  () => form.values.email,
  (val) => {
    if (showEmailField.value && val) {
      authForm.email = val;
    }
  }
);

watch(
  () => form.values.password,
  (val) => {
    if (showPasswordField.value && val) {
      authForm.password = val;
    }
  }
);

watch(resetPasswordSuccess, async (val) => {
  if (val) {
    await nextTick(); // รอให้ DOM render ก่อน
    lottieRef.value?.play(); // เรียก play()
  }
});
</script>

<style></style>
