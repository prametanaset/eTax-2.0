<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Check, X, Clock10Icon } from "lucide-vue-next";
import type { Customer } from "~/types/customer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { toast } from "~/components/ui/toast/use-toast";

const customerStore = useCustomerStore();

onMounted(() => {
  customerStore.getCustomer();
});

const customers = computed(() =>
  mapCustomerResponseToCustomer(customerStore.customerList)
);
const selectedUser = ref<Customer | null>(null);
const isDialogOpen = ref(false);

const { createCustomerService, updateCustomerService, deleteCustomerService } =
  useCustomerService();

const handleSelect = (customer: Customer) => {
  selectedUser.value = customer;
};

const handleCreateCustomer = async (newCustomer: Customer) => {
  try {
    // console.log(newCustomer);
    const type = newCustomer.branchCode ? "company" : "person";
    if (newCustomer.branchCode) {
      const payload = {
        ...newCustomer,
        firstName: `${newCustomer.companyName}`,
      };
      await createCustomerService(payload, type);
    } else {
      await createCustomerService(newCustomer, type);
    }

    isDialogOpen.value = false;
    await customerStore.getCustomer();
    toast({ title: "เพิ่มข้อมูลลูกค้าสำเร็จ" });
  } catch {
    toast({
      variant: "destructive",
      title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลลูกค้า",
    });
  }
};
</script>

<template>
  <div>
    <div
      class="bg-[hsl(var(--card))] border border-purple-700 rounded-lg p-4 h-full relative py-7"
      v-if="!selectedUser"
    >
      <!-- Popover เลือกลูกค้า -->
      <Dialog>
        <DialogTrigger as-child>
          <Button
            variant="outline"
            class="absolute top-[50%] left-[50%]"
            style="transform: translate(-50%, -50%)"
            ><Plus />เลือกข้อมูลลูกค้า</Button
          >
        </DialogTrigger>
        <DialogContent>
          <Command class="bg-transparent">
            <CommandInput placeholder="ค้นหาชื่อลูกค้า..." />
            <CommandList>
              <CommandEmpty>ไม่พบลูกค้า</CommandEmpty>
              <CommandGroup>
                <CommandItem value="add" @click="isDialogOpen = true">
                  <span class="text-primary-500 flex cursor-pointer gap-2">
                    <Plus /> เพิ่มข้อมูลลูกค้า</span
                  >
                </CommandItem>
                <CommandItem
                  v-for="p in customers"
                  :key="p.ID"
                  :value="p.ID"
                  @select="handleSelect(p)"
                >
                  <div
                    v-if="p.CustomerType === 'บุคคลธรรมดา'"
                    class="text-md flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar>
                      <AvatarFallback class="dark:text-white">{{
                        p.FirstName[0] + p.LastName[0]
                      }}</AvatarFallback>
                    </Avatar>
                    <div class="">
                      <p>{{ p.FirstName }} {{ p.LastName }}</p>
                      <span class="text-sm text-muted-500">{{ p.Tin }}</span>
                    </div>
                  </div>
                  <div
                    v-else
                    class="text-md flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar>
                      <AvatarFallback class="dark:text-white">{{
                        p.FirstName[0] + p.FirstName[1]
                      }}</AvatarFallback>
                    </Avatar>
                    <div class="">
                      <p>{{ p.FirstName }}</p>
                      <span class="text-sm text-muted-500">{{ p.Tin }}</span>
                    </div>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      <BaseAddCustomerForm
        v-model="isDialogOpen"
        mode="create"
        @customer-added="handleCreateCustomer"
      />
    </div>

    <!-- แสดงข้อมูลลูกค้าที่เลือกแล้ว -->
    <div
      v-else
      class="bg-purple-10 dark:bg-purple-950/60 border dark:border-purple-700 rounded-lg p-4 h-full relative"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <X
              @click="selectedUser = null"
              class="absolute right-3 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>ล้างข้อมูล</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div class="flex items-center justify-between mb-4">
        <h2
          class="text-purple-700 dark:text-purple-400 text-lg font-semibold flex items-center gap-2"
        >
          <svg
            class="w-5 h-5 text-purple-500 dark:text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5z"
            />
          </svg>
          ข้อมูลลูกค้า
        </h2>
      </div>

      <div class="text-base text-gray-700 dark:text-purple-100 space-y-1">
        <p v-if="selectedUser.CustomerType === 'person'">
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >ชื่อ-สกุล:</span
          >
          {{ selectedUser.FirstName }} {{ selectedUser.LastName }}
        </p>
        <p v-else>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >ชื่อบริษัท:</span
          >
          {{ selectedUser.FirstName }}
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >อีเมล:</span
          >
          {{ selectedUser.Email }}
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >เบอร์โทร:</span
          >
          {{ selectedUser.Phone }}
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >ที่อยู่:</span
          >
          {{ selectedUser.Address }}
        </p>
        <p v-if="selectedUser.Tin">
          <span class="font-medium text-gray-600 dark:text-purple-300"
            >เลขประจำตัวผู้เสียภาษี:</span
          >
          {{ selectedUser.Tin }}
        </p>
      </div>
    </div>
  </div>
</template>
