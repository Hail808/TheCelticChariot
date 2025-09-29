"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import {headers} from "next/headers";
 
export const signUp = async (email: string, password: string, name: string) => {
    const result = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
            callbackURL:"/user_dashboard"
        },
    });
    return result;
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

    if (url)
    {
        redirect(url)
    }
}