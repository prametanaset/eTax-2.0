<script lang="ts" setup>
import type { Mail } from "./data/mail";
import { cn } from "@/lib/utils";
import { RotateCcw, Star, MailOpen, Dot } from "lucide-vue-next";

interface MailListProps {
  items: Mail[];
}

defineProps<MailListProps>();
const selectedMail = defineModel<string>("selectedMail", { required: false });
const mailStore = useMailStore();
const device = useDevice();
</script>

<template>
  <div>
    <!-- ------------------mobile layout-------------------- -->
    <ScrollArea class="xl:hidden overflow-y-auto h-[87dvh]">
      <div
        v-for="item of items"
        :key="item.id"
        class="cursor-pointer hover:bg-accent relative p-2 flex gap-3 border-b"
        @click="(selectedMail = item.id), mailStore.setSelectMail(item)"
        :class="{
          'bg-muted-300 dark:bg-muted-800 ':
            selectedMail === item.id && !device.isMobile,
          'bg-[hsl(var(--card))] rounded-sm overflow-hidden': !item.read,
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
    </ScrollArea>
    <!-- ------------------desktop layout-------------------- -->
    <ScrollArea
      class="overflow-hidden h-[calc(93.6dvh-3.5rem)] hidden xl:block"
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
              v-for="item of items"
              :key="item.id"
              :class="['cursor-pointer hover:bg-accent text-sm']"
              @click="(selectedMail = item.id), mailStore.setSelectMail(item)"
            >
              <!-- ชื่อผู้ส่ง -->
              <td
                :class="[
                  'w-[20rem]  pr-4 py-2 flex',
                  item.read
                    ? 'font-normal text-muted-800 dark:text-muted-400'
                    : 'font-semibold',
                ]"
              >
                <Dot
                  :class="[item.read ? 'text-transparent' : 'text-primary-500']"
                />
                {{ item.name }}
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
    </ScrollArea>
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
