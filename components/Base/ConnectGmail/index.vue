<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGmailService } from "@/composables/useGmailService"; // เปลี่ยน path ให้ตรง

const { data: session, status, signIn } = useAuth();

const emails = ref<any[]>([]);
const loading = ref(false);
const nextPageToken = ref<string | null>(null);

const { listMessages, getMessage } = useGmailService();

const fetchEmails = async () => {
  if (loading.value) return;
  loading.value = true;

  const { data, nextPageToken: token } = await listMessages(
    10,
    nextPageToken.value || undefined
  );
  emails.value.push(...data);
  nextPageToken.value = token || null;

  loading.value = false;
};

// โหลดรอบแรก
onMounted(() => {
  if (session.value?.googleAccessToken) fetchEmails();
});

// สังเกต scroll ถึงล่างสุด
const onScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 100) {
    if (nextPageToken.value) fetchEmails();
  }
};

const handleLogin = async () => {
  await signIn("google");
};
</script>

<template>
  <div>
    <Button
      v-if="!session?.googleAccessToken"
      variant="outline"
      type="button"
      class="w-full py-2 sm:py-3 text-sm sm:text-sm rounded-full"
      @click="handleLogin"
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

    <div v-else>
      <div
        class="h-[600px] overflow-y-auto border rounded p-4"
        @scroll="onScroll"
      >
        <ul>
          <li
            v-for="email in emails"
            :key="email.id"
            class="mb-4 border-b pb-2"
          >
            <div><strong>From:</strong> {{ email.from }}</div>
            <div><strong>Subject:</strong> {{ email.subject }}</div>
            <div><strong>Date:</strong> {{ email.date }}</div>
            <div class="text-gray-500">{{ email.snippet }}</div>
          </li>
        </ul>

        <div v-if="loading" class="text-center py-2">กำลังโหลด...</div>
      </div>
    </div>
  </div>
</template>
