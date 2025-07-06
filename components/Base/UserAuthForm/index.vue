<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <div class="grid gap-6">
        <!-- Header -->
        <div class="flex flex-col space-y-2 text-center">
          <h1
            class="text-2xl sm:text-3xl font-semibold tracking-tight"
            style="white-space: pre-line"
          >
            {{
              showOtpField
                ? "ตรวจสอบกล่องข้อความ\nของคุณ"
                : showPasswordField
                ? "สร้างบัญชีของคุณ"
                : "สร้างบัญชี"
            }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{
              showOtpField
                ? "กรอกรหัสการตรวจสอบยืนยันที่เราเพิ่งส่งไปให้คุณที่\n" +
                  authForm.email
                : showPasswordField
                ? "ตั้งค่ารหัสผ่านของคุณสำหรับ ScaleTax เพื่อดำเนินการต่อ"
                : "เริ่มต้นใช้ TaxHub ของคุณ"
            }}
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="onFormSubmit" class="grid gap-5 sm:gap-5">
          <!-- Email -->
          <FormField v-if="!showOtpField" name="email" v-slot="{ field }">
            <FormItem>
              <FormLabel>ที่อยู่อีเมล</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="text"
                  placeholder="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
                  class="w-full h-10 sm:h-12 placeholder:font-normal bg-[hsl(var(--card))] invalid:border-red-500 rounded-lg"
                />
              </FormControl>
              <FormDescription v-if="errorCheckMail" class="text-red-500">
                อีเมลนี้มีอยู่แล้ว
              </FormDescription>
              <FormMessage />
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
                    placeholder="รหัสผ่าน"
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
            <!-- Password Rules -->
            <Alert class="mt-3">
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
              <FormMessage v-if="errorOtpVerify" class="self-start w-full text-left"/>
            </FormItem>
          </FormField>

          <!-- Buttons -->
          <Button
            type="submit"
            :disabled="
              isLoading ||
              (showPasswordField && !isPasswordValid) ||
              isOtpIncomplete
            "
            class="w-full py-2 sm:py-5 text-sm sm:text-base font-semibold bg-primary-500 rounded-full"
          >
            <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{
              showOtpField
                ? "ยืนยัน OTP"
                : showPasswordField
                ? "ดำเนินการต่อ"
                : "ดำเนินการต่อ"
            }}
          </Button>

          <div v-if="showOtpField" class="text-center text-sm mt-2">
            <p v-if="isCountingDown" class="text-muted-foreground">
              ส่งอีกครั้งได้ใน ({{ countdown }} วินาที)
            </p>
            <Button
              v-else
              variant="link"
              type="button"
              :disabled="isLoading"
              @click.prevent="onSendOtpCode"
              class="p-0 h-auto"
            >
              <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              ส่งอีเมลซ้ำ
            </Button>
          </div>
        </form>

        <!-- Divider & Social Login -->
        <div v-if="!showPasswordField && !showOtpField">
          <div class="relative my-5">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-muted-foreground"> หรือ </span>
            </div>
          </div>

          <client-only>
            <Button
              variant="outline"
              type="button"
              :disabled="isLoading"
              class="w-full py-2 sm:py-3 text-sm sm:text-base rounded-full"
            >
              <Github class="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </client-only>
        </div>

        <!-- Terms -->
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
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Github, Loader, CheckCircle, Dot, Eye, EyeOff } from "lucide-vue-next";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const OTP_LENGTH = 6;

const authForm = useRegisterFormStore();
const { email, password, otpValue } = authForm;

const isLoading = ref(false);
const errorCheckMail = ref(false);
const errorOtpVerify = ref(false);
const errorOtpStatusCode = ref<number | null>(null);
const showPassword = ref(false);

