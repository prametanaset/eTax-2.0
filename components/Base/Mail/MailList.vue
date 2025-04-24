<script lang="ts" setup>
import type { Mail } from "./data/mail";
import { cn } from "@/lib/utils";

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
    <div class="gap-2 p-4 pt-0 w-full">
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
              'items-start gap-2  p-3 text-left text-sm transition-all hover:bg-accent w-full',
              selectedMail === item.id && 'bg-muted'
            )
          "
          @click="(selectedMail = item.id), mailStore.selectMail.push(item)"
        >
          <div v-if="!device.isMobile" class="flex w-full gap-5">
            <div class="flex items-center w-[20%]">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ item.name }}
                </div>
                <span
                  v-if="!item.read"
                  class="flex h-2 w-2 rounded-full bg-primary-500"
                />
              </div>
            </div>

            <div class="font-semibold w-[40%] text-overflow-ellipsis">
              {{ item.subject }}
            </div>
            <div class="flex justify-end items-center gap-2 w-[30%]">
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

          <!-- -------------------------------------------------- mobile display ----------------------------------------------------->
          <div v-else class="w-full">
            <div class="flex justify-between">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ item.name }}
                </div>
                <span
                  v-if="!item.read"
                  class="flex h-2 w-2 rounded-full bg-primary-500"
                />
              </div>
              <div class="flex justify-end items-center gap-2">
                <!-- <Badge
                v-for="label of item.labels"
                :key="label"
                :variant="getBadgeVariantFromLabel(label)"
              >
                {{ label }}
              </Badge> -->
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
            <div class="text-muted-400 flex-none w-[80wv]">
              {{ item.subject }}
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
