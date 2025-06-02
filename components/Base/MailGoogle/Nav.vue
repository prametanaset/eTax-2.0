<script lang="ts" setup>
import { cn } from "@/lib/utils";

import { Icon } from "@iconify/vue";
import { buttonVariants } from "@/components/ui/button";

export interface LinkProp {
  title: string;
  label?: string;
  icon: string;
  variant: "default" | "ghost";
}

interface NavProps {
  links: LinkProp[];
}

defineProps<NavProps>();
</script>

<template>
  <div
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 w-[17rem]"
  >
    <nav
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) of links">
        <a
          href="#"
          :class="
            cn(
              buttonVariants({ variant: link.variant, size: 'sm' }),
              link.variant === 'default' &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start'
            )
          "
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            v-if="link.label"
            :class="
              cn(
                'ml-auto',
                link.variant === 'default' && 'text-background dark:text-white'
              )
            "
          >
            {{ link.label }}
          </span>
        </a>
      </template>
    </nav>
  </div>
</template>
