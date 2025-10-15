import { betterAuth } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import { PrismaClient } from "@/generated/prisma";
import {nextCookies} from 'better-auth/next-js'
import { headers } from 'next/headers';

const prisma = new PrismaClient()
export const auth = betterAuth({
    database: prismaAdapter(prisma, {provider: "postgresql"}),
    emailAndPassword:{
        enabled: true
    },
    socialProviders:{
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [nextCookies()]
}); 

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}