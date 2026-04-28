
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: `https://pokedex-eosin-kappa.vercel.app`,
});