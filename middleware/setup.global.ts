export default defineNuxtRouteMiddleware(async (to, from) => {
  const skipPaths = ["/"];

  if (skipPaths.includes(to.path)) return;

  const profileStore = useProfileStore();
  const userService = useUserService();

  try {
    const dataFromService = await userService.getMe();

    if (dataFromService) {
      // 👇 *** FIX: Convert the data to a plain object before setting it in the store ***
      const plainData = JSON.parse(JSON.stringify(dataFromService));
      profileStore.setProfile(plainData);
    }
  } catch (error) {
    // It's good practice to handle potential errors from your API call
    console.error("Failed to fetch user profile in middleware:", error);
    // You might want to redirect to an error page or login page here
    // return navigateTo('/login');
  }
});