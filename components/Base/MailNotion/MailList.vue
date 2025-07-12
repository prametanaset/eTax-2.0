<script lang="ts" setup>
const { listMessages } = useGmailService();
const { data: session, status, signIn } = useAuth();
import { Dot } from "lucide-vue-next";
import { isToday, isThisWeek, isThisMonth } from "date-fns";

interface Mail {
  id: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
  read: boolean;
}

const emails = ref<Mail[]>([]);
const loading = ref(false);
const nextPageToken = computed(() => mailStore.mailList.nextPageToken);
const scrollContainer = ref<HTMLElement | null>(null);
const device = useDevice();
const mailStore = useMailStore();

const fetchEmails = async () => {
  if (loading.value) return;
  loading.value = true;

  const { data, nextPageToken } = await listMessages(
    30,
    mailStore.mailList.nextPageToken || undefined
  );

  mailStore.updateMailList(data, nextPageToken);
  emails.value = mailStore.mailList.data;

  loading.value = false;
};

import { computed } from "vue";
import { isToday, isYesterday, differenceInCalendarDays } from "date-fns";

const groupedEmails = computed(() => {
  const groups = {
    Today: [],
    Yesterday: [],
    Last7Days: [],
    Last30Days: [],
    Older: [],
  };

  for (const email of emails.value) {
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
  if (session.value?.googleAccessToken) fetchEmails();
});

// สังเกต scroll ถึงล่างสุด

const onScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 100) {
    if (mailStore.mailList.nextPageToken) fetchEmails();
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

const selectedMail = defineModel<string>("selectedMail", { required: false });
</script>

<template>
  <div>
    <div>
      <!-- ------------------mobile layout-------------------- -->
      <div class="xl:hidden overflow-y-auto h-[87dvh]" @scroll="onScroll">
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
        class="overflow-y-auto h-[calc(96.5dvh-3.5rem)] hidden xl:block"
        @scroll="onScroll"
      >
        <table class="table-auto w-full h-full overflow-hidden">
          <thead>
            <tr>
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
                    colspan="4"
                    class="pl-7 py-2 pt-5 text-sm font-bold text-primary-500 bg-muted border-b"
                  >
                    {{
                      label === "Yesterday"
                        ? "เมื่อวาน"
                        : label === "Last7Days"
                        ? "7 วันที่ผ่านมา"
                        : label === "Last30Days"
                        ? "30 วันที่ผ่านมา"
                        : "ก่อนหน้านี้"
                    }}
                  </td>
                </tr>

                <tr
                  v-for="item in group"
                  :key="item.id"
                  class="cursor-pointer hover:bg-accent text-sm w-full"
                  @click="mailStore.setSelectMail(item)"
                >
                  <td>
                    <Dot
                      :class="[
                        item.read ? 'text-transparent' : 'text-primary-500',
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
                    class="w-full max-w-[800px] px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis truncate"
                  >
                    <span
                      :class="
                        item.read
                          ? 'font-normal text-muted-800 dark:text-muted-400'
                          : 'font-semibold'
                      "
                    >
                      {{ item.subject }}
                    </span>
                    -
                    <span
                      class="text-muted-800 dark:text-muted-400"
                      :title="item.snippet"
                    >
                      {{ item.snippet }}
                    </span>
                  </td>

                  <td
                    class="px-4 py-2 text-xs text-end min-w-[6rem]"
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
    <div v-if="loading" class="text-center">กำลังโหลด...</div>
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
