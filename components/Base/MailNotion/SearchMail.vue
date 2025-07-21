<template>
  <div>
    <Popover>
      <PopoverTrigger class="w-full">
        <!-- input -->
        <div class="relative w-full max-w-sm items-center pt-1 pb-2">
          <Input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาเมล..."
            class="pl-10 bg-[hsl(var(--card))]"
            @input="onSearch"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6" />
          </span>
          <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
          >
            <X
              v-if="searchQuery"
              class="size-5 text-muted-foreground cursor-pointer"
              @click="searchQuery = ''"
            />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent class="p-0 bg-transparent border-0">
        <!-- search results -->
        <Card
          v-if="searchQuery && filteredMails.length > 0"
          class="w-[30rem] max-h-[50dvh] overflow-y-auto bg-[hsl(var(--card))] p-2 text-start text-muted-foreground shadow-md custom-scroll"
        >
          <div
            v-for="(mail, index) in filteredMails"
            :key="mail.id"
            :class="[
              'p-2 dark:hover:bg-muted-700 hover:bg-muted-300 cursor-pointer',
              index !== filteredMails.length - 1 ? 'border-b' : '',
            ]"
            @click="mailStore.setSelectMail(mail)"
          >
            <div class="font-semibold">
              {{ mail.from }}
            </div>
            <div class="text-sm">ถึง : {{ mail.to }}</div>
            <div class="text-sm text-muted-foreground line-clamp-1">
              {{ mail.subject }}
            </div>
          </div>
        </Card>

        <Card
          v-else-if="searchQuery && !loading"
          class="w-[30rem] bg-[hsl(var(--card))] p-2 text-center text-muted-foreground shadow-md"
        >
          ไม่พบเมลที่ตรงกับ "{{ searchQuery }}"
        </Card>

        <Card
          v-else-if="loading"
          class="w-[30rem] bg-[hsl(var(--card))] p-2 text-center shadow-md"
        >
          กำลังค้นหา...
        </Card></PopoverContent
      >
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-vue-next";
import { useDebounceFn } from "@vueuse/core";

const mailStore = useMailStore();
const profileStore = useProfileStore();
const { listMessages } = useGmailService();

const searchQuery = ref("");
const filteredMails = ref<typeof mailStore.mailList.data>([]);
const loading = ref(false);

const onSearch = useDebounceFn(async () => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    filteredMails.value = [];
    return;
  }

  // ค้นหาในเมลที่โหลดไว้แล้วจาก store
  const localMatch = mailStore.mailList.data.filter(
    (mail) =>
      mail.subject.toLowerCase()?.includes(query) ||
      mail.from.toLowerCase()?.includes(query)
  );

  if (localMatch.length > 0) {
    filteredMails.value = localMatch;
    return;
  }

  // ถ้าไม่เจอใน local -> ดึงจาก backend
  loading.value = true;
  try {
    const fetchQuery = `from:${profileStore.user?.username} OR from:csemail@etax.teda.th ${query}`;
    const max = 5;
    const remote = await listMessages(fetchQuery, max); // สร้าง method นี้ใน store
    filteredMails.value = remote.data;
  } finally {
    loading.value = false;
  }
}, 400);
</script>
