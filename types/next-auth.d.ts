// ~/types/next-auth.d.ts
import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    accessToken: string
    refreshToken?: string      // <- เปลี่ยนตรงนี้เป็น optional
    accessTokenExpires: number
  }

  interface Session {
    accessToken?: string
    expiresAt?: number
    refreshToken?: string
    accessTokenExpires?: number
    user?: DefaultSession["user"]
    error?: string
    logout?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
  }
}
export {}
