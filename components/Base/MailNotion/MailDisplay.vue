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
  <ScrollArea class="bg-[hsl(var(--card))] h-full">
    <div class="flex flex-col">
      <div v-if="mail?.data.html" class="">
        <!-- header -->
        <div
          class="flex items-start px-4 py-4 justify-between sticky top-0 z-10 bg-[hsl(var(--card))] border-b border-primary-500"
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
            <!-- <Separator orientation="vertical" class="mx-2 h-6" /> -->
            <div class="grid gap-1 max-w-[400px]">
              <!-- ผู้ส่ง -->
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <h1 class="font-semibold text-lg truncate">
                      {{ extractName(mail.data.from) }}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent class="relative z-[999]">
                    <p>{{ extractName(mail.data.from) }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <!-- หัวเรื่อง -->
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <h1 class="text-sm line-clamp-1 text-muted-foreground">
                      {{ mail.data.subject }}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent class="relative z-[999]">
                    <p>{{ mail.data.subject }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div
            class="text-xs text-end text-muted-foreground mt-1 min-w-[15rem]"
          >
            {{ formatMailDisplayDate(mail.data.date) }}
          </div>
        </div>
        <!-- end header -->

        <!-- Body ที่กินพื้นที่ที่เหลือ -->
        <div class="relative bg-[hsl(var(--card))]">
          <div class="overflow-auto px-10 pt-5" v-html="sanitizedHtml" />
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
    </div>
  </ScrollArea>
</template>
