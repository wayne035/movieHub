import NextAuth,{ DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth'{
    interface Session {
      user: DefaultSession['user']&{
        id: string;
        username: string;
        uid: string,
        name: string;
      };
    }
  }

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID !,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET !,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.uid = token.sub!;
      return session;
    }
  },
  pages: {
    signIn: '/',
  },
  session: {
    maxAge: 60 * 60,  //1H
  },
  secret: process.env.NEXTAUTH_SECRET!,
});

export { handler as GET, handler as POST };
