<template>
  <div
    class="d-flex justify-center align-center flex-column error-background"
    style="
      color: #182230;
      position: absolute;
      top: 5%;
      left: 0;
      right: 0;
      bottom: 0;
    "
  >
    <div class="ma-0">
      <div>
        <h3 class="text-center">ขออภัย ไม่พบหน้าที่คุณต้องการ</h3>
        <h5 class="text-center">
          กรุณาตรวจสอบลิงก์อีกครั้ง หรือกลับไปที่หน้าหลักของเว็บไซต์
        </h5>
      </div>
      <div class="mt-8">
        <!-- <v-btn flat class="rounded-xl w-100 text-subtitle-1" color="#EF0081">
          <v-icon class="mr-1">mdi-arrow-left</v-icon>
          <p>กลับสู่หน้าหลัก</p>
        </v-btn> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps({
//   error: Object,
// });

const handleError = () => {
  console.log("clear error");
  clearError({ redirect: "/" });
};
</script>
