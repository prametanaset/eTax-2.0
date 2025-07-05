<template>
  <Drawer v-model:open="isOpen">
    <DrawerTrigger as-child>
      <MessageCircle class="cursor-pointer" />
    </DrawerTrigger>
    <DrawerContent class="max-w-[500px] m-auto">
      <DrawerHeader class="text-left relative">
        <div
          class="mx-auto h-2 w-[120px] rounded-full bg-muted-500 absolute top-0 left-[50%]"
          style="transform: translate(-50%, -50%)"
        />
        <div class="grid gap-4 text-center">
          <DrawerTitle class="text-primary-500"
            >คิดเห็นอย่างไรกับแอพของเรา?</DrawerTitle
          >
          <DrawerDescription
            >ความคิดเห็นของคุณจะช่วยให้เรามอบประสบการณ์การใช้งานของคุณให้ดียิ่งขึ้น</DrawerDescription
          >
          <RadioGroup v-model="data.score" class="flex gap-2 justify-center">
            <div
              v-for="i in mood"
              :key="i.value"
              class="relative cursor-pointer"
              @click="data.score = i.value"
            >
              <!-- ซ่อน RadioGroupItem แต่ยังคงทำงานได้ -->
              <RadioGroupItem
                :id="`mood-${i.value}`"
                :value="i.value"
                class="absolute opacity-0 w-0 h-0"
              />
              <Label
                :for="`mood-${i.value}`"
                class="text-2xl transition-colors cursor-pointer"
                :class="{
                  'text-gray-400': data.score !== i.value,
                  'text-black': data.score === i.value,
                }"
              >
                {{ i.icon }}
              </Label>
            </div>
          </RadioGroup>

          <Textarea placeholder="ความคิดเห็นของคุณ" v-model="data.comment" />
        </div>
      </DrawerHeader>
      <GridForm />
      <DrawerFooter>
        <DrawerClose as-child>
          <Button @click="handleSubmit" :disabled="!canSubmit"
            ><Send />ส่ง</Button
          >
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup>
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageCircle, Send } from "lucide-vue-next";
const isOpen = ref(false);
const { submitFeedBack } = useFeedBackService();
const data = reactive({
  score: 0,
  comment: "",
});

const mood = [
  {
    value: 1,
    icon: "😥",
  },
  {
    value: 2,
    icon: "😕",
  },
  {
    value: 3,
    icon: "😐",
  },
  {
    value: 4,
    icon: "🙂",
  },
  {
    value: 5,
    icon: "😊",
  },
];

async function handleSubmit() {
  await submitFeedBack(data);
}

const canSubmit = computed(() => {
  return data.score !== 0 && data.comment.trim() !== "";
});
</script>

<style></style>
