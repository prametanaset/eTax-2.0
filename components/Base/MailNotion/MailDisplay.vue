<script lang="ts" setup>
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
  ChevronRight,
  ArrowDownToLine,
  ChevronLeft,
} from "lucide-vue-next";
import { computed } from "vue";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import DOMPurify from "dompurify";
import FileChip from "./FileChip.vue";

const mailStore = useMailStore();
const mail = computed(() => mailStore.selectMail);

const sanitizedHtml = computed(() =>
  DOMPurify.sanitize(mail.value?.data.html || "", {
    ADD_ATTR: ["target", "rel"],
  })
);
</script>

<template>
  <ScrollArea class="bg-muted-200 dark:bg-[hsl(var(--card))] h-full">
    <div class="flex flex-col">
      <div v-if="mail?.data.html" class="">
        <!-- header -->
        <div
          class="flex items-center px-4 py-2 justify-between sticky top-0 z-10 bg-muted-200 dark:bg-[hsl(var(--card))] border-b border-primary-500"
        >
          <div class="flex items-center gap-2 text-sm">
            <div class="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    size="icon"
                    variant="ghost"
                    :disabled="!mail"
                    @click="mailStore.clearSelectMailStore()"
                  >
                    <ChevronRight class="size-4" />
                    <span class="sr-only">กลับ</span>
                  </Button>
                </TooltipTrigger>
                <!-- <TooltipContent>ปิด</TooltipContent> -->
              </Tooltip>
            </div>
            <Separator orientation="vertical" class="mx-2 h-6" />
            <div class="grid gap-1">
              <div class="font-semibold text-lg">
                {{ extractName(mail.data.from) }}
              </div>
              <div class="line-clamp-1">
                {{ mail.data.subject }}
              </div>
            </div>
          </div>
          <div
            class="text-xs text-end text-muted-foreground px-3 min-w-[10rem]"
          >
            {{ formatMailDisplayDate(mail.data.date) }}
          </div>
        </div>
        <!-- end header -->

        <!-- Body ที่กินพื้นที่ที่เหลือ -->
        <div class="relative">
          <div class="overflow-auto px-5 py-2" v-html="sanitizedHtml" />
        </div>

        <div
          v-if="mail.data.attachments.length > 0"
          class="px-5 flex flex-col gap-5"
        >
          <Separator />
          <div>
            <FileChip :files="mail.data.attachments" />
          </div>
        </div>
      </div>
      <div v-else class="p-8 text-center text-muted-foreground">
        ไม่พบข้อมูลเมล
      </div>
    </div>
  </ScrollArea>
</template>
