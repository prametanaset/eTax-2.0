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
  const html = mail.value?.renderHtml || "";
  return DOMPurify.sanitize(`
  <!DOCTYPE html>
  <html>
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
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>`);
});
</script>

<template>
  <ScrollArea class="h-full">
    <div class="flex h-full flex-col">
      <div
        :class="[
          'flex items-center p-2 bg-background border-b border-muted-300 dark:border-muted-800 sticky top-0',
        ]"
      >
        <div class="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                size="icon"
                :disabled="!mail"
                @click="mailStore.clearSelectMailStore()"
              >
                <ChevronRight class="size-4" />
                <span class="sr-only">กลับ</span>
              </Button>
            </TooltipTrigger>
            <!-- <TooltipContent>ปิด</TooltipContent> -->
          </Tooltip>
          <Separator orientation="vertical" class="mx-2 h-6" />
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" :disabled="!mail">
                <Archive class="size-4" />
                <span class="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" :disabled="!mail">
                <ArchiveX class="size-4" />
                <span class="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" :disabled="!mail">
                <Trash2 class="size-4" />
                <span class="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" class="mx-1 h-6" />
        </div>
        <div class="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" :disabled="!mail">
                <Reply class="size-4" />
                <span class="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" :disabled="!mail">
                <ReplyAll class="size-4" />
                <span class="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" :disabled="!mail">
                <Forward class="size-4" />
                <span class="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" class="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <MoreVertical class="size-4" />
              <span class="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div v-if="mail?.renderHtml" class="flex flex-1 flex-col">
        <div class="flex items-start p-4 justify-between">
          <div class="flex items-start gap-4 text-sm">
            <div class="grid gap-1">
              <div class="font-semibold">
                {{ extractName(mail.data.from) }}
              </div>
              <div class="line-clamp-1">
                {{ mail.data.subject }}
              </div>
            </div>
          </div>
          <div class="text-xs text-muted-foreground">
            {{ formatMailDate(mail.data.date) }}
          </div>
        </div>
        <Separator />
        <div class="w-full overflow-x-auto bg-white">
          <iframe
            sandbox="allow-same-origin allow-scripts"
            :srcdoc="safeHtml"
            class="min-w-[320px] w-full border-0 h-dvh"
          />
        </div>
        <Separator class="mt-auto" />
        <div class="p-4">
          <form>
            <div class="grid gap-4">
              <Textarea
                class="p-4"
                :placeholder="`Reply ${extractName(mail.data.from)}...`"
              />
              <div class="flex items-center">
                <Label
                  html-for="mute"
                  class="flex items-center gap-2 text-xs font-normal"
                >
                  <Switch id="mute" aria-label="Mute thread" /> Mute this thread
                </Label>
                <Button type="button" size="sm" class="ml-auto"> Send </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-else class="p-8 text-center text-muted-foreground">
        No message selected
      </div>
    </div>
  </ScrollArea>
</template>
