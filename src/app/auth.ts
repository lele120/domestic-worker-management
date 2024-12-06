import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { CredentialsConfig } from "next-auth/providers/credentials";
import { saltAndHashPassword } from '@/utils/password';
import { signInSchema, ZodError } from "./lib/zod"

const credential: CredentialsConfig = Credentials({
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  
  authorize: async (credentials: Partial<Record<"email" | "password", unknown>>, request: Request) => {
    let _email: string = '', _password: string = ''
    try {
      console.log(credentials,request)
      // Validate the credentials
      const {email,password} = await signInSchema.parseAsync(credentials)
      _email = email
      _password = password

 
    }catch (error) {
      if (error instanceof ZodError) {
        // Return `null` to indicate that the credentials are invalid
        return null
      }
    }
    let user = null
    // logic to salt and hash password
    const pwHash = saltAndHashPassword(_password)

    // logic to verify if the user exists
    user = await getUserFromDb(_email, pwHash)

    if (!user) {
      // No user found, so this is their first attempt to login
      // Optionally, this is also the place you could do a user registration
      throw new Error("Invalid credentials.")
    }

    // return user object with their profile data
    return user
  },
})

const googleProvider = GoogleProvider({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credential, googleProvider,
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




