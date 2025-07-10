<script lang="ts" setup>
import { Menu, Search, Star } from "lucide-vue-next";
import { computed, ref } from "vue";
import MailDisplay from "./MailDisplay.vue";
import MailList from "./MailList.vue";
// import Nav from "./Nav.vue";

const searchValue = ref("");
const mailStore = useMailStore();

// const filteredMailList = computed(() => {
//   let output: Mail[] = [];
//   const searchValue = debouncedSearch.value?.trim();
//   if (!searchValue) {
//     output = props.mails;
//   } else {
//     output = props.mails.filter((item) => {
//       return (
//         item.name.includes(debouncedSearch.value) ||
//         item.email.includes(debouncedSearch.value) ||
//         item.name.includes(debouncedSearch.value) ||
//         item.subject.includes(debouncedSearch.value) ||
//         item.text.includes(debouncedSearch.value)
//       );
//     });
//   }

//   return output;
// });
const links = [
  {
    title: "Inbox",
    label: "128",
    icon: "lucide:inbox",
    variant: "default",
  },
  {
    title: "Drafts",
    label: "9",
    icon: "lucide:file",
    variant: "ghost",
  },
  {
    title: "Sent",
    label: "",
    icon: "lucide:send",
    variant: "ghost",
  },
  {
    title: "Junk",
    label: "23",
    icon: "lucide:archive",
    variant: "ghost",
  },
  {
    title: "Trash",
    label: "",
    icon: "lucide:trash",
    variant: "ghost",
  },
  {
    title: "Archive",
    label: "",
    icon: "lucide:archive",
    variant: "ghost",
  },
];

const { data: session, status, signIn } = useAuth();

const handleLogin = async () => {
  await signIn("google");
};
</script>
<template>
  <div class="flex gap-6 lg:h-[calc(99.5dvh-3.5rem)] overflow-hidden">
    <!-- Sidebar mail -->
    <!-- <div class="hidden xl:block w-64 h-full">
      <Nav class="h-full" :links="links" />
    </div> -->

    <!-- Main content -->
    <BaseGoogleAuthLogin v-if="!session?.googleAccessToken" />

    <div v-else class="flex flex-col h-full w-full gap-3 relative">
      <div
        class="flex gap-1 lg:max-w-[30rem] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2 px-2 xl:px-0"
      >
        <!-- ✅ แสดง Nav ใน Drawer (เฉพาะจอเล็ก) -->
        <!-- <Sheet>
          <SheetTrigger as-child class="lg:hidden">
            <Button variant="outline"> <Menu /> </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Nav :links="links" />
          </SheetContent>
        </Sheet> -->

        <!-- ✅ กล่องค้นหา -->
        <form class="w-full xl:ml-3">
          <div class="relative">
            <Search
              class="absolute left-2 top-2.5 size-4 text-muted-foreground"
            />
            <Input
              v-model="searchValue"
              placeholder="ค้นหา"
              class="pl-8 w-full"
            />
          </div>
        </form>
      </div>
      <div class="h-full">
        <!-- ✅ รายการเมล -->
        <MailList />
      </div>
      <div
        :class="[
          'absolute z-[2] bg-background w-full xl:w-[50%] h-full xl:border border-muted-300 dark:border-muted-800 rounded-md transition-transform duration-200 ease-in-out top-0 overflow-y-auto',
          mailStore.selectMail !== null
            ? 'translate-x-0 xl:translate-x-[101%] '
            : 'translate-x-full xl:translate-x-[200%]',
        ]"
      >
        <MailDisplay />
      </div>
    </div>
  </div>
</template>
