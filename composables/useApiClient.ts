// ~/composables/useApiClient.ts
import axios, {
  AxiosHeaders,
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig
} from 'axios'
import { useAuth } from '#imports'

let refreshPromise: Promise<any> | null = null

export function useApiClient() {
  const runtimeConfig = useRuntimeConfig()
  const { data: session, getSession, signOut } = useAuth()

  /**
   * A single promise to ensure `getSession` is only called once
   * during concurrent failing requests.
   */

  const api = axios.create({
    baseURL: runtimeConfig.public.apiBase,
    withCredentials: true
  })

  /* ---------- ① Request interceptor ---------- */
  // This interceptor will now only be responsible for adding the token to initial requests.
  api.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
    if (session.value?.accessToken) {
      cfg.headers ??= new AxiosHeaders();
      (cfg.headers as AxiosHeaders).set('Authorization', `Bearer ${session.value.accessToken}`)
    }
    return cfg
  })

  /* ---------- ② Response interceptor (Robust Version) ---------- */
  api.interceptors.response.use(
    r => r,
    async (err: AxiosError) => {
      const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean; headers: AxiosHeaders }

      if (err.response?.status !== 401 || originalRequest._retry) {
        throw err
      }

      originalRequest._retry = true

      if (!refreshPromise) {
        // console.log('Triggering token refresh...');
        refreshPromise = getSession({ force: true }).catch(async (e) => {
          // If refresh fails, log out the user
          await signOut({ redirect: false }) 
          throw e
        }).finally(() => {
          // console.log('Refresh promise finished.');
          refreshPromise = null
        })
      }
      
      try {
        await refreshPromise

        if (session.value?.logout) {
          await signOut({ callbackUrl: '/' })   // หรือ false ตามต้องการ
          throw err  // ดัน error กลับไปให้ caller รู้ว่าถูกตัด
        }

        // === THE CRITICAL FIX ===
        // After the refresh is complete, the `session.value` IS updated.
        // We manually set the header on the originalRequest config for the retry.
        // This avoids any race conditions with the request interceptor.
        if (session.value?.accessToken) {
            // console.log('Retrying request with new token.');
            originalRequest.headers.set('Authorization', `Bearer ${session.value.accessToken}`)
        }

        // Retry the request with the now-guaranteed fresh token.
        return api(originalRequest)
      } catch (e) {
        // console.error('Failed to refresh token or retry request:', e);
        // Rethrow the error to prevent further execution.
        throw e
      }
    }
  )

  return { apiClient: api }
}