import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { CredentialsConfig } from "next-auth/providers/credentials";
//import { saltAndHashPassword } from '@/utils/password';
import { signInSchema, ZodError } from "./lib/zod"
import axios from "axios";
import { User } from 'next-auth';


// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};


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
    //const pwHash = await saltAndHashPassword(_password)

    // logic to verify if the user exists
    user = await getUserFromDb(_email, _password)

    if (!user) {
      // return msg error if user not found
      return null;
    }

    // return user object with their profile data
    return user
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
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("sign-in-user", user, account, profile)
      return true
    },
    async jwt({user, token, account}) {
      console.log("jwt-token-user", user, token, account)
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
      
        token["user"] = account.user;
        token["access_token"] = account.access;
        token["refresh_token"] = account.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (token.exp && getCurrentEpochTime() > token.exp) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("session-token-user", session, token, user)
      return session
    }
  },
});


async function getUserFromDb(_email: string, pwHash: string): Promise<User | null> {
  try {

    const credentials = {
      username: _email,
      password: pwHash
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login/`;
    console.log("log in user")
    console.log(url, credentials)

    const response = await axios.post(url, {
      ...credentials
    });

    if (response.status === 200 && response.data) {
      console.log("response.data", response.data)
      return response.data.user;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching user from DB:", error);
    return null;
  }
}


export const getUserDetails = async (accessToken: string ) => {
  try {
    const response = await axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
      headers: {
        Authorization:  `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};



