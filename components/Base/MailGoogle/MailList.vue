<script lang="ts" setup>
import type { Mail } from "./data/mail";
import { cn } from "@/lib/utils";
import { RotateCcw, Star, MailOpen } from "lucide-vue-next";

interface MailListProps {
  items: Mail[];
}

defineProps<MailListProps>();
const selectedMail = defineModel<string>("selectedMail", { required: false });
const mailStore = useMailStore();
const device = useDevice();

function getBadgeVariantFromLabel(label: string) {
  if (["work"].includes(label.toLowerCase())) return "default";

  if (["personal"].includes(label.toLowerCase())) return "outline";

  return "secondary";
}
</script>

<template>
  <div class="h-full lg:bg-[hsl(var(--card))] lg:rounded-md overflow-hidden">
    <!-- ------------------mobile layout-------------------- -->
    <div class="lg:hidden">
      <div
        v-for="item of items"
        :key="item.id"
        class="cursor-pointer hover:bg-accent relative p-2 flex gap-3"
        @click="(selectedMail = item.id), mailStore.setSelectMail(item)"
        :class="{
          'bg-muted-300 dark:bg-muted-800 border-primary-500':
            selectedMail === item.id && !device.isMobile,
          'bg-[hsl(var(--card))]': !item.read,
        }"
      >
        <!-- profile img -->
        <div
          class="bg-muted-500 w-10 h-10 rounded-[50%] relative overflow-hidden"
        >
          <span
            class="text-white absolute text-center top-[50%] left-[50%]"
            style="transform: translate(-50%, -50%)"
            >{{ item.name[0] }}</span
          >
        </div>
        <div class="">
          <!-- ชื่อผู้ส่ง -->
          <div :class="[item.read ? 'font-normal' : 'font-bold']">
            {{ item.name }}
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
            <span class="text-muted-800 dark:text-muted-400" :title="item.text">
              {{ item.text }}
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
            {{ formatMailDate(new Date()) }}
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------desktop layout-------------------- -->
    <table class="table-auto w-full hidden lg:block">
      <thead>
        <tr>
          <th class="text-start">
            <Checkbox id="mails" />
          </th>
          <th class="py-3 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <span
                    class="inline-flex items-center justify-center p-1 cursor-pointer rounded-sm hover:bg-muted-200 dark:hover:bg-muted-800"
                  >
                    <RotateCcw class="w-5 h-5 text-sm text-primary-500" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>รีเฟรช</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <span
                    class="inline-flex items-center justify-center p-1 cursor-pointer rounded-sm hover:bg-muted-200 dark:hover:bg-muted-800"
                  >
                    <MailOpen class="w-5 h-5 text-sm text-primary-500" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ทำเครื่องหมายว่าอ่านแล้วทั้งหมด</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup name="list" appear>
          <tr
            v-for="item of items"
            :key="item.id"
            :class="[
              'cursor-pointer hover:bg-accent',
              !item.read ? 'bg-[hsl(var(--card))]' : 'bg-background',
            ]"
            @click="(selectedMail = item.id), mailStore.setSelectMail(item)"
          >
            <!-- action -->
            <td class="py-2 flex items-center gap-1">
              <Checkbox id="mails" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <span
                      class="inline-flex items-center justify-center p-1 cursor-pointer rounded-sm hover:bg-muted-200 dark:hover:bg-muted-800"
                    >
                      <Star class="w-5 h-5 text-xs" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ติดดาว</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </td>
            <!-- ชื่อผู้ส่ง -->
            <td
              :class="[
                'w-[15rem] px-4 py-2',
                item.read ? 'font-normal' : 'font-semibold',
              ]"
            >
              {{ item.name }}
            </td>

            <!-- หัวข้อ + เนื้อหา -->
            <td
              class="w-full max-w-[800px] px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis truncate"
            >
              <span :class="item.read ? 'font-normal' : 'font-semibold'">
                {{ item.subject }}
              </span>
              -
              <span
                class="text-muted-800 dark:text-muted-400"
                :title="item.text"
              >
                {{ item.text }}
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
              {{ formatMailDate(new Date()) }}
            </td>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>
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
