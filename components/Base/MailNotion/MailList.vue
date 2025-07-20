<script lang="ts" setup>
const { listMessages } = useGmailService();
const { data: session, status, signIn } = useAuth();
import { Dot, Paperclip } from "lucide-vue-next";
import { Skeleton } from "@/components/ui/skeleton";

// defineProps<Mail[]>()

interface Mail {
  id: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
  read: boolean;
  html: string;
  attachments: [];
}

const emails = ref<Mail[]>([]);
const loading = ref(false);
const nextPageToken = computed(() => mailStore.mailList.nextPageToken);
const scrollContainer = ref<HTMLElement | null>(null);
const device = useDevice();
const mailStore = useMailStore();

const fetchInitialEmails = async (targetCount = 40, pageSize = 10) => {
  if (loading.value) return;
  if (mailStore.mailList.data.length === 0) {
    mailStore.mailLoaded = true;
  }

  loading.value = true;

  let token = mailStore.mailList.nextPageToken || undefined;
  let loaded = 0;

  while (loaded < targetCount) {
    const { data, nextPageToken } = await listMessages(
      keyword,
      pageSize,
      token
    );
    mailStore.updateMailList(data, nextPageToken);
    mailStore.mailLoaded = false;

    emails.value = mailStore.mailList.data;

    loaded += data.length;
    token = nextPageToken;

    // ถ้าไม่มีเมลใหม่ให้โหลดอีกก็หยุดทันที
    if (!token || data.length === 0) break;

    // รอเล็กน้อยเพื่อไม่ให้ API call ติดกันเกินไป
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  loading.value = false;
};

import { computed } from "vue";
import { isToday, isYesterday, differenceInCalendarDays } from "date-fns";

const groupedEmails = computed(() => {
  if (mailStore.mailList.data.length == 0) return;
  const groups = {
    Today: [],
    Yesterday: [],
    Last7Days: [],
    Last30Days: [],
    Older: [],
  };

  const showType = mailStore.showMailType; // เช่น 'unread', 'all', 'read'

  for (const email of emails.value) {
    if (
      showType === "unread" &&
      email.read // skip ที่อ่านแล้ว
    ) {
      continue;
    } else if (showType === "unread") {
    }

    const date = new Date(email.date);

    if (isToday(date)) {
      groups.Today.push(email);
    } else if (isYesterday(date)) {
      groups.Yesterday.push(email);
    } else {
      const daysAgo = differenceInCalendarDays(new Date(), date);
      if (daysAgo <= 7) {
        groups.Last7Days.push(email);
      } else if (daysAgo <= 30) {
        groups.Last30Days.push(email);
      } else {
        groups.Older.push(email);
      }
    }
  }

  return groups;
});

// โหลดรอบแรก
onMounted(() => {
  if (session.value?.googleAccessToken) fetchInitialEmails();
});

// สังเกต scroll ถึงล่างสุด

const onScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 100) {
    if (mailStore.mailList.nextPageToken) fetchInitialEmails();
  }
};

onMounted(() => {
  nextTick(() => {
    const el = scrollContainer.value?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (el) {
      el.addEventListener("scroll", onScroll);
    }
  });
});

watchEffect(() => {
  if (mailStore.showMailType === "unread") {
    const totalUnread = Object.values(groupedEmails.value).flat().length;
    if (totalUnread < 40) {
      fetchInitialEmails(); // ฟังก์ชันใน store
    }
  }
});

const selectedMail = defineModel<string>("selectedMail", { required: false });
</script>

