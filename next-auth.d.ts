import {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role?: string
    accessToken?: string
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }

} 



declare module "@auth/core/jwt" {
    interface JWT {
       role?: string
    }
}
