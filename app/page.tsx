"use client";

import { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import TypenFilter from "../components/TypeFilter";
import { useFavorites } from "../hooks/useFavourites";

export default function Page() {
   const pokemons = useContext(PokemonContext);
   const [filter, setFilter] = useState("");
   const [activeTypeFilter, setActiveTypeFilter] = useState<string[]>([]);
   const {favorites, toggleFavorites} = useFavorites();

   function handleFilterSelect(type: string) {
      if (activeTypeFilter.includes(type)) {
         setActiveTypeFilter(
            activeTypeFilter.filter((currentType) => type != currentType),
         );
      } else {
         setActiveTypeFilter([...activeTypeFilter, type]);
      }
   }

   function handleToggleFavorites (id: number) {
      toggleFavorites(id);
   }

   const filteredPokemon = pokemons.filter((poke) => {
      if (activeTypeFilter.length === 0) {
         if (filter === "") {
            return true;
         }
         if (poke.name.toLowerCase().includes(filter.toLowerCase())) {
            return true;
         }
      } else {
         if (filter === "") {
            return activeTypeFilter.reduce((prev, currentType) => {
               if (!prev) {
                  return false;
               }
               return poke.types.reduce((prev, typeField) => {
                  if (prev) {
                     return prev;
                  }
                  return typeField.type.name === currentType;
               }, false);
            }, true);
         } else {
            if (poke.name.toLowerCase().includes(filter.toLowerCase())) {
               return activeTypeFilter.reduce((prev, currentType) => {
                  if (!prev) {
                     return false;
                  }
                  return poke.types.reduce((prev, typeField) => {
                     if (prev) {
                        return prev;
                     }
                     return typeField.type.name === currentType;
                  }, false);
               }, true);
            }
         }
      }

      return false;
   });

   function handleReset() {
      setFilter("");
      setActiveTypeFilter([]);
   }

   const pokemonCards = filteredPokemon.map((poke) => (
      <PokemonCard key={poke.id} pokemon={poke} isFavourit={favorites.includes(poke.id)} onToggleFav={handleToggleFavorites} />
   ));
   return (
      <><div className="bg-gray-100">
         <div className="sticky top-0 bg-white shadow p-2 mb-2">
            <div className="flex justify-center gap-x-3 items-center m-3">
               <h1 className="text-2xl">Pokédex</h1>
               <SearchBar filterValue={filter} onFilterChange={setFilter} />
            </div>
            <div className="flex justify-center gap-x-3">
               <TypenFilter
                  selected={activeTypeFilter}
                  onSelected={handleFilterSelect}
               />
            </div>
            <div className="flex justify-center my-3">
               <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
               >
                  Reset Filter
               </button>
            </div>
         </div>
         <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center gap-2">
            {pokemonCards}
         </ol>
         </div>
      </>
   );
}
