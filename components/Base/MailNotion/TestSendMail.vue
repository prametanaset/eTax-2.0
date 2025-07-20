<template>
  <div class="p-4 max-w-md mx-auto space-y-4">
    <h2 class="text-xl font-bold">ทดสอบส่งอีเมล</h2>

    <Input v-model="to" placeholder="ผู้รับ (Email)" />
    <Input v-model="subject" placeholder="หัวเรื่อง" />
    <Textarea v-model="body" placeholder="ข้อความ" />

    <Button :disabled="loading" @click="handleSend">
      {{ loading ? "กำลังส่ง..." : "ส่งอีเมล" }}
    </Button>

    <p v-if="message" class="text-sm text-green-600">{{ message }}</p>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGmailService } from "@/composables/useGmailService"; // ปรับ path ตามโปรเจกต์ของคุณ

const { sendMail } = useGmailService();

const to = ref("taksin.cup@gmail.com");
const subject = ref("ทดสอบส่งเมล");
const body = ref("ทดสอบข้อความ");
const message = ref("");
const error = ref("");
const loading = ref(false);

const handleSend = async () => {
  loading.value = true;
  message.value = "";
  error.value = "";

  try {
    await sendMail(to.value, subject.value, body.value);
    message.value = "ส่งอีเมลสำเร็จแล้ว";
    to.value = subject.value = body.value = "";
  } catch (err: any) {
    error.value = "ส่งไม่สำเร็จ: " + err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
