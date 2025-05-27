import { NuxtAuthHandler } from "#auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    // ✅ ใช้ .default เพื่อให้ TypeScript เข้าใจ
    Credentials.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize: async (credentials) => {
      //   try {
      //     const res = await axios.post("https://your-api.com/login", {
      //       email: credentials?.email,
      //       password: credentials?.password,
      //     });

      //     const { user, accessToken, refreshToken } = res.data;

      //     return {
      //       ...user,
      //       accessToken,
      //       refreshToken,
      //       accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hr
      //     };
      //   } catch (e) {
      //     console.error("Login failed", e);
      //     return null;
      //   }
      // },
      authorize: async (credentials: any) => {
        const email = credentials?.email;
        const password = credentials?.password;

        // ✅ จำลองข้อมูลผู้ใช้ (Mock)
        if (email === "test@example.com" && password === "123456") {
          const user = {
            userId: "123",
            name: "Bas",
            email: "test@example.com",
            accessToken: "mock-access-token",
            refreshToken: "mock-refresh-token",
            accessTokenExpires: Date.now() + 60 * 60 * 1000,
          };
          return user;
        }

        // ❌ ไม่ตรงเงื่อนไขให้ login fail
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
