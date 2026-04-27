"use client";

import { getFavorites, addToFavorite, removeFromFavorite } from "../lib/db";
import { useEffect, useState } from "react";

export function useFavorites() {
   const [favorites, setFavorites] = useState<number[]>([]);
   const [rerender, setRerender] = useState(0);

   useEffect(() => {
      async function setFavoritesState() {
         try {
            const favoritesResponds = await getFavorites();

            if (!favoritesResponds) {
               return;
            }
            let favoritesArray = [];

            for (let row of favoritesResponds) {
               favoritesArray.push(row.pokemon_id);
            }

            setFavorites(favoritesArray);
         } catch (error) {
            console.error(error);
         }
      }

      setFavoritesState();
   }, [rerender]);

   function toggleFavorites(id: number) {
      if (favorites.includes(id)) {
         try {
            removeFromFavorite(id);
            setRerender(id);
         } catch (error) {
            console.error(error.message);
         }
      } else {
         try {
            addToFavorite(id);
            setRerender(id + 1);
         } catch (error) {
            console.error(error.message);
         }
      }
   }

   return { favorites, toggleFavorites };
}
