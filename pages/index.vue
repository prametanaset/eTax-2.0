<template>
  <div>
    <!-- main page -->
  </div>
</template>

<script setup>
// import liff from "@line/liff";

definePageMeta({
  key: (route) => route.fullPath,
  layout: "blank",
});
useHead({
  title: "หน้าหลัก",
});
// const route = useRoute();
const checkAuth = () => {
  // router.replace({ path: "/auth/login" });
  navigateTo("/auth/login");

  //   const isLoggedIn = status.value === "authenticated";
  //   console.log(status.value, lineStore.isLoggedIn);
  //   if (lineStore.isLoggedIn) {
  //     if (window.location.search.startsWith("liff.state")) {
  //       //
  //     } else if (!(localStorage.getItem("syncToken") || localStorage.getItem("redirectUrl"))) {
  //       if (isLoggedIn && route.path === "/") {
  //         router.replace({ path: "/profile" });
  //       } else {
  //         router.replace({ path: "/auth/signin" });
  //       }
  //     } else if (localStorage.getItem("syncToken") || localStorage.getItem("redirectUrl")) {
  //       router.replace({ path: "/auth/sync" });
  //     }
  //   } else {
  //     router.replace({ path: "/auth/signin" });
  //   }
};

onNuxtReady(() => {
  checkAuth();
});
</script>
