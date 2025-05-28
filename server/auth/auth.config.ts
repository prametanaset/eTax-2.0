// server/auth.config.ts
import GoogleProvider from "next-auth/providers/google";
// หรือ provider อื่นที่คุณใช้

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // ✅ ใช้ JWT strategy แทน Pinia/store
  },
  secret: process.env.AUTH_SECRET,
};
