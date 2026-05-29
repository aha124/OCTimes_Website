import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
import { isAdminEmail } from "./kv";

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    isAdmin?: boolean;
  }
}

/**
 * Full auth setup, used by API routes, server components, and the
 * /api/auth/[...nextauth] handler. The `signIn` and `jwt` callbacks here
 * touch KV — that's why this is separate from the edge-safe auth.config.ts.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      return await isAdminEmail(user.email);
    },
    async jwt({ token, user }) {
      // On sign-in, `user` is set. Stamp isAdmin onto the token so the
      // edge middleware can read it without touching KV.
      if (user?.email) {
        token.isAdmin = await isAdminEmail(user.email);
      }
      return token;
    },
  },
});
