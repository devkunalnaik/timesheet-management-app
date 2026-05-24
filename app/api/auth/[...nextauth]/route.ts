import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { headers, cookies } from "next/headers";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email === "admin@tentwenty.test" && password === "password") {
          return { id: "1", name: "Admin", email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
