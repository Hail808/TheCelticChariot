"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import {headers} from "next/headers";
import { PrismaClient } from "@prisma/client";
import { getOrganizations } from "../auth/organizations";

const prisma = new PrismaClient();

export const signUp = async (email: string, password: string, name: string) => {
    try {
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
                callbackURL: "/user_dashboard"
            },
        });
        
        console.log('SignUp result from Better Auth:', result); 
        
        if (!result.user) {
            console.log('No user in result'); 
            return result;
        }

        const userId = result.user.id;
        console.log('User ID:', userId);
        
        const existingGuest = await prisma.guest.findFirst({
            where: { email: email }
        });

        if (existingGuest) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    guest_id: existingGuest.guest_id
                }
            });
            
            console.log(`Linked user ${userId} to existing guest ${existingGuest.guest_id}`);
        } else {
            const newGuest = await prisma.guest.create({
                data: {
                    email: email,
                    phone_num: '',
                }
            });
            
            await prisma.user.update({
                where: { id: userId },
                data: {
                    guest_id: newGuest.guest_id
                }
            });
            
            console.log(`Created new guest ${newGuest.guest_id} for user ${userId}`);
        }
        
        const defaultOrg = await prisma.organization.findFirst({
            where: { name: "The Celtic Chariot" }
        });

        if (!defaultOrg) {
            throw new Error("Default organization not found");
        }

        await prisma.organizationMember.create({
            data: {
                userId: userId,
                organizationId: defaultOrg.id,
                role: "CUSTOMER", 
            },
        });

        console.log('SignUp completed successfully'); 
        return result;
        
    } catch (error: any) {
        console.error('SignUp function error:', error);
        throw error;
    }
}


export const signIn = async (email: string, password: string) => {
    const result = await auth.api.signInEmail({
        body: {
            email,
            password,
            callbackURL:"/user_dashboard"
        },
    });
    return result;
}

export const signOut = async () => {
    const result = await auth.api.signOut({headers: await headers()});
    return result;
}

export const signInSocial = async () => {
    const {url} = await auth.api.signInSocial({
        body: {
            provider: "google",
            callbackURL: "/user_dashboard"
        },
    });

    if (url) {
        redirect(url)
    }
}

export async function getCurrentUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user ?? null;
}

export async function checkForAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return false;
    }

    const userOrgs = await getOrganizations();
    
    const isAdmin = userOrgs.some(org => 
        org.role === 'ADMIN'
    );
    return isAdmin;
}