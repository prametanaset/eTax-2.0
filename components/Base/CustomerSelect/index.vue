<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { X, Plus } from 'lucide-vue-next'
import type { Customer } from '~/types/customer'
import { toast } from '~/components/ui/toast/use-toast'
const customerStore = useCustomerStore()
const invoiceStore = useInvoiceStore()
const { createCustomerService } = useCustomerService()

onMounted(() => {
  customerStore.getCustomer()
})

const customers = computed(() =>
  mapCustomerResponseToCustomer(customerStore.customerList)
)

const selectedUser = ref<Customer | null>(null)
const isDialogOpen = ref(false)

const handleSelect = (customer: Customer) => {
  selectedUser.value = customer
  // invoiceStore.setBuyerInfo(...) สามารถใส่ logic ได้ที่นี่
}

const handleCreateCustomer = async (newCustomer: Customer) => {
  try {
    const isCompany = Boolean(newCustomer.branchCode)
    const payload = isCompany
      ? { ...newCustomer, firstName: newCustomer.companyName }
      : newCustomer

    await createCustomerService(payload, isCompany ? 'company' : 'person')
    isDialogOpen.value = false
    await customerStore.getCustomer()
    toast({ title: 'เพิ่มข้อมูลลูกค้าสำเร็จ' })
  } catch {
    toast({
      variant: 'destructive',
      title: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลลูกค้า',
    })
  }
}
</script>

<template>
  <div>
    <div
      v-if="!selectedUser"
      class="relative p-4 py-7 rounded-lg h-full bg-gradient-to-r from-violet-200 to-pink-200 dark:bg-[hsl(var(--card))]"
    >
      <BaseCustomerSelectDialog
      :customers="customers"
      @select="handleSelect"
      @open-create="isDialogOpen = true"
    />
      <BaseAddCustomerForm
        v-model="isDialogOpen"
        mode="create"
        @customer-added="handleCreateCustomer"
      />
    </div>

    <div
      v-else
      class="relative p-4 h-full rounded-lg bg-purple-10 border dark:bg-purple-950/60 dark:border-purple-700"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <X
              @click="selectedUser = null"
              class="absolute right-3 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent><p>ล้างข้อมูล</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CustomerCard :customer="selectedUser" />
    </div>
  </div>
</template>
