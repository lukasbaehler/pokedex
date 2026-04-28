"use server";

import { Pool } from "pg";
import { auth } from "./auth";
import { headers } from "next/headers";

//db connection
const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// get favorites list
export async function getFavorites() {
   let session;
   try {
      session = await auth.api.getSession({
         headers: await headers(),
      });
   } catch (error) {
      console.error(error.message);
   }
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
     let session;
   try {
      session = await auth.api.getSession({
         headers: await headers(),
      });
   } catch (error) {
      console.error(error.message);
   }
   if (!session) {
      return;
   }
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
     let session;
   try {
      session = await auth.api.getSession({
         headers: await headers(),
      });
   } catch (error) {
      console.error(error.message);
   }
   if (!session) {
      return;
   }
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
   let isFavorites = false;

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
