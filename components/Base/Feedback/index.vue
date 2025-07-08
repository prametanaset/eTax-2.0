<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child
      ><MessageSquareDot class="w-8 cursor-pointer"
    /></DialogTrigger>
    <DialogContent class="max-w-[500px] m-auto">
      <DialogHeader class="text-left relative">
        <!-- <div
          class="mx-auto h-2 w-[120px] rounded-full bg-muted-500 absolute top-0 left-[50%]"
          style="transform: translate(-50%, -50%)"
        /> -->
        <div class="grid gap-4 text-center">
          <DialogTitle class="text-primary-500">คิดเห็นอย่างไร?</DialogTitle>
          <DialogDescription
            >ความคิดเห็นของคุณจะช่วยให้เรามอบประสบการณ์การใช้งานของคุณให้ดียิ่งขึ้น</DialogDescription
          >

          <RadioGroup v-model="data.score" class="flex gap-4 justify-center">
            <div
              v-for="i in mood"
              :key="i.value"
              class="cursor-pointer transition-all duration-300"
              @click="handleSelect(i.value)"
            >
              <!-- ซ่อน radio จริง -->
              <RadioGroupItem
                :id="`mood-${i.value}`"
                :value="i.value"
                class="absolute opacity-0 w-0 h-0"
              />

              <!-- Lottie แสดง animation -->
              <Label
                :for="`mood-${i.value}`"
                class="flex justify-center cursor-pointer"
              >
                <LottiePlayer
                  :animationData="i.icon"
                  :loop="true"
                  :ref="(el) => (players[i.value] = el)"
                  :class="[
                    'transition-all duration-300',
                    data.score === i.value
                      ? 'opacity-100 scale-125'
                      : 'opacity-30 scale-100',
                  ]"
                />
              </Label>
            </div>
          </RadioGroup>

          <Textarea
            placeholder="ช่วยเราปรับปรุงหน้านี้"
            v-model="data.comment"
          />
        </div>
      </DialogHeader>
      <GridForm />
      <DrawerFooter>
        <DrawerClose as-child>
          <Button @click="handleSubmit" :disabled="!canSubmit"
            ><Send />ส่ง</Button
          >
        </DrawerClose>
      </DrawerFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
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
import { MessageSquareDot, Send } from "lucide-vue-next";
import veryBad from "@/assets/lotties/Animation-1-Very bad.json";
import bad from "@/assets/lotties/Animation-2-Bad.json";
import happy from "@/assets/lotties/Animation-4-Happy.json";
import medium from "@/assets/lotties/Animation-3-Medium.json";
import mostHappy from "@/assets/lotties/Animation-5-MostHappy.json";
import LottiePlayer from "~/components/LottiePlayer.vue";

const isOpen = ref(false);
const { submitFeedBack } = useFeedBackService();
const data = reactive({
  score: 0,
  comment: "",
});

const mood = [
  {
    value: 1,
    icon: veryBad,
  },
  {
    value: 2,
    icon: bad,
  },
  {
    value: 3,
    icon: medium,
  },
  {
    value: 4,
    icon: happy,
  },
  {
    value: 5,
    icon: mostHappy,
  },
];

// ตัวแปรเก็บ ref แต่ละ Lottie
const players = ref<any[]>([]);

function handleSelect(val: number) {
  data.score = val;

  for (const key in players.value) {
    const player = players.value[key];
    if (Number(key) === val) {
      player?.play();
    } else {
      player?.stop();
    }
  }
}

async function handleSubmit() {
  await submitFeedBack(data);
}

const canSubmit = computed(() => {
  return data.score !== 0 && data.comment.trim() !== "";
});

watch(
  () => isOpen.value,
  (newVal) => {
    if (newVal === false) {
      data.comment = "";
      data.score = 0;
    }
  }
);
</script>

<style></style>
