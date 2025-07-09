// ~/composables/useUserService.ts
import { useFetch } from '#app'   // หรือใช้ $fetch ตรง ๆ ก็ได้

export function useUserService() {
  const { apiClient } = useApiClient();

  async function getMe() {
    const response = await apiClient.get("/me");
    return response.data;
  }

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

  async function resetPassword(payload: { reset_token: string, new_password: string }) {
    return apiClient.post("/auth/reset-password", payload, {
      skipAuth: true,
    } as any);
  }

  return {
    checkEmail,
    register,
    getMe,
    resetPassword
  };
}
