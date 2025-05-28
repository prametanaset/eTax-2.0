import { NuxtAuthHandler } from "#auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { useAuthService } from "~/composables/useAuthService";

const { login, getAccessToken, getMe } = useAuthService();

async function refreshAccessToken(token: any) {
  try {
    // Get access token
    const accessToken = await getAccessToken(token.refreshToken);

    return {
      ...token,
      user: {
        ...token.user,
        accessToken: accessToken.data.accessToken,
        accessTokenExpires: accessToken.data.accessExpireAt * 1000,
      },
    };
  } catch (e) {
    // console.error(e.response.data);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials.default({
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
      authorize: async (credentials) => {
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
    // @ts-ignore
    async jwt({ token, account, profile, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token, user }) {
      if (token.user) {
        // Return previous token if the access token has not expired yet
        // @ts-ignore
        if (Date.now() < token.user.accessTokenExpires) {
          return {
            ...session,
            user: token.user,
          };
        }
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      }
      // console.log("hellow", token.user);
      return {
        ...session,
        user: token.user,
      };
    },
    async signIn({ user, account, profile, email, credentials }) {
      return !!user;
    },
  },
});
