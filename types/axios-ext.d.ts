// types/axios-ext.d.ts
import 'axios'
declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean
  }
}
