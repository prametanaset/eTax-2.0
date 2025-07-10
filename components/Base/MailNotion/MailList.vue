<script lang="ts" setup>
const { listMessages } = useGmailService();
const { data: session, status, signIn } = useAuth();
import { Dot } from "lucide-vue-next";

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
        class="overflow-y-auto h-[calc(93.6dvh-3.5rem)] hidden xl:block"
        @scroll="onScroll"
      >
        <table class="table-auto w-full h-full overflow-hidden">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <TransitionGroup name="list" appear>
              <tr
                v-for="item of emails"
                :key="item.id"
                :class="['cursor-pointer hover:bg-accent text-sm']"
                @click="mailStore.setSelectMail(item)"
              >
                <!-- ชื่อผู้ส่ง -->
                <td
                  :class="[
                    'w-[20rem] pr-4 py-2 flex overflow-hidden whitespace-nowrap text-ellipsis truncate',
                    item.read
                      ? 'font-normal text-muted-800 dark:text-muted-400'
                      : 'font-semibold',
                  ]"
                >
                  <Dot
                    :class="[
                      item.read ? 'text-transparent' : 'text-primary-500',
                    ]"
                  />
                  {{ extractName(item.from) }}
                </td>

                <!-- หัวข้อ + เนื้อหา -->
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

                <!-- วันที่ -->
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
