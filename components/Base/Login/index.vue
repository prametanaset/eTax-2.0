<script setup lang="ts">
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const isLogin = ref(true);
</script>

<template>
  <div
    class="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="absolute right-4 top-4 md:right-8 md:top-8 flex items-center">
      <!-- ✅ ปุ่มที่คลิกได้ -->
       <p class="text-sm text-muted-foreground">
      {{ isLogin ? "ยังไม่มีบัญชีใช่ไหม?" : "มีบัญชีอยู่แล้ว?" }}
    </p>
    <Button
      variant="link"
      href="#"
      @click.prevent="isLogin = !isLogin"
      :class="
        cn(
          buttonVariants({ variant: 'link' }),
        )
      "
      class="pl-1"
    >
      {{ isLogin ? "สร้างบัญชี" : "เข้าสู่ระบบ" }}
    </Button>

    </div>


    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <ClientOnly>
        <BaseThreeLinesEffect class="absolute inset-0 overflow-hidden" />
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"
        ></div>
      </ClientOnly>
      <div
        class="relative z-20 flex items-center text-lg font-medium font-poppins"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          class="mr-1 h-8 w-8"
          viewBox="0 0 300.000000 300.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
            fill="#ff4200"
            stroke="none"
          >
            <path
              d="M1161 2370 c-155 -165 -292 -312 -304 -327 -20 -26 -22 -36 -17 -132 l5 -103 350 373 c193 205 350 378 350 384 0 7 -23 33 -51 58 l-51 46 -282 -299z"
            />
            <path
              d="M1472 2320 l-73 -80 520 0 521 0 0 80 0 80 -447 0 -448 0 -73 -80z"
            />
            <path
              d="M570 1927 l0 -443 73 -72 c40 -39 76 -72 80 -72 4 0 7 232 7 515 l0 515 -80 0 -80 0 0 -443z"
            />
            <path
              d="M2005 2151 l-79 -6 334 -314 c184 -173 354 -333 378 -355 l43 -41 49 55 c27 30 48 58 47 61 -1 4 -146 142 -322 308 -256 240 -325 300 -345 299 -14 -1 -61 -4 -105 -7z"
            />
            <path
              d="M1400 1861 c-108 -35 -200 -113 -247 -209 -25 -51 -28 -67 -28 -162 0 -99 2 -110 32 -171 142 -288 553 -281 692 11 23 48 26 68 26 160 0 95 -3 111 -28 162 -37 76 -101 139 -178 179 -56 29 -75 33 -154 36 -49 1 -101 -1 -115 -6z m199 -171 c56 -28 107 -93 121 -151 23 -94 -21 -196 -107 -246 -39 -23 -60 -28 -113 -28 -111 0 -193 65 -221 177 -22 93 29 200 120 248 50 26 149 27 200 0z"
            />
            <path
              d="M2270 1176 l0 -516 80 0 80 0 0 443 0 443 -62 60 c-35 33 -71 66 -80 73 -17 13 -18 -13 -18 -503z"
            />
            <path
              d="M266 1499 c-25 -28 -46 -54 -45 -58 1 -11 640 -606 650 -605 5 1 52 2 105 3 53 0 94 5 92 10 -5 12 -740 701 -749 701 -4 0 -28 -23 -53 -51z"
            />
            <path
              d="M1836 796 c-193 -205 -352 -378 -353 -383 -2 -6 20 -32 50 -57 l54 -46 80 82 c44 46 155 164 248 263 93 99 194 207 225 240 l57 60 -6 107 -6 106 -349 -372z"
            />
            <path
              d="M562 643 l3 -78 440 -2 c242 -2 445 1 450 5 6 4 41 40 80 80 l69 72 -522 0 -523 0 3 -77z"
            />
          </g>
        </svg>
        sunscaleup
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;โปรแกรม e-Tax ช่วยให้การออกใบกำกับภาษีรวดเร็ว มืออาชีพ
            และพร้อมส่งให้ลูกค้าได้ทันที ประหยัดทั้งเวลาและลดข้อผิดพลาด&rdquo;
          </p>
          <footer class="text-sm">เอมิ ฟุคะดะ</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <BaseUserAuthLogin v-if="isLogin" />
        <BaseUserAuthForm v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins {
  font-family: Poppins;
}
</style>