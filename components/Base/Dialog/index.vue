<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { description } from "~/layouts/default.vue";

const props = defineProps({
  text: String,
  title: String,
  description: String,
  bgButton:String,
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" :class='bgButton'>
        {{ props.text }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription>
          {{ props.description }}
        </DialogDescription>
      </DialogHeader>
      <slot name="content"></slot>
      <DialogFooter>
        <slot name="footer"></slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>