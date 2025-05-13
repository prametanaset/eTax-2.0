<script setup lang='ts'>
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-vue-next";

const users = ref([
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png',
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
  },
])

const open = ref(false)
const selectedUsers = ref<User[]>([])
</script>

<template>
  <!-- ข้อมูลลูกค้า -->
  <div
    class="bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-700 rounded-lg p-6 shadow-sm">
    <!-- Header with title and button -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-purple-700 dark:text-purple-400 text-md font-semibold flex items-center gap-2">
        <svg class="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5z" />
        </svg>
        ข้อมูลการติดต่อ
      </h2>
      <Button variant="ghost"  @click="open = true"
        class=" hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 rounded-full p-2.5 flex items-center justify-center">
        <Plus class="w-4 h-4" />
        <!-- เพิ่ม -->
      </Button>
    </div>

    <div class="text-sm text-gray-700 dark:text-purple-100 space-y-1">
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">ชื่อ-สกุล:</span>
        มอร์ตี้ สมิธ
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">ประเภทลูกค้า:</span>
        นิติบุคคล
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">เลขประจำตัวผู้เสียภาษี:</span>
        1234567890123
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">ที่อยู่:</span>
        111/226 หมู่ 16 ต.บ้านเป็ด อ.เมืองขอนแก่น จ.ขอนแก่น 40000
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">อีเมล:
        </span>
        <a href="mailto:morty@gmail.com"
          class="text-purple-600 dark:text-purple-300 hover:underline">morty@gmail.com</a>
      </p>
      <p>
        <span class="font-medium text-gray-600 dark:text-purple-300">เบอร์โทร:
        </span>
        <a href="tel:+66621896577" class="text-purple-600 dark:text-purple-300 hover:underline">+66 62 189 6577</a>
      </p>
    </div>
    <Dialog v-model:open="open">
    <DialogContent class="gap-0 p-0 outline-none">
      <DialogHeader class="px-4 pb-4 pt-5">
        <DialogTitle>New message</DialogTitle>
        <DialogDescription>
          Invite a user to this thread. This will create a new group
          message.
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
              @select="() => {
                const index = selectedUsers.findIndex(u => u === user)
                if (index !== -1) {
                  selectedUsers.splice(index, 1)
                }
                else {
                  selectedUsers.push(user)
                }
              }"
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
              <Check v-if="selectedUsers.includes(user)" class="ml-auto flex h-5 w-5 text-primary" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <DialogFooter class="flex items-center border-t p-4 sm:justify-between">
        <div v-if="selectedUsers.length > 0" class="flex -space-x-2 overflow-hidden">
          <Avatar
            v-for="user in selectedUsers"
            :key="user.email"
            class="inline-block border-2 border-background"
          >
            <AvatarImage :src="user.avatar" />
            <AvatarFallback>{{ user.name[0] }}</AvatarFallback>
          </Avatar>
        </div>

        <p v-else class="text-sm text-muted-foreground">
          Select users to add to this thread.
        </p>

        <Button
          :disabled="selectedUsers.length < 2"
          @click="open = false"
        >
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </div>
</template>
