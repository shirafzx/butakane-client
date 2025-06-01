import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
    };
  }

  interface User {
    id: string;
    username?: string;
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.token) {
            return {
              id: data.userId || data.userName || credentials.username,
              username: data.userName,
              name: data.userName,
              accessToken: data.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the access token to the token right after signin
      if (user?.accessToken) {
        token.accessToken = user.accessToken as string;
        token.username = user.username as string;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.username) {
        session.user.username = token.username as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in", // Optional: customize sign-in page
  },
  session: {
    strategy: "jwt",
  },
  // Optional: Add secret for production
  secret: process.env.NEXTAUTH_SECRET,
});
