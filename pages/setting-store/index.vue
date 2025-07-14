<script setup lang="ts">
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const { signOut } = useAuth();

definePageMeta({
  layout: false,
})
const loading = ref(false);
const error = ref("");

const handleSignOut = async () => {
  loading.value = true;
  error.value = "";
  try {
    await signOut({ callbackUrl: "/" });
  } catch (e: any) {
    error.value = e?.message || "Logout failed";
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div
    class="relative flex-col items-center justify-center min-h-screen md:grid lg:grid-cols-[1fr_65%] lg:px-0 bg-white dark:bg-[#0f1729]"
  >
  <div class="absolute right-4 top-4 md:right-8 md:top-8 flex items-center z-20">
  <Button
    variant="link"
    href="#"
    @click="handleSignOut"
    :class="cn(buttonVariants({ variant: 'link' }))"
    class="pl-1"
  >
    {{ "ออกจากระบบ" }}
  </Button>
</div>
    <!-- Login form block moved to the left -->
    <div class="min-h-screen w-full flex items-center justify-center p-4 py-0">
      <div class="w-full max-w-sm">
        <base-user-store-form />
      </div>
    </div>

    <!-- Branding panel moved to the right -->
    <div
      class="relative hidden h-full w-full flex-col bg-muted text-white dark:border-l lg:flex  overflow-hidden"
    >
      <div class="absolute inset-0 bg-white z-0"></div>
      <div
        class="relative z-20 flex items-center text-lg font-medium font-poppins"
      >
        <base-preview-store-setting />
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins {
  font-family: Poppins;
}
</style>
