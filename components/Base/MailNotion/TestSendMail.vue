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

const { sendMail, createLabel } = useGmailService();

const mailStore = useMailStore();

const to = ref("taksin.cup@gmail.com");
const subject = ref("ทดสอบส่งเมล");
const body = ref("ทดสอบข้อความ");
const message = ref("");
const error = ref("");
const loading = ref(false);

const buildHtmlBody = (content: string) => {
  return `
    <div style="max-width:600px;margin:40px auto;background-color:#ffffff;padding:30px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);font-family:sans-serif;">
      <div style="text-align:center;padding-bottom:20px;">
        <h1 style="margin:0;font-size:24px;color:#af38ff;">${content}</h1>
      </div>
      <div style="text-align:center;font-size:16px;color:#555555;">
        <p>ทดสอบ</p>
      </div>
      <div style="margin-top:30px;font-size:13px;color:#999999;text-align:center;">
        <p>&copy; 2025 sunscaleup Ltd. All rights reserved.</p>
      </div>
    </div>
  `;
};

const handleSend = async () => {
  loading.value = true;
  message.value = "";
  error.value = "";

  const labels = mailStore.labelID;
  try {
    await sendMail(to.value, subject.value, buildHtmlBody(body.value), labels);
    message.value = "ส่งอีเมลสำเร็จแล้ว";
  } catch (err: any) {
    error.value = "ส่งไม่สำเร็จ: " + err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await createLabel("etax");
});
</script>

<style scoped></style>
