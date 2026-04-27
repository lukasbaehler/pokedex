import PokemonCard from "./PokemonCard";
import { toggleFavorites, getFavorites } from "../lib/db";

export default async function EvolutionChain({ id }) {
   const speciesResponds = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
   );
   const speciesData = await speciesResponds.json();
   const evolutionChainResponds = await fetch(speciesData.evolution_chain.url);
   const evolutionChainData = await evolutionChainResponds.json();
   const favoritesRows = await getFavorites();
   let favorites = [];

   for(let favoriteRow of favoritesRows) {
      favorites.push(favoriteRow.pokemon_id);
   }

   let toFetch = [];

   function extractPokeomnUrl(chain) {
      if (!chain.evolves_to.length) {
         return;
      } else {
         for (let i = 0; i < chain.evolves_to.length; i++) {
            toFetch.push(
               chain.evolves_to[i].species.url.replace(
                  "pokemon-species",
                  "pokemon",
               ),
            );
            extractPokeomnUrl(chain.evolves_to[i]);
         }
      }
   }
   toFetch.push(
      evolutionChainData.chain.species.url.replace(
         "pokemon-species",
         "pokemon",
      ),
   );

   extractPokeomnUrl(evolutionChainData.chain);
   const pokemonDetails = await Promise.all(
      toFetch.map((url) => fetch(url).then((r) => r.json())),
   );

   const pokemonCards = pokemonDetails
      .filter((poke) => poke.id <= 151)
      .map((poke) => (
         <div key={poke.name + "-evolution-chain"}>
            <PokemonCard pokemon={poke}  onToggleFav={toggleFavorites} isFavourit={favorites.includes(poke.id)}/>
         </div>
      ));

   return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
         {pokemonCards}
      </div>
   );
}