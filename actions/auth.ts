"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
;

export async function signUpAction(formData: FormData) {
   // todo validation
   const email = formData.get('email').toString();
   const password = formData.get('password').toString();
   const name = formData.get('name').toString();

   await auth.api.signUpEmail({
      body: {
         email,
         password,
         name,
      },
   });

   redirect('/login')
}

export async function signInAction(formData: FormData) {
   const email = formData.get('email').toString();
   const password = formData.get("password").toString();
   
    await auth.api.signInEmail({
      body: {
         email,
         password,
      },
   });

   redirect('/')
}

export async function SignOutAction() {
    await auth.api.signOut({
        headers: await headers(),
    })

    redirect('/login');
}
