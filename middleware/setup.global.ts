export default defineNuxtRouteMiddleware(async (to, from) => {
  const skipPaths = ["/"];

  if (skipPaths.includes(to.path)) return;
  if (to.path.startsWith('/.well-known')) return;

  const profileStore = useProfileStore();
  const userService = useUserService();

  try {
    const dataFromService = await userService.getMe();

    if (dataFromService) {
      // แปลงเป็น plain object เพื่อหลีกเลี่ยงปัญหา reactivity
      const plainData = JSON.parse(JSON.stringify(dataFromService));
      profileStore.setProfile(plainData);

      // ป้องกัน error กรณี profileStore.user ยังไม่ถูก reactive ทันที
      const hasMerchant = plainData?.merchant;

      if (!hasMerchant && to.path !== '/setting-store') {
        return navigateTo('/setting-store');
      }
    }
  } catch (error) {
    console.error("Failed to fetch user profile in middleware:", error);
    // return navigateTo('/login');
  }
});
