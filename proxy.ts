import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default async function proxy(request: NextRequest) {
   let session;
   try {
      session = await auth.api.getSession({ headers: request.headers });
   } catch (error) {
    console.error(error);
   }
   if (
      !session &&
      (request.nextUrl.pathname.startsWith("/favorites") ||
         request.nextUrl.pathname.startsWith("/share"))
   ) {
      return NextResponse.redirect("http://localhost:3000/login");
   }
}
