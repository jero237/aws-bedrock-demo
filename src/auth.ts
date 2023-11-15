import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
import { redirect } from "next/navigation"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Cognito],
})