"use client";

import { useContext, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import PokemonCard from "../../components/PokemonCard";
import ShareForm from "../../components/ShareForm";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../hooks/useFavourites";

export default function Page() {
   const pokemon = useContext(PokemonContext);
   const [share, setShare] = useState(false);
   const { favorites, toggleFavorites } = useFavorites();

   function handleToggleFavorites(id) {
      toggleFavorites(id);
   }
   const filteredPokemon = pokemon.filter((poke) =>
      favorites.includes(poke.id),
   );
   const mappedCardElments = filteredPokemon.map((poke) => (
      <PokemonCard key={poke.id} pokemon={poke} isFavourit={true} onToggleFav={handleToggleFavorites} />
   ));
   const router = useRouter();

   async function handleSignOut() {
      try {
         await authClient.signOut();
         router.push("/login");
      } catch (error) {
         console.error(error.message);
      }
   }

   if (share) {
      return (
         <>
            <ShareForm />
         </>
      );
   }

   return (
      <div className="bg-gray-100">
         <div className="flex justify-around items-center mb-3 p-4  sticky top-0 bg-white shadow">
            <h1 className="text-2xl">Favorites</h1>
            <button
               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
               onClick={() => setShare(true)}
            >
               Share
            </button>
            <button
               onClick={handleSignOut}
               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
               Logout
            </button>
         </div>
         <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center gap-2">
            {mappedCardElments}
         </ol>
         {mappedCardElments.length ? (
            ""
         ) : (
            <p className="text-center">There are no favorites selected.</p>
         )}
      </div>
   );
}
