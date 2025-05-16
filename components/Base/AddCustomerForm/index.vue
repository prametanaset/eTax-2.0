<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'customer-added', customer: { name: string; email: string; avatar: string }): void
}>()

const individual = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
})

const corporate = ref({
  companyName: '',
  tin: '',
  address: '',
  email: '',
})

function addIndividual() {
  const name = `${individual.value.firstName} ${individual.value.lastName}`.trim()
  const email = individual.value.email
  emit('customer-added', { name, email, avatar: '/avatars/default.png' })
  emit('update:open', false)
}

function addCorporate() {
  const name = corporate.value.companyName
  const email = corporate.value.email
  emit('customer-added', { name, email, avatar: '/avatars/default-company.png' })
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <!-- เปลี่ยนสี ความทึบ และเบลอของฉากหลังตรงนี้ -->

    <DialogContent class="max-w-2xl overflow-auto max-h-[90vh]" overlay-class="bg-black-500/10 backdrop-blur-sm">
      <DialogHeader>
        <DialogTitle>เพิ่มลูกค้าใหม่</DialogTitle>
        <DialogDescription>กรอกข้อมูลลูกค้าใหม่</DialogDescription>
      </DialogHeader>

      <Tabs default-value="individual" class="w-full">
        <TabsList class="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="individual">บุคคลธรรมดา</TabsTrigger>
          <TabsTrigger value="corporate">นิติบุคคล</TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลบุคคลธรรมดา</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label>ชื่อ</Label>
                  <Input v-model="individual.firstName" placeholder="ชื่อจริง" />
                </div>
                <div>
                  <Label>นามสกุล</Label>
                  <Input v-model="individual.lastName" placeholder="นามสกุล" />
                </div>
              </div>
              <div>
                <Label>เบอร์โทร</Label>
                <Input v-model="individual.phone" placeholder="0812345678" />
              </div>
              <div>
                <Label>อีเมล</Label>
                <Input v-model="individual.email" placeholder="email@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button @click="addIndividual">บันทึก</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="corporate">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลนิติบุคคล</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div>
                <Label>ชื่อบริษัท</Label>
                <Input v-model="corporate.companyName" placeholder="ชื่อบริษัท" />
              </div>
              <div>
                <Label>เลขประจำตัวผู้เสียภาษี</Label>
                <Input v-model="corporate.tin" placeholder="010xxxxxxxxxxx" />
              </div>
              <div>
                <Label>ที่อยู่</Label>
                <Input v-model="corporate.address" placeholder="ที่อยู่ตามทะเบียน" />
              </div>
              <div>
                <Label>อีเมล</Label>
                <Input v-model="corporate.email" placeholder="email@company.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button @click="addCorporate">บันทึก</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
