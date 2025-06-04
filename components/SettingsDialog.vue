<template>
  <Dialog :open="modelValue" @update:open="$emit('update:modelValue', $event)">
    <DialogContent
      class="flex flex-col p-0 max-h-[90dvh] min-h-[90dvh] md:min-h-[600px] min-w-[300px] md:min-w-[800px]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>ตั้งค่า</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />
      <div class="px-6">
        <Tabs
          default-value="profile"
          orientation="vertical"
          class="flex md:flex-row flex-col sm:gap-12 font-semilight"
        >
          <TabsList
            class="flex flex-col items-start h-full w-full md:w-[13rem] bg-transparent gap-2"
          >
            <TabsTrigger
              v-for="(data, index) in tabTriggerData"
              :key="index"
              :value="data.value"
              class="data-[state=active]:bg-primary-500 data-[state=active]:text-white flex justify-start w-full"
            >
              <span class="flex gap-2 items-center w-full">
                <component :is="data.icon" v-if="data.icon" class="w-4" />
                {{ data.title }}
              </span>
            </TabsTrigger>
          </TabsList>
          <Separator class="md:hidden" />
          <div class="w-full h-full pb-5">
            <TabsContent
              value="profile"
              class="grid gap-4 m-0 overflow-hidden h-full"
            >
              <div class="flex justify-end items-center">
                <Dialog>
                  <DialogTrigger as-child>
                    <span
                      class="flex justify-end items-center gap-2 hover:underline cursor-pointer text-primary-500"
                      >แก้ไขข้อมูลส่วนตัว <SquarePen class="w-4 h-4"
                    /></span>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>แก้ไขข้อมูลส่วนตัว</DialogTitle>
                      <DialogDescription> </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-10">
                      <div class="grid gap-4">
                        <Separator />
                        <p class="text-muted-500 text-sm">ข้อมูลส่วนตัว</p>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="firstname"> ชื่อ </Label>
                            <Input
                              id="firstname"
                              v-model="data_user.firstName"
                            />
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="lastname"> นามสกุล </Label>
                            <Input id="lastname" v-model="data_user.lastName" />
                          </div>
                        </div>
                      </div>

                      <div class="grid gap-4">
                        <Separator />
                        <p class="text-muted-500 text-sm">ช่องทางติดต่อ</p>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="email"> อีเมล </Label>
                            <Input
                              id="email"
                              type="email"
                              v-model="data_user.email"
                            />
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="phone"> เบอร์ติดต่อ </Label>
                            <Input id="phone" v-model="data_user.phone" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter class="justify-end gap-2">
                      <DialogClose as-child>
                        <Button type="button" variant="secondary">
                          ยกเลิก
                        </Button>
                      </DialogClose>
                      <DialogClose as-child>
                        <Button type="button"> บันทึก </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div class="grid gap-6">
                <p class="text-muted-500 text-sm">ข้อมูลส่วนตัว</p>
                <div class="flex justify-between items-center">
                  <p>โลโก้ร้านค้า</p>
                  <Avatar>
                    <AvatarImage
                      src="https://assets.beartai.com/uploads/2023/05/John-Wick-Chapter-4-1.jpg"
                      alt="@unovue"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div class="flex justify-between items-center gap-3">
                  <p>ชื่อ</p>
                  <div class="grid items-center gap-1.5">
                    {{ `${data_user.firstName} ${data_user.lastName}` }}
                  </div>
                </div>
              </div>
              <div class="grid gap-6">
                <Separator />
                <p class="text-muted-500 text-sm">ช่องทางติดต่อ</p>
                <div class="flex justify-between items-center gap-3">
                  <p>อีเมลร้านค้า</p>
                  <div class="grid items-center gap-1.5">
                    {{ data_user.email }}
                  </div>
                </div>
                <div class="flex justify-between items-center gap-3">
                  <p>เบอร์ติดต่อ</p>
                  <div class="grid items-center gap-1.5">
                    {{ data_user.phone }}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="store" class="grid gap-4 m-0">
              <div class="flex justify-end items-center">
                <Dialog>
                  <DialogTrigger as-child>
                    <span
                      class="flex justify-end items-center gap-2 hover:underline cursor-pointer text-primary-500"
                      >แก้ไขข้อมูลร้านค้า <SquarePen class="w-4 h-4"
                    /></span>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>แก้ไขข้อมูลร้านค้า</DialogTitle>
                      <DialogDescription> </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-10">
                      <div class="grid gap-4">
                        <Separator />
                        <p class="text-muted-500 text-sm">ข้อมูลส่วนตัว</p>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="firstname"> ชื่อ </Label>
                            <Input
                              id="firstname"
                              v-model="data_user.firstName"
                            />
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="lastname"> นามสกุล </Label>
                            <Input id="lastname" v-model="data_user.lastName" />
                          </div>
                        </div>
                      </div>

                      <div class="grid gap-4">
                        <Separator />
                        <p class="text-muted-500 text-sm">ช่องทางติดต่อ</p>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="email"> อีเมล </Label>
                            <Input
                              id="email"
                              type="email"
                              v-model="data_user.email"
                            />
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="phone"> เบอร์ติดต่อ </Label>
                            <Input id="phone" v-model="data_user.phone" />
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="grid flex-1 gap-2">
                            <Label for="address"> ที่อยู่ </Label>
                            <Textarea
                              id="address"
                              v-model="data_user.address"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter class="justify-end gap-2">
                      <DialogClose as-child>
                        <Button type="button" variant="secondary">
                          ยกเลิก
                        </Button>
                      </DialogClose>
                      <DialogClose as-child>
                        <Button type="button"> บันทึก </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div class="grid gap-6">
                <p class="text-muted-500 text-sm">ข้อมูลร้านค้า</p>

                <div class="flex justify-between items-center">
                  <p>โลโก้ร้านค้า</p>
                  <Avatar>
                    <AvatarImage
                      src="https://store-images.s-microsoft.com/image/apps.2971.13599037783181022.b05b7adf-6b7a-44ae-9a70-9dc9370ea7e6.1a5616ff-237c-407f-a1b2-c07e10ac7c04"
                      alt="@unovue"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div class="flex justify-between items-center gap-3">
                  <p>ชื่อร้านค้า</p>
                  <div class="grid items-center gap-1.5">
                    Nvidia Corporation
                  </div>
                </div>
                <div class="flex justify-between items-center gap-3">
                  <p>หมายเลขผู้เสียภาษี</p>
                  <div class="grid items-center gap-1.5">0123456789123</div>
                </div>
              </div>
              <div class="grid gap-6">
                <Separator />
                <p class="text-muted-500 text-sm">ช่องทางติดต่อ</p>
                <div class="flex justify-between items-center gap-3">
                  <p>อีเมลร้านค้า</p>
                  <div class="grid items-center gap-1.5">
                    {{ data_user.email }}
                  </div>
                </div>
                <div class="flex justify-between items-center gap-3">
                  <p>เบอร์ติดต่อ</p>
                  <div class="grid items-center gap-1.5">
                    {{ data_user.phone }}
                  </div>
                </div>
                <div class="flex justify-between items-start gap-3">
                  <p>ที่อยู่</p>
                  <div class="grid max-w-[300px] text-end items-center gap-1.5">
                    {{ data_user.address }}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="payment" class="grid gap-6 m-0">
              <RadioGroup v-model="selectedCardId">
                <Card
                  v-for="data in paymentMethod"
                  :key="data.id"
                  :class="[
                    'flex w-full items-center gap-2 p-2 relative',
                    data.default
                      ? 'border border-primary-500 bg-purple-500/20'
                      : '',
                  ]"
                >
                  <RadioGroupItem
                    :value="data.id"
                    class="peer"
                    :id="`card-${data.id}`"
                  />
                  <label
                    :for="`card-${data.id}`"
                    class="p-3 flex gap-3 w-full cursor-pointer rounded-md transition-all duration-200 peer-checked:border-primary-500 peer-checked:shadow-sm"
                  >
                    <div class="w-12 p-1 rounded-sm">
                      <img
                        v-if="data.type === 'visa'"
                        src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
                        alt="Visa"
                      />
                      <img
                        v-if="data.type === 'mastercard'"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png"
                        alt="Mastercard"
                      />
                    </div>
                    <div class="text-sm">
                      <p>**** **** **** {{ data.cardNumber.slice(-4) }}</p>
                      <p class="text-xs text-muted-foreground">
                        หมดอายุ {{ data.exp }}
                      </p>
                    </div></label
                  ><Trash
                    @click.stop="console.log('delete card successfully')"
                    class="absolute top-[35%] right-4 w-5 text-red-500 z-99 cursor-pointer"
                  />
                </Card>
              </RadioGroup>
              <div class="flex">
                <Dialog>
                  <DialogTrigger as-child>
                    <span
                      class="flex items-center gap-2 cursor-pointer hover:underline text-sm"
                      ><Plus class="w-4" /> เพิ่มช่องทางชำระเงิน
                    </span>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right"> Name </Label>
                        <Input
                          id="name"
                          value="Pedro Duarte"
                          class="col-span-3"
                        />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="username" class="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value="@peduarte"
                          class="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit"> Save changes </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { SquarePen, Trash, Plus } from "lucide-vue-next";
const props = defineProps<{
  modelValue: boolean;
  tabTriggerData: Array<{ title: string; value: string; icon?: any }>;
}>();

const emit = defineEmits(["update:modelValue"]);

const data_user = {
  id: 1,
  firstName: "John",
  lastName: "Wick",
  email: "prametanaset147@gmail.com",
  phone: "098-765-321",
  taxNo: "1111111111111",
  profileUrl: "",
  address: "3801 Chalk Butte Rd, Cut Bank, MT 59427, United States",
  address2: "",
  payment: {},
};

const paymentMethod = [
  {
    id: 1,
    cardNumber: "0123456789012345",
    exp: "12/28",
    cardName: "John Wick",
    type: "visa",
    default: true,
  },
  {
    id: 2,
    cardNumber: "0123456789012345",
    exp: "12/28",
    cardName: "John Wick",
    type: "mastercard",
    default: false,
  },
];

const selectedCardId = ref(
  paymentMethod.find((card) => card.default)?.id || null
);
</script>

<style></style>
