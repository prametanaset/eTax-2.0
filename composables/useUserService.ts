// ~/composables/useUserService.ts
import { useFetch } from '#app'   // หรือใช้ $fetch ตรง ๆ ก็ได้

export function useUserService() {
  const { apiClient } = useApiClient();

  async function fetchProfile() {
    const response = await apiClient.get("/api/profile");
    return response.data;
  }

  async function updateProfile(payload: any) {
    const response = await apiClient.put("/api/profile", payload);
    return response.data;
  }

  async function checkEmail(payload: { username: string }) {
    return apiClient.post("/auth/check-email", payload, {
      skipAuth: true,
    } as any);
  }

  async function register(payload: { username: string, password: string }) {
    return apiClient.post("/auth/register", payload, {
      skipAuth: true,
    } as any);
  }

  const getProfile = () =>
    useFetch('/api/protected/user', { key: 'user-profile' })

  return {
    fetchProfile,
    updateProfile,
    checkEmail,
    register,
    getProfile
  };
}
