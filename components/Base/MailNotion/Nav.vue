<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 max-w-[17rem] w-[17rem]"
  >
    <nav
      class="grid gap-3 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          type="text"
          placeholder="ค้นหาเมล..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>
      <Separator />
      <Tabs
        default-value="all"
        class="w-full bg-[hsl(var(--background))] mb-5 border rounded-md"
        v-model="showMail"
      >
        <TabsList
          class="grid w-full grid-cols-2 p-0 bg-[hsl(var(--background))]"
        >
          <TabsTrigger
            value="all"
            class="data-[state=active]:bg-[hsl(var(--sidebar-accent))] data-[state=active]:text-[hsl(var(--sidebar-accent-foreground))]"
          >
            ทั้งหมด
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            class="data-[state=active]:bg-[hsl(var(--sidebar-accent))] data-[state=active]:text-[hsl(var(--sidebar-accent-foreground))]"
          >
            ยังไม่อ่าน
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <template v-for="(link, index) of links" :key="index">
        <p
          :class="[
            link.url === route.path
              ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
              : '',
            'text-md font-medium cursor-pointer router-link-active router-link-exact-active peer/menu-button flex w-full items-center gap-2 overflow-hidden p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm rounded-xl py-5',
          ]"
          @click.prevent="setActiveLink(link.url, index)"
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span v-if="link.label" :class="cn('ml-auto', '')">
            {{ link.label }}
          </span>
        </p>
      </template>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/utils";
import { Search } from "lucide-vue-next";

export interface LinkProp {
  title: string;
  label: string;
  icon: string;
  url: string;
}

const route = useRoute();
const router = useRouter();
const showMail = ref("all");
const mailStore = useMailStore();

interface NavProps {
  isCollapsed: boolean;
  links: LinkProp[];
}

const props = defineProps<NavProps>();

// ตัวแปรที่จะเก็บ index ของปุ่มที่ถูกเลือก
const activeLink = ref<number | null>(null);

// ฟังก์ชันในการเปลี่ยนสถานะ active
const setActiveLink = (url: string, index: number) => {
  router.replace(url);
};

watch(
  () => showMail.value,
  (newValue) => {
    mailStore.showMailType = newValue; // อัปเดตค่าเมื่อ showMail.value เปลี่ยน
  }
);
</script>
