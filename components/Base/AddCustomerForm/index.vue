<script setup lang="ts">


const individual = ref({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
});

const corporate = ref({
  companyName: "",
  tin: "",
  address: "",
  email: "",
});
</script>

<template>
  <Tabs default-value="individual" class="w-full max-w-2xl">
    <TabsList class="grid w-full grid-cols-2 mb-4 bg-primary-200">
      <TabsTrigger value="individual" >บุคคลธรรมดา</TabsTrigger>
      <TabsTrigger value="corporate">นิติบุคคล</TabsTrigger>
    </TabsList>

    <!-- บุคคลธรรมดา -->
    <TabsContent value="individual">
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลบุคคลธรรมดา</CardTitle>
          <CardDescription>กรอกข้อมูลสำหรับลูกค้าทั่วไป</CardDescription>
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
          <Button @click="() => console.log('บุคคลธรรมดา:', individual)">บันทึก</Button>
        </CardFooter>
      </Card>
    </TabsContent>

    <!-- นิติบุคคล -->
    <TabsContent value="corporate">
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลนิติบุคคล</CardTitle>
          <CardDescription>กรอกข้อมูลสำหรับบริษัท/องค์กร</CardDescription>
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
          <Button @click="() => console.log('นิติบุคคล:', corporate)">บันทึก</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>
