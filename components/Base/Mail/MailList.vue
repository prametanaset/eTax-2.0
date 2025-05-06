<script lang="ts" setup>
import type { Mail } from "./data/mail";
import { cn } from "@/lib/utils";
import { Star } from "lucide-vue-next";

interface MailListProps {
  items: Mail[];
}

const mailStore = useMailStore();
const device = useDevice();

defineProps<MailListProps>();
const selectedMail = defineModel<string>("selectedMail", { required: false });

function getBadgeVariantFromLabel(label: string) {
  if (["work"].includes(label.toLowerCase())) return "default";

  if (["personal"].includes(label.toLowerCase())) return "outline";

  return "secondary";
}
</script>

<template>
  <ScrollArea class="h-screen flex">
    <div class="gap-2 py-4 pt-0 w-full">
      <TransitionGroup
        name="list"
        appear
        v-if="mailStore.selectMail.length == 0"
      >
        <button
          v-for="item of items"
          :key="item.id"
          :class="
            cn(
              'items-start gap-2 text-left text-sm transition-all hover:bg-accent w-full',
              selectedMail === item.id && 'bg-muted',
              device.isMobile ? '' : 'py-3'
            )
          "
          @click="(selectedMail = item.id), mailStore.selectMail.push(item)"
        >
          <div
            v-if="!device.isMobile"
            class="flex w-full gap-5 overflow-hidden"
          >
            <div class="flex items-center w-[10%] overflow-hidden">
              <div class="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger
                    as-child
                    @click="mailStore.clearSelectMailStore"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      @click="console.log('click')"
                    >
                      <Star class="size-4" />
                      <span class="sr-only">ติดดาว</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>ติดดาว</TooltipContent>
                </Tooltip>
                <div class="font-semibold">
                  {{ item.name }}
                </div>
                <span
                  v-if="!item.read"
                  class="flex h-2 w-2 rounded-full bg-primary-500"
                />
              </div>
            </div>

            <!-- Subject & Text Container -->
            <div class="w-[70%] overflow-hidden">
              <div class="overflow-hidden whitespace-nowrap text-ellipsis">
                <span class="font-semibold">{{ item.subject }}</span>
                <!-- <span class="text-muted-500"> - {{ item.text }}</span> -->
              </div>
            </div>

            <!-- Date & Labels -->
            <div class="flex justify-end items-center gap-2 w-[20%]">
              <Badge
                v-for="label of item.labels"
                :key="label"
                :variant="getBadgeVariantFromLabel(label)"
              >
                {{ label }}
              </Badge>
              <div
                :class="
                  cn(
                    'text-xs',
                    selectedMail === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )
                "
              >
                {{ formatThaiDate(new Date(item.date)) }}
              </div>
            </div>
          </div>
          <!-- ----------------------------------------- device mobile -------------------------------------- -->
          <div
            v-else
            class="grid w-full gap-2 overflow-hidden border-collapse border-b pb-3"
          >
            <div class="flex items-center w-full overflow-hidden">
              <div class="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger
                    as-child
                    @click="mailStore.clearSelectMailStore"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      @click="console.log('click')"
                    >
                      <Star class="size-4" />
                      <span class="sr-only">ติดดาว</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>ติดดาว</TooltipContent>
                </Tooltip>
                <div class="font-semibold">
                  {{ item.name }}
                </div>
                <span
                  v-if="!item.read"
                  class="flex h-2 w-2 rounded-full bg-primary-500"
                />
              </div>
            </div>

            <!-- Subject & Text Container -->
            <div class="w-full">
              <span class="font-semibold">{{ item.subject }}</span>
              <span class="text-muted-500"> - {{ item.text }}</span>
            </div>

            <!-- Date & Labels -->
            <div class="flex items-center gap-2 w-full">
              <Badge
                v-for="label of item.labels"
                :key="label"
                :variant="getBadgeVariantFromLabel(label)"
              >
                {{ label }}
              </Badge>
              <div
                :class="
                  cn(
                    'text-xs',
                    selectedMail === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )
                "
              >
                {{ formatThaiDate(new Date(item.date)) }}
              </div>
            </div>
          </div>
        </button>
      </TransitionGroup>
      <Transition v-else name="slide-fade" appear>
        <BaseMailDisplay :mail="mailStore.selectMail[0]" />
      </Transition>
    </div>
  </ScrollArea>
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%); /* เริ่มจากขวาสุด */
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0); /* มายืนตำแหน่งปกติ */
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
