// ~/composables/useUserService.ts
import { useFetch } from '#app'   // หรือใช้ $fetch ตรง ๆ ก็ได้

export function useUserService() {
  const { apiClient } = useApiClient();

  async function getMe() {
    const response = await apiClient.get("/me");
    return response.data;
  }

  // async function updateProfile(payload: any) {
  //   const response = await apiClient.put("/api/profile", payload);
  //   return response.data;
  // }

  async function checkEmail(payload: { username: string }) {
    return apiClient.post("/auth/check-email", payload, {
      skipAuth: true,
    } as any);
  }

  async function register(payload: { username: string, password: string, otp_ref: string, otp_code: string }) {
    return apiClient.post("/auth/register", payload, {
      skipAuth: true,
    } as any);
  }

  return {
    checkEmail,
    register,
    getMe
  };
}