const showPasswordField = ref(false);
const showOtpField = ref(false);
const passwordInput = ref<any>(null);
const countdown = ref(0);
const isCountingDown = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const startCountdown = () => {
  isCountingDown.value = true;
  countdown.value = 60;

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      isCountingDown.value = false;
      if (timer) clearInterval(timer);
    }
  }, 1000);
};

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
const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "ต้องระบุอีเมล" })
      .min(1, "กรุณากรอกอีเมล"),
    password: z.string().optional(),
    // .refine(
    //   (val) => {
    //     if (showPasswordField.value) return val && val.length >= 6;
    //     return true;
    //   },
    //   { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัว" }
    // )
    pin: z
      .array(z.string())
      .optional()
      .refine(
        (val) => {
          if (showOtpField.value) return val && val.length === OTP_LENGTH;
          return true;
        },
        // { message: otpErrorMessage.value }
      ),
  })
);
const passwordRules = computed(() => {
  const value = form.values.password || "";
  return {
    minLength: value.length >= 8,
    hasUpper: /[A-Z]/.test(value),
    hasLower: /[a-z]/.test(value),
    hasNumberOrSymbol: /[0-9!@#$%^&*]/.test(value),
  };
});

const form = useForm({ validationSchema: formSchema });

const onFormSubmit = () => {
  if (showOtpField.value) {
    return onRegister();
  }
  if (showPasswordField.value) {
    return onSendOtpCode();
  }
  return onCheckMail();
};

const onCheckMail = form.handleSubmit(async ({ email: e }) => {
  isLoading.value = true;
  try {
    const { data } = await useUserService().checkEmail({ username: e });
    errorCheckMail.value = data.taken;
    showPasswordField.value = !data.taken;
    if (!data.taken) authForm.email = e;
  } finally {
    isLoading.value = false;
  }
});

async function onRegister() {
  const isValid = await form.validate();
  if (!isValid) return;
  errorOtpVerify.value = false;
  isLoading.value = true;
  try {
    await onOtpVerify();

    await useUserService().register({
      username: authForm.email,
      password: authForm.password,
    });

    const { signIn } = useAuth();
    const result = await signIn("credentials", {
      username: authForm.email,
      password: authForm.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (
      !result ||
      (typeof result === "object" && "error" in result && result.error)
    ) {
      throw new Error(result?.error || "การเข้าสู่ระบบล้มเหลว");
    } else {
      navigateTo("/dashboard");
    }
  } catch (err: any) {
    console.error("เกิดข้อผิดพลาดในการสมัคร:", err);

    const statusCode = err?.status;
    const message =
      err?.response?.data?.message ||
      err.message ||
      "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";

    // เช็คสถานะ HTTP code
    if (statusCode === 400) {
      // ตัวอย่าง: OTP ไม่ถูกต้อง

      errorOtpVerify.value = true;
      toast({
        title: "ข้อมูลไม่ถูกต้อง",
        description: message,
        variant: "destructive",
      });
    } else if (statusCode === 409) {
      // ตัวอย่าง: ผู้ใช้งานซ้ำ
      toast({
        title: "บัญชีมีอยู่แล้ว",
        description: message,
        variant: "destructive",
      });
    } else if (statusCode === 423) {
      // ตัวอย่าง: ผู้ใช้งานซ้ำ
      toast({
        title: "ยืนยันล้มเหลว",
        description: "เกินจำนวนครั้งที่กำหนด กรุณากดส่งอีเมลซำ",
        variant: "destructive",
      });
    } else {
      toast({
        title: "การสมัครล้มเหลว",
        description: message,
        variant: "destructive",
      });
    }
  } finally {
    isLoading.value = false;
  }
}

async function onSendOtpCode() {
  // เพิ่มการตรวจสอบว่ากำลังนับถอยหลังอยู่หรือไม่
  if (isCountingDown.value) return;

  isLoading.value = true; // แสดง loading ขณะส่ง
  try {
    const response = await useUseOtpService().sendOtp({
      email: authForm.email,
    });
    authForm.refCode = response.data.ref;

    // เมื่อส่ง OTP สำเร็จ
    toast({
      title: "ส่งรหัส OTP สำเร็จ",
      description: `รหัสถูกส่งไปยัง ${authForm.email} แล้ว`,
    });

    showPasswordField.value = false;
    showOtpField.value = true;
    startCountdown(); // << เรียกใช้ฟังก์ชันนับถอยหลังที่นี่
  } catch (err: any) {
    console.error("ส่งรหัส OTP ล้มเหลว:", err);
    const message =
      err?.response?.data?.message ||
      err.message ||
      "เกิดข้อผิดพลาดขณะส่งรหัส OTP";

    toast({
      title: "ไม่สามารถส่งรหัส OTP ได้",
      description: message,
      variant: "destructive",
    });

    // ไม่ต้องซ่อนฟิลด์ในกรณีที่ส่งไม่สำเร็จ เพื่อให้ผู้ใช้ลองใหม่ได้
    // showOtpField.value = false;
    // showPasswordField.value = false;
  } finally {
    isLoading.value = false;
  }
}

function handleComplete(arr: string[]) {
  authForm.otpValue = arr;
  form.setFieldValue("pin", arr);
}

async function onOtpVerify() {
  const code = authForm.otpValue.join("");

  if (code.length !== OTP_LENGTH) return;

  try {
    const { verifyOtp } = useUseOtpService();

    const payload = {
      email: authForm.email,
      code,
      ref: authForm.refCode,
    };

    const response = await verifyOtp(payload);

    // ตรวจสอบว่า OTP สำเร็จหรือไม่ (ถ้ามี field success หรือ status ก็ตรวจเพิ่มได้)
    toast({
      title: "ยืนยัน OTP สำเร็จ",
      description: "ดำเนินการต่อไปได้",
    });

    return true;
  } catch (err: any) {
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
  }
}

const isPasswordValid = computed(() => {
  const r = passwordRules.value;
  return r.minLength && r.hasUpper && r.hasLower && r.hasNumberOrSymbol;
});

const isOtpIncomplete = computed(() => {
  return showOtpField.value && authForm.otpValue.join("").length !== OTP_LENGTH;
});

watch(showOtpField, (val) => {
  if (!val) {
    authForm.otpValue = Array(OTP_LENGTH).fill("");
    errorOtpVerify.value = false;
    errorOtpStatusCode.value = null;
  }
});

watch(
  () => form.meta.value.valid,
  (isValid) => {
    if (errorCheckMail.value) errorCheckMail.value = isValid;
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

watch(showPasswordField, async (newVal) => {
  if (newVal) await nextTick(() => passwordInput.value?.$el?.focus?.());
});
</script>

<style scoped>
.font-poppins {
  font-family: Poppins;
}
</style>
