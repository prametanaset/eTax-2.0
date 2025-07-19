export default defineNuxtRouteMiddleware(async (to, from) => {
  const skipPaths = ["/"];
  if (skipPaths.includes(to.path)) return;
  if (to.path.startsWith("/.well-known")) return;

  const profileStore = useProfileStore();
  const userService = useUserService();

  try {
    const dataFromService = await userService.getMe();

    if (dataFromService && typeof dataFromService === "object") {
      const plainData = JSON.parse(JSON.stringify(dataFromService));
      profileStore.setProfile(plainData);

      const hasMerchant = plainData?.merchant_info?.merchant;

      if (!hasMerchant && to.path !== "/setting-store") {
        return navigateTo("/setting-store");
      }
    } else {
      console.warn("getMe() returned invalid data:", dataFromService);
    }
  } catch (error) {
    console.error("Failed to fetch user profile in middleware:", error);
    // return navigateTo('/login');
  }
});
