import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        const { username, password } = credentials;
        let isValid = false;
        let userData = {}

        users.forEach((user) => {
          if (username === user.username && password === user.password) {
            isValid = true;
            userData = user;
          }
        });

        prisma.$disconnect();

        if (isValid) {
          return userData;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
});


