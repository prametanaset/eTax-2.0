<template>
  <div>
    <Card>
      <div class="flex justify-between p-4 gap-4">
        <div class="relative w-full max-w-sm items-center">
          <Input id="search" type="text" placeholder="ค้นหาพนักงาน..." class="pl-10" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div class="">
          <BaseDialog text='เพิ่มพนักงาน' bg-button='bg-primary-500' title='เพิ่มพนักงาน' >
            <template #content>
                <div class='grid gap-y-4'>
                  <div>
                    <Label>ชื่อ</Label>
                    <Input placeholder='กรอกชื่อ'/>
                  </div>
                  <div>
                    <Label>นามสกุล</Label>
                    <Input placeholder='กรอกนามสกุล'/>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input placeholder='' type='email'/>
                  </div>
                  <div>
                    <Label>รายละเอียดสินค้า</Label>
                    <Textarea placeholder='กรอกชื่อสินค้า'/>
                  </div>
                  
                </div>
            </template>
            <template #footer>
              <div class='flex justify-end '>
                <div class='flex gap-2'>
                  <Button variant="outline">ยกเลิก</Button>
                  <Button type="submit">สร้าง</Button>
                </div>
              </div>
            </template>
          </BaseDialog>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
definePageMeta({
  title:'รายชื่อพนักงาน'
})
</script>

<style>

</style>