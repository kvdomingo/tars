import { createUser, getUser } from '@/lib/db/queries';
import NextAuth, { type DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';

export type UserType = 'regular';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    email?: string | null;
    type: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user already exists
          const existingUsers = await getUser(user.email);
          if (existingUsers.length > 0) {
            // Update user ID in the token
            user.id = existingUsers[0].id;
            return true;
          }

          // Create new user
          const newUser = await createUser(user.email);
          user.id = newUser.id;
          return true;
        } catch (error) {
          console.error('Failed to create/get user:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.type = user.type;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }

      return session;
    },
  },
});
