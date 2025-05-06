<template>
  <div class="flex px-2">
    <!-- Title Column -->
    <div class="w-[20%] font-semibold">Bas Taks</div>

    <!-- Text Column with Flex and Truncate -->
    <div class="w-[70%] flex overflow-hidden">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
        ducimus amet fugit quae id tenetur numquam blanditiis. Veritatis nobis
        modi deleniti unde cupiditate aliquid assumenda cumque laudantium
        suscipit, magnam, praesentium rerum omnis qui veniam accusantium? Alias
        unde ratione doloribus maxime neque ipsum incidunt iusto enim! Illum
        distinctio nisi sint, ad dolore error architecto totam ipsam deserunt
        eaque omnis aut laborum, ipsum minima harum mollitia, aliquid
        exercitationem a amet placeat iste ratione! Ad asperiores harum quas
        illo optio dolores quidem nam rem modi. Qui, ullam cumque ut in
        consequuntur, soluta doloremque officiis debitis excepturi beatae totam
        autem, sed inventore natus sequi!
      </p>
    </div>

    <!-- Badge Column -->
    <div class="w-[10%] flex items-center justify-end gap-3">
      <Badge v-for="i in 2" :key="i">Test</Badge>
    </div>
  </div>
</template>

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
<style></style>
