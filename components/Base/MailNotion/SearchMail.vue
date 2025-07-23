<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <SidebarGroup class="group-data-[collapsible=icon]:hidden py-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton class="text-sidebar-foreground/70">
              <Search class="text-sidebar-foreground/70" />
              <span>ค้นหา</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </PopoverTrigger>

    <PopoverContent
      side="bottom"
      align="start"
      :side-offset="-34"
      class="w-[30rem] ml-2 p-0 bg-transparent border-0  transition-none !animate-none shadow-xl
      "
    >
      <div class="bg-[hsl(var(--card))] rounded-lg  w-full">
        <div class="relative w-full items-center">
          <Input
            ref="inputRef"
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาเมล..."
            class="pl-10  border-none h-9 rounded-lg "
            @input="onSearch"
            @keydown.esc="closePopover"
          />
          <!-- search icon -->
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-5 text-muted-foreground" />
          </span>
          <!-- clear button -->
          <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
            <X
              v-if="searchQuery"
              class="size-4 text-muted-foreground cursor-pointer"
              @click="clearSearch"
            />
          </span>
        </div>

        <!-- Result List -->
        <Card
          v-if="searchQuery && filteredMails.length > 0"
          class="mt-2 max-h-[50dvh] overflow-y-auto bg-[hsl(var(--card))] p-2 text-start text-muted-foreground custom-scroll border-none"
        >
          <div
            v-for="(mail, index) in filteredMails"
            :key="mail.id"
            :class="[
              'p-2 dark:hover:bg-muted-700 hover:bg-muted-300 cursor-pointer',
              index !== filteredMails.length - 1 ? 'border-b' : '',
            ]"
            @click="selectMail(mail)"
          >
            <div class="font-semibold">{{ mail.from }}</div>
            <div class="text-sm">ถึง : {{ mail.to }}</div>
            <div class="text-sm text-muted-foreground line-clamp-1">{{ mail.subject }}</div>
          </div>
        </Card>

        <!-- Empty -->
        <Card
          v-else-if="searchQuery && !loading"
          class="mt-2 bg-[hsl(var(--card))] p-2 text-center text-muted-foreground border-none "
        >
          ไม่พบเมลที่ตรงกับ "{{ searchQuery }}"
        </Card>

        <!-- Loading -->
        <Card
          v-else-if="loading"
          class="mt-2 bg-[hsl(var(--card))] p-2 text-center"
        >
          กำลังค้นหา...
        </Card>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Card } from '@/components/ui/card'
import { Search, X } from 'lucide-vue-next'
import { useDebounceFn } from '@vueuse/core'

const mailStore = useMailStore()
const profileStore = useProfileStore()
const { listMessages } = useGmailService()

const open = ref(false)
const searchQuery = ref('')
const filteredMails = ref<any[]>([])
const loading = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const onSearch = useDebounceFn(async () => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    filteredMails.value = []
    return
  }

  const local = mailStore.mailList.data.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(query) ||
      mail.from.toLowerCase().includes(query)
  )

  if (local.length > 0) {
    filteredMails.value = local
    return
  }

  loading.value = true
  try {
    const fetchQuery = `from:${profileStore.user?.username} OR from:csemail@etax.teda.th ${query}`
    const remote = await listMessages(fetchQuery, 5)
    filteredMails.value = remote.data
  } finally {
    loading.value = false
  }
}, 400)

const clearSearch = () => {
  searchQuery.value = ''
  filteredMails.value = []
}

const closePopover = () => {
  open.value = false
  searchQuery.value = ''
  filteredMails.value = []
}

const selectMail = (mail: any) => {
  mailStore.setSelectMail(mail)
  closePopover()
}

// Focus input when Popover opens
watch(open, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
  }
})
</script>
