<template>
  <div
    class="relative flex flex-col items-center justify-center h-screen w-full px-4"
  >
    <div class="absolute gradients-container w-screen h-screen z-1">
      <div class="g1"></div>
      <div class="g2"></div>
      <div class="g3"></div>
      <div class="g4"></div>
      <div class="g5"></div>
    </div>
    <div class="mb-6">
      <Mail class="text-primary-500 w-[5rem] h-[5rem]" />
    </div>

    <h1 class="text-xl font-semibold mb-2 text-center">ยินดีต้อนรับสู่เมล</h1>

    <Button
      variant="outline"
      type="button"
      class="py-2 sm:py-3 text-sm sm:text-sm rounded-full relative z-10"
      @click="handleLogin"
    >
      <NuxtImg
        src="/logo/google-logo.png"
        alt="Google logo"
        width="16"
        height="16"
        class="mr-2 h-4 w-4"
      />
      เชื่อมต่อกับ Google
    </Button>

    <p class="text-xs text-gray-500 mt-6 max-w-xs text-center">
      การคลิก "เชื่อมต่อกับ Google" ด้านบน
      ถือว่าคุณรับทราบว่าคุณได้อ่านและเข้าใจ
      และยอมรับข้อกำหนดและเงื่อนไขของเราและนโยบายความเป็นส่วนตัวที่เกี่ยวข้องกับการใช้งาน
      e-Tax Mail ของคุณ
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Mail } from "lucide-vue-next";
const { signIn, data } = useAuth();

const handleLogin = async () => {
  await signIn("google");
};
</script>

<style scoped></style>
