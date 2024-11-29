import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
       
      }
      console.log("token1", token)
      console.log("user1", user)
      return token
    },
    async session({ session, token }) {
        console.log("token2", token)
        console.log("session2", session)
      return session
    },
  },
});

