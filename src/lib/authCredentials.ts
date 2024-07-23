'use server';

import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { object, string } from 'zod';

import { hash512 } from './crypto';
import prisma from './prisma';

const SignInSignUpSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      type: 'credentials',
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        console.log('credentials', credentials);

        let user = null;

        try {
          var { email, password } = SignInSignUpSchema.parse(credentials);
        } catch (error) {
          throw new Error('INVALID_CREDENTIALS');
        }

        user = await prisma.user.findUnique({ where: { email } });
        // user = { id: 1, email: 'john.doe@example.fr' };

        if (!user || user.password !== hash512(password)) {
          throw new Error('USER_NOT_FOUND');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;

      return session;
    },
  },
});

export const signUp = async (formData: FormData) => {
  const body = Object.fromEntries(formData);

  try {
    var { email, password } = SignInSignUpSchema.parse(body);
  } catch (error) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  await prisma.user.create({
    data: {
      email,
      password: hash512(password),
    },
  });
};
