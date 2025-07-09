// ~/composables/useGmailClient.ts
import axios, { AxiosError, AxiosHeaders, type AxiosInstance } from 'axios'
import { useAuth } from '#imports'

export function useGmailClient() {
  const { data: session, getSession, signOut } = useAuth()

  const gmailApi = axios.create({
    baseURL: 'https://gmail.googleapis.com/gmail/v1',
  })

  // 🟩 Request interceptor: แนบ access token ของ Google
  gmailApi.interceptors.request.use((cfg) => {
    if (session.value?.googleAccessToken) {
      cfg.headers ??= new AxiosHeaders()
      cfg.headers.set('Authorization', `Bearer ${session.value.googleAccessToken}`)
    }
    return cfg
  })

  // 🟥 Response interceptor: ถ้า token หมดอายุ → ลอง refresh session
  gmailApi.interceptors.response.use(
    res => res,
    async (err: AxiosError) => {
      const originalRequest = err.config as any
      if (err.response?.status !== 401 || originalRequest._retry) {
        throw err
      }

      originalRequest._retry = true

      try {
        await getSession({ force: true })

        if (session.value?.googleAccessToken) {
          originalRequest.headers.set('Authorization', `Bearer ${session.value.googleAccessToken}`)
          return gmailApi(originalRequest)
        }

        await signOut({ callbackUrl: '/' })
        throw err
      } catch (e) {
        await signOut({ callbackUrl: '/' })
        throw e
      }
    }
  )

  return { gmailClient: gmailApi }
}
