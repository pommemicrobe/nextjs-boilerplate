import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import auth0 from 'next-auth/providers/auth0';
import resend from 'next-auth/providers/resend';

import prisma from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [auth0, resend],
  callbacks: {
    session({ session, user }: any) {
      session.user = {};
      session.user.id = user.id;
      session.user.email = user.email;

      return session;
    },
  },
});
