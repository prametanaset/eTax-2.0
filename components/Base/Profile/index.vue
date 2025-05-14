<template>
  <div class="flex flex-col md:flex-row gap-5 min-w-[300px]">
    <div class="md:w-[30%] w-full xl:pr-[5rem]">
      <div class="p-2 grid gap-2">
        <div class="profile flex flex-col w-full justify-center gap-2">
          <div class="picture">
            <img v-if="data_user.profileUrl != ''" src="" alt="" />
            <div v-else class="flex justify-center">
              <div class="w-[6rem] h-[6rem] rounded-full bg-muted-500 relative">
                <span class="absolute top-[35%] left-[30%] text-3xl">
                  {{ data_user.firstName[0] + data_user.lastName[0] }}
                </span>
              </div>
            </div>
          </div>
          <div class="name flex justify-center gap-2 text-center w-full">
            <p>{{ data_user.firstName }}</p>
            <p>{{ data_user.lastName }}</p>
          </div>
        </div>
        <Separator />
        <div class="nav flex flex-col">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem v-for="data in navLink" class="py-1">
                <SidebarMenuButton
                  class="w-full"
                  :is-active="route.path === data.link"
                >
                  <NuxtLink
                    :to="data.link"
                    class="flex gap-2 items-center w-full"
                  >
                    <component :is="data.icon" class="w-4" />
                    {{ data.title }}
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </div>
    </div>
    <div class="md:w-[70%] w-full h-full relative group">
      <div
        class="z-1 absolute top-[50%] right-3 w-[90%] h-full lg:h-[50%] bg-primary-400/50 blur-xl rounded-full img-shadow-animation"
      ></div>
      <Card class="px-3 relative z-99">
        <!-- change page -->
        <slot />
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, CreditCard, Store } from "lucide-vue-next";

const props = defineProps({
  profileData: {},
});

const route = useRoute();

const data_user = {
  id: 1,
  firstName: "John",
  lastName: "Wick",
  email: "prametanaset147@gmail.com",
  phone: "098-765-321",
  profileUrl: "",
  address: "3801 Chalk Butte Rd, Cut Bank, MT 59427, United States",
  address2: "",
  payment: {},
};

const navLink = [
  {
    title: "ข้อมูลส่วนตัว",
    icon: User,
    link: "/profile",
  },
  {
    title: "ตั้งค่าร้านค้า",
    icon: Store,
    link: "/profile/store",
  },
  {
    title: "Payment",
    icon: CreditCard,
    link: "/profile/payment",
  },
];
</script>

<style>
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}
</style>
