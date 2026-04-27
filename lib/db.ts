"use server";

import { Pool } from "pg";
import { auth } from "./auth";
import { headers } from "next/headers";

//db connection
const pool = new Pool({
   host: process.env.POSTGRES_HOST,
   user: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   port: process.env.POSTGRES_PORT ,
});

// get favorites list
export async function getFavorites() {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session) {
      return undefined;
   }
   try {
      const result = await pool.query(
         "SELECT * FROM favorite WHERE user_id=$1",
         [session.user.id],
      );
      return result.rows;
   } catch (error) {
      console.error(error);
   }
}

// add to favorites
export async function addToFavorite(id: number) {
   const session = await auth.api.getSession({ headers: await headers() });
   try {
      const result = await pool.query(
         "INSERT INTO favorite (user_id, pokemon_id) VALUES ($1, $2)",
         [session.user.id, id],
      );
   } catch (error) {
      console.error(error);
   }
}

// remove from favorites
export async function removeFromFavorite(id: number) {
   const session = await auth.api.getSession({ headers: await headers() });
   try {
      const result = pool.query(
         "DELETE FROM favorite WHERE user_id = $1 AND pokemon_id = $2",
         [session.user.id, id],
      );
   } catch (error) {
      console.error(error);
   }
}

export async function toggleFavorites(id) {
   const favorites = await getFavorites();
   let isFavorites =  false; 

   for (let favorite of favorites) {
      if (favorite.pokemon_id === id) {
         isFavorites = true;
         break;
      }
   }

   if (isFavorites) {
      await removeFromFavorite(id);
   } else {
      await addToFavorite(id);
   }
}