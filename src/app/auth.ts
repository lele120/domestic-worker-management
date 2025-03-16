import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { CredentialsConfig } from "next-auth/providers/credentials";
//import { saltAndHashPassword } from '@/utils/password';
import { signInSchema, ZodError } from "./lib/zod"
import { getUserFromDb, googleAuth, refreshToken } from "./api/auth/auth.service";
import { ExtendedUser } from "../../next-auth";


// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 60;            // 60 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};


const credential: CredentialsConfig = Credentials({
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  
  authorize: async (credentials: Partial<Record<"email" | "password", unknown>>, request: Request): Promise<ExtendedUser | null> => {
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
    let response = null
    // logic to salt and hash password
    //const pwHash = await saltAndHashPassword(_password)

    // logic to verify if the user exists
    response = await getUserFromDb(_email, _password)

    console.log("authorize-user", response)
    if (!response) {
      // return msg error if user not found
      return null;
    }
    const extendedUser: ExtendedUser = {
      id: response.user.pk.toString(),
      email: response.user.email,
      accessToken: response.access,
      name: response.user.first_name + " " + response.user.last_name,

    }
    // return user object with their profile data
    return extendedUser
  },
})

const googleProvider = GoogleProvider({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code"
    }
  }
})
 
declare module "next-auth" {
  interface Session {
    access_token?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credential, googleProvider,
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME
  },
  events: {
    async linkAccount({user}){
      console.log("link-account", user)
    }
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("sign-in-user", user, account, profile)
      return true
    },
    // Add redirect callback to ensure proper redirection after login
    async redirect({ url, baseUrl }) {
      console.log("redirect-callback", { url, baseUrl });
      
      // If the URL is relative, prepend the base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // If the URL is on the same origin as the base URL, allow it
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      // Default redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
    async jwt({user, token, account, profile, session,trigger}) {
      console.log("user-token-account", user, token, account, profile,session, trigger)
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        if (account.provider === "credentials") {
          token["user"] = user;
          token["access_token"] = (user as ExtendedUser).accessToken;
          token["exp"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
          token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
          console.log("token after Credentials", token)
        }
        if (account?.provider === "google") {
          const {access_token, id_token, } = account;
          try{
              const response = await googleAuth(access_token, id_token);
              if (response.status === 200 && response.data) {
                token["user"] = response.data.user;
                token["access_token"] = response.data.access;
                token["refresh_token"] = response.data.refresh;
                token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
                console.log("token after Google", token)
              }
          }catch (error) {
            console.error("Error fetching user details:", error);
          }
        }
        return token;
      }
      // Refresh the backend token if necessary
      if (token.exp && getCurrentEpochTime() > token.exp) {
        const response = await refreshToken(token["refresh_token"] as string);
        token["access_token"] = response.access;
        token["refresh_token"] = response.access_expiration;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("session-token-user", session, token, user)
      session.user.accessToken = token.access_token as string;
      if (token.role && session.user){
        session.user.role = token.role;
      }
      console.log("session-user", session)
      return session
    }
  },
});











