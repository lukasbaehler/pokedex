'use client';

import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { useSearchParams } from "next/navigation";
import PokemonCard from "../../components/PokemonCard";
import { useFavorites } from "../../hooks/useFavourites";

export default function Page() {
   const pokemon = useContext(PokemonContext);
   const params = useSearchParams();
   const {favorites, toggleFavorites} = useFavorites();

   if (
      params.size !== 3 ||
      (!params.has("name") && !params.has("desc") && !params.has("ids"))
   ) {
      return <p className="text-center">Invalid URL</p>;
   }

   const name = params.get("name") ?? "Unbekannt";
   const desc = params.get("desc") ?? "";
   const ids =
      params
         .get("ids")
         .split(",")
         .map(Number)
         .filter((n) => n >= 1 && n <= 151) ?? [];

   const filteredPokemon = pokemon.filter((poke) => ids.includes(poke.id));
   const pokemonCards = filteredPokemon.map((poke) => (
      <PokemonCard key={poke.id} pokemon={poke} onToggleFav={toggleFavorites} isFavourit={favorites.includes(poke.id)} />
   ));


   return (
      <>
         <div className="flex justify-around items-center m-3 b  sticky top-0 bg-white shadow">
            <h1 className="text-2xl p-3">{name}</h1>
            <p>{desc}</p>
         </div>
         <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center gap-2">
            {pokemonCards ?? "The collection is empty."}
         </ol>
      </>
   );
}
