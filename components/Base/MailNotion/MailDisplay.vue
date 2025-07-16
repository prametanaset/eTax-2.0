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
  ChevronLeft,
} from "lucide-vue-next";
import { computed } from "vue";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import DOMPurify from "dompurify";

const mailStore = useMailStore();
const mail = computed(() => mailStore.selectMail);

const safeHtml = computed(() => {
  const html = mail.value?.data.html || "";

  // เพิ่ม hook เพื่อปรับ <a> ทั้งหมด
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  });

  const clean = DOMPurify.sanitize(
    `
    <!DOCTYPE html>
    <html >
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          html, body {
            margin: 0;
            padding: 1rem;
            font-family: sans-serif;
            max-width: 100%;
            overflow-x: hidden;
            box-sizing: border-box;
            background-color: white;
            color: black;
          }

          .dark body {
            background-color: #121212 !important;
            color: #ffffff !important;
          }

          * {
            box-sizing: border-box !important;
            max-width: 100% !important;
          }

          table {
            width: 100% !important;
            display: block;
            overflow-x: auto;
          }

          img {
            max-width: 100% !important;
            height: auto !important;
          }

          a {
            color: #1a0dab;
          }

          .dark a {
            color: #8ab4f8 !important;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
    `,
    { ADD_ATTR: ["target", "rel"] }
  );

  // ลบ hook ทิ้ง (กัน side effect)
  DOMPurify.removeAllHooks();

  return clean;
});
</script>

<template>
  <ScrollArea class="bg-muted-300 dark:bg-[hsl(var(--card))] h-full">
    <div class="flex flex-col">
      <div v-if="mail?.data.html" class="flex flex-1 flex-col">
        <!-- header -->
        <div
          class="flex items-center px-4 py-2 justify-between sticky top-0 z-10 bg-muted-300 dark:bg-[hsl(var(--card))] border-b border-primary-500"
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
          <div class="text-xs text-muted-foreground px-3">
            {{ formatMailDate(mail.data.date) }}
          </div>
        </div>
        <!-- end header -->

        <!-- Body ที่กินพื้นที่ที่เหลือ -->
        <div class="flex-1 overflow-hidden">
          <iframe
            sandbox="allow-same-origin allow-popups"
            :srcdoc="safeHtml"
            class="w-full h-[calc(100dvh-5rem)] border-0 bg-white"
          />
        </div>
      </div>
      <div v-else class="p-8 text-center text-muted-foreground">
        No message selected
      </div>
    </div>
  </ScrollArea>
</template>
