import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
   database: new Pool({
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      port: process.env.POSTGRES_PORT,
      password: process.env.POSTGRES_PW,
   }),
   emailAndPassword: {
    enabled: true,
   },
   plugins: [nextCookies()],
});
