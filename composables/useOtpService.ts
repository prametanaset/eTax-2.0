export function useUseOtpService() {
  const { apiClient } = useApiClient();

  async function sendOtp(payload: { email: string, purpose: string }) {
    return apiClient.post("/auth/send-otp", payload, {
      skipAuth: true,
    } as any);
  }

  async function verifyOtp(payload: { email: string, ref: string, code: string }) {
    return apiClient.post("/auth/verify-otp", payload, {
      skipAuth: true,
    } as any);
  }

  return {
    sendOtp,
    verifyOtp
  }
}
