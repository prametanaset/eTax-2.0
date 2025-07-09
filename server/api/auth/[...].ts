// ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FetchError } from "ofetch";
interface LoginRes {
  headers: any;
  access_token: string;
  expires_at: string;
  refresh_token: string; // ISO-8601
}

interface RefreshRes {
  access_token: string;
  expires_at: string;
  refresh_token?: string; // Add this field. It's optional for backwards compatibility.
}

const runtimeConfig = useRuntimeConfig();

async function refreshAccessToken(token: any) {
  console.log("Attempting to refresh token...");
  try {
    const res = await $fetch<RefreshRes>(
      `${runtimeConfig.public.apiBase}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: { refresh_token: token.refreshToken },
      }
    );

    console.log("✅ RESPONSE FROM GO BACKEND:", res);

    return {
      ...token,
      accessToken: res.access_token,
      accessTokenExpires: new Date(res.expires_at).getTime(),
      refreshToken: res.refresh_token ?? token.refreshToken,
      error: undefined,
      logout: false, // เพิ่ม flag นี้
    };
  } catch (err: any) {
    // ถ้าเจอ 401 → ติดป้าย logout
    if (err instanceof FetchError && err.response?.status === 401) {
      console.error("❌ Refresh token invalid (401) — force logout");
      return {
        ...token,
        error: "InvalidRefreshToken",
        accessToken: undefined,
        refreshToken: undefined,
        logout: true, // ตรงนี้สำคัญ
      };
    }

    console.error("❌ FAILED TO FETCH FROM GO BACKEND:", err);
    return { ...token, error: "RefreshAccessTokenError", logout: false };
  }
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().apiSecret,

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(
        profile: { id: any; login: any; avatar_url?: string },
        tokens: any
      ) {
        // profile.sub คือ provider UID
        // tokens.access_token คือของ GitHub
        // ดึงข้อมูล OAuth Login จาก backend ตัวเอง
        const res = await $fetch<LoginRes>(
          `${runtimeConfig.public.apiBase}/auth/oauth-login`,
          {
            method: "POST",
            body: {
              provider: "github",
              provider_uid: String(profile.id),
              username: profile.login,
            },
          }
        );
        // คืนค่าแบบเดียวกับ authorize credentials
        return {
          id: profile.id,
          name: profile.login,
          image: profile.avatar_url,
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
          accessTokenExpires: new Date(res.expires_at).getTime(),
        };
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent", // ขอให้ผู้ใช้ยืนยันทุกครั้ง
          access_type: "offline", // เพื่อให้ได้ refresh_token
          response_type: "code",
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/gmail.readonly",
          ].join(" "),
        },
      },
      async profile(
        profile: { sub: any; email: any; name: any; picture: any },
        tokens: any
      ) {
        const res = await $fetch<LoginRes>(
          `${runtimeConfig.public.apiBase}/auth/oauth-login`,
          {
            method: "POST",
            body: {
              provider: "google",
              provider_uid: profile.sub,
              username: profile.email,
            },
          }
        );

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
          accessTokenExpires: new Date(res.expires_at).getTime(),
        };
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {},
      async authorize({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) {
        const res = await $fetch<LoginRes>(
          `${runtimeConfig.public.apiBase}/auth/login`,
          {
            method: "POST",
            body: { username, password },
            credentials: "include",
          }
        );

        if (!res.access_token) return null;

        return {
          id: username,
          name: username,
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
          accessTokenExpires: new Date(res.expires_at).getTime(),
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.accessTokenExpires = (user as any).accessTokenExpires;
        token.logout = false;

        if (account.provider === "google") {
          token.googleAccessToken = account.access_token;
          token.googleRefreshToken = account.refresh_token;
          token.googleTokenExpires = account.expires_at;
        }

        return token;
      }

      // ดึง token ใหม่ทุกครั้ง (ไม่เช็ก Date.now() แล้ว)
      const refreshed = await refreshAccessToken(token);
      return refreshed;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      session.accessTokenExpires = token.accessTokenExpires as
        | number
        | undefined;
      session.error = token.error as string | undefined;
      session.logout = token.logout as boolean | undefined;

      session.googleAccessToken = token.googleAccessToken as string | undefined;
      session.googleRefreshToken = token.googleRefreshToken as
        | string
        | undefined;
      session.googleTokenExpires = token.googleTokenExpires as
        | string
        | undefined;

      return session;
    },
  },

  events: {
    async signOut({ token }) {
      console.log("token sign out:", token);
      try {
        if (!token?.refreshToken) return;

        await $fetch(`${runtimeConfig.public.apiBase}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            refresh_token: token.refreshToken,
          },
          credentials: "include",
        });
      } catch (e) {
        console.error("logout failed", e);
      }
    },
  },

  pages: { signIn: "/" },
});
