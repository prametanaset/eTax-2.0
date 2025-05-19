<template>
  <div>
    <BaseProductList></BaseProductList>
    <Button
      variant="ghost"
      @click="open = true"
      class="hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 rounded-full p-2.5 flex items-center justify-center"
    >
      เพิ่ม
    </Button>
    <Dialog v-model:open="open">
      <DialogContent class="gap-0 p-0 outline-none">
        <DialogHeader class="px-4 pb-4 pt-5">
          <DialogTitle>New message</DialogTitle>
          <DialogDescription>
            Invite a user to this thread. This will create a new group message.
              <Button @click="newCustomerOpen = true">+ ลูกค้าใหม่</Button>
          </DialogDescription>
        </DialogHeader>
        <Command class="overflow-hidden rounded-t-none border-t">
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup class="p-2">
              <CommandItem
                v-for="user in users"
                :key="user.email"
                :value="user"
                class="flex items-center px-2"
                @select="() => (selectedUser = user)"
              >
                <Avatar>
                  <AvatarImage :src="user.avatar" alt="Image" />
                  <AvatarFallback>{{ user.name[0] }}</AvatarFallback>
                </Avatar>
                <div class="ml-2">
                  <p class="text-sm font-medium leading-none">
                    {{ user.name }}
                  </p>
                  <p class="text-sm text-muted-foreground">
                    {{ user.email }}
                  </p>
                </div>
                <Check
                  v-if="selectedUser?.email === user.email"
                  class="ml-auto flex h-5 w-5 text-primary"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter class="flex items-center border-t p-4 sm:justify-between">
          <div
            v-if="selectedUser"
            class="flex items-center gap-2"
          >
            <Avatar class="border-2 border-background">
              <AvatarImage :src="selectedUser.avatar" />
              <AvatarFallback>{{ selectedUser.name[0] }}</AvatarFallback>
            </Avatar>
            <span class="text-sm">{{ selectedUser.name }}</span>
          </div>
          <p v-else class="text-sm text-muted-foreground">
            Select a user to add to this thread.
          </p>

          <Button :disabled="!selectedUser" @click="open = false">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <BaseAddCustomerForm  v-model:open="newCustomerOpen"
    @customer-added="handleCustomerAdded"></BaseAddCustomerForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type User = {
  name: string
  email: string
  avatar: string
}

const open = ref(false)
const selectedUser = ref<User | null>(null)
const users = ref<User[]>([
  { name: "Olivia Martin", email: "m@example.com", avatar: "/avatars/01.png" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", avatar: "/avatars/03.png" },
  { name: "Emma Wilson", email: "emma@example.com", avatar: "/avatars/05.png" },
  { name: "Jackson Lee", email: "lee@example.com", avatar: "/avatars/02.png" },
  { name: "William Kim", email: "will@email.com", avatar: "/avatars/04.png" },
])

const newCustomerOpen = ref(false)
function handleCustomerAdded(customer: User) {
  users.value.push(customer)
  selectedUser.value = customer
}
</script>
