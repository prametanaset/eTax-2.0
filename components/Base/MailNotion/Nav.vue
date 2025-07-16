<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4  max-w-[17rem] w-[17rem]"
  >
    <nav class="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <Tabs default-value="all" class="w-full  bg-[hsl(var(--background))]" v-model="showMail">
        <TabsList class="grid w-full grid-cols-2 p-0 bg-[hsl(var(--background))]">
          <TabsTrigger value="all" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white ">
            ทั้งหมด
          </TabsTrigger>
          <TabsTrigger value="unread" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white ">
            ยังไม่อ่าน
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator/>
      <template v-for="(link, index) of links" :key="index">
        <Button 
          :variant="link.variant"
          class="data-[active=true]:bg-hsl(var(--sidebar-accent))"
          @click="setActiveLink(index)"
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            v-if="link.label"
            :class="cn(
              'ml-auto',
              '',
            )"
          >
            {{ link.label }}
          </span>
        </Button>
      </template>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface LinkProp {
  title: string
  label?: string
  icon: string
  variant: 'default' | 'ghost'
}

const showMail = ref('all')
const mailStore = useMailStore()

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
}

const props = defineProps<NavProps>()

// ตัวแปรที่จะเก็บ index ของปุ่มที่ถูกเลือก
const activeLink = ref<number | null>(null)

// ฟังก์ชันในการเปลี่ยนสถานะ active
const setActiveLink = (index: number) => {
  // props.links[index].variant = 'default'
}


watch(
  () => showMail.value,
  (newValue) => {
    mailStore.showMailType = newValue;  // อัปเดตค่าเมื่อ showMail.value เปลี่ยน
  }
);

</script>

<style>
/* สไตล์สำหรับปุ่ม active */
.button-active {
  background-color: var(--active-background-color);
  color: var(--active-text-color);
}
</style>
