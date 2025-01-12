import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password diperlukan");
        }

        const { email, password } = credentials;

        // Cek user di database postgres
        const existingUser = await sql`
                   SELECT * FROM Users WHERE email = ${email}`;

        if (!existingUser.rows[0]) {
          throw new Error("Email tidak terdaftar 😭");
        }

        // Cek jika user terdaftar dengan Google
        if (existingUser.rows[0].provider === "google") {
          throw new Error("Silakan login menggunakan Google 🤗");
        }

        // Verifikasi password
        const isValid = await bcrypt.compare(
          password,
          existingUser.rows[0].password,
        );

        if (!isValid) {
          throw new Error("Password salah 🤨");
        }

        // Return user data
        return {
          id: existingUser.rows[0].userid,
          email: existingUser.rows[0].email,
          name: existingUser.rows[0].nama,
          telepon: existingUser.rows[0].telepon,
        };
      },
    }),
  ],

  pages: {
    signIn: "/account/login",
    error: "/error/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check akun udh terdaftar atau belum
          const existingUser = await sql`
                    SELECT * FROM Users WHERE email = ${user.email}`;

          if (existingUser.rows.length > 0) {
            if (existingUser.rows[0].provider !== "google") {
              throw new Error(
                "Email sudah terdaftar, silakan login dengan password",
              );
            }
          } else {
            // Register new Google user
            await sql`
                    INSERT INTO Users (nama, email, provider, telepon, password)
                    VALUES (${user.name}, ${user.email}, 'google', '', '') RETURNING *`;
          }

          user.id = existingUser.rows[0]?.userid || null;
          user.telepon = existingUser.rows[0]?.telepon || null;

          return true;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.telepon = token.telepon as number;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.telepon = user.telepon;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