<template>
  <div class="relative">
    <div v-if="mailStore.mailLoaded" class="flex flex-col gap-1 px-2">
      <Skeleton v-for="i in 10" class="h-10 w-full" />
    </div>
    <BaseMailNotionMailNotFound
      v-else-if="mailStore.mailList.data.length == 0"
    />
    <div v-else>
      <!-- ------------------mobile layout-------------------- -->
      <div
        class="xl:hidden overflow-y-auto h-[calc(100dvh-3.5rem)] custom-scroll"
        @scroll="onScroll"
      >
        <div
          v-for="item of emails"
          :key="item.id"
          class="cursor-pointer hover:bg-accent relative p-2 flex gap-3 border-b"
          @click="(selectedMail = item.id), mailStore.setSelectMail(item)"
          :class="{
            'bg-muted-300 dark:bg-muted-800 ':
              selectedMail === item.id && !device.isMobile,
            'bg-[hsl(var(--card))] rounded-sm overflow-hidden': !item.read,
          }"
        >
          <div class="">
            <!-- ชื่อผู้ส่ง -->
            <div :class="[item.read ? 'font-normal' : 'font-bold']">
              {{ extractName(item.from) }}
            </div>
            <!-- หัวข้อ + เนื้อหา -->
            <div
              class="w-[80vw] overflow-hidden whitespace-nowrap text-ellipsis truncate"
            >
              <span :class="item.read ? 'font-normal' : 'font-bold'">
                {{ item.subject }}
              </span>
            </div>
            <!-- หัวข้อ + เนื้อหา -->
            <div
              class="w-[80vw] overflow-hidden whitespace-nowrap text-ellipsis truncate"
            >
              <span
                class="text-muted-800 dark:text-muted-400"
                :title="item.snippet"
              >
                {{ item.snippet }}
              </span>
            </div>
            <!-- วันที่ -->
            <div
              class="px-4 text-xs text-end min-w-[6rem] absolute right-0 top-1"
              :class="
                selectedMail === item.id
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              "
            >
              {{ formatMailDate(item.date) }}
            </div>
          </div>
        </div>
      </div>
      <!-- ------------------desktop layout-------------------- -->
      <div
        class="overflow-y-auto h-[calc(100dvh-3.5rem)] hidden xl:block custom-scroll"
        @scroll="onScroll"
      >
        <table class="table-auto w-full overflow-hidden px-5">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <TransitionGroup name="list" appear>
              <template v-for="(group, label) in groupedEmails" :key="label">
                <tr v-if="group.length">
                  <td
                    v-if="label !== 'Today'"
                    colspan="5"
                    class="pl-12 pr-10 py-2 pt-5 text-sm font-bold text-primary-500 bg-muted"
                  >
                    <div class="border-b border-muted">
                      <div class="pl-4 pb-2">
                        {{
                          label === "Yesterday"
                            ? "เมื่อวาน"
                            : label === "Last7Days"
                            ? "7 วันที่ผ่านมา"
                            : label === "Last30Days"
                            ? "30 วันที่ผ่านมา"
                            : "ก่อนหน้านี้"
                        }}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="item in group"
                  :key="item.id"
                  :class="[
                    'cursor-pointer hover:bg-accent text-sm w-full h-10',
                    mailStore.selectMail?.data.id === item.id
                      ? 'dark:bg-[hsl(var(--card))] bg-muted-200'
                      : '',
                  ]"
                  @click="mailStore.setSelectMail(item)"
                >
                  <td class="pl-8">
                    <Dot
                      :class="[
                        item.read
                          ? 'text-transparent'
                          : 'text-primary-500 h-8 w-8',
                      ]"
                    />
                  </td>

                  <td
                    :class="[
                      'max-w-[16vw] min-w-[16vw] pr-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis truncate',
                      item.read
                        ? 'font-normal text-muted-800 dark:text-muted-400'
                        : 'font-semibold',
                    ]"
                  >
                    {{ extractName(item.from) }}
                  </td>

                  <td
                    class="w-full max-w-[800px] pr-10 py-2"
                    :colspan="item.attachments?.length > 0 ? 1 : 2"
                  >
                    <div class="flex items-center gap-2 overflow-hidden">
                      <!-- Subject + Snippet -->
                      <div
                        class="truncate whitespace-nowrap overflow-hidden min-w-0"
                      >
                        <span
                          :class="
                            item.read
                              ? 'font-normal text-muted-500 dark:text-muted-400'
                              : 'font-semibold'
                          "
                        >
                          {{ item.subject }}
                        </span>
                        -
                        <span
                          :class="[
                            item.read
                              ? 'text-muted-500 dark:text-muted-400'
                              : 'font-semibold',
                          ]"
                          :title="item.snippet"
                        >
                          {{ item.snippet }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <!-- Attachments badge -->
                  <td v-if="item.attachments?.length > 0">
                    <div class="flex items-center flex-shrink-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger as-child>
                            <div>
                              <Paperclip class="text-primary-500" size="20" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p
                              v-for="file in item.attachments"
                              :key="file.filename"
                            >
                              {{ file.filename }}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>

                  <td
                    class="px-4 py-2 text-xs text-end min-w-[6rem] pr-10"
                    :class="
                      selectedMail === item.id
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ formatMailDate(item.date) }}
                  </td>
                </tr>
              </template>
            </TransitionGroup>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="loading"
      class="absolute bottom-0 w-full flex justify-center items-center py-3 bg-[hsl(var(--card))]/50 z-50 backdrop-blur-sm"
    >
      <div class="flex items-center space-x-2">
        <!-- Spinner -->
        <div
          class="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <!-- Loading Text -->
        <span class="text-sm text-gray-600 animate-pulse">กำลังโหลด...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}

td {
  white-space: nowrap;
}
</style>
