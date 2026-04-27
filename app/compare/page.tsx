'use client';

import { CompareContext } from "../../context/CompareContext";
import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import TypeBadge from "../../components/TypeBadge";
import StatBar from "../../components/StatBar";

export default function Page() {
   const { compare } = useContext(CompareContext);
   const pokemons = useContext(PokemonContext);
   const pokemonOne = pokemons[compare[0] - 1];
   const pokemonTwo = pokemons[compare[1] - 1];

   useEffect(()=> {},[compare])

   if (compare.length < 2) {
      return (
         <>
            <p className="text-center ">There must be two pokemon selected.</p>
         </>
      );
   }


   return (
      <div>
         <section className="flex  flex-col sm:flex-row justify-center">
            <article className="flex flex-col items-center justify-center">
               <h2>
                  {pokemonOne.name.slice(0, 1).toUpperCase() +
                     pokemonOne.name.slice(1)}
               </h2>
               <img
                  src={pokemonOne.sprites.front_default}
                  alt={pokemonOne.name + " - normal sprite"}
               />
               <div>
                  {pokemonOne.types.map((type, index) => (
                     <TypeBadge key={'type-pokemon-one-' + index} type={type.type.name} />
                  ))}
               </div>
               <ul className="flex items-center flex-col">
                  {pokemonOne.stats.map((stat, index) => (
                     <StatBar
                        key={'state-bar-pokemon-one-' + index}
                        name={stat.stat.name}
                        value={stat.base_stat}
                     />
                  ))}
               </ul>
            </article>
            <article className="flex flex-col items-center justify-center">
               <h2>
                  {pokemonTwo.name.slice(0, 1).toUpperCase() +
                     pokemonTwo.name.slice(1)}
               </h2>
               <img
                  src={pokemonTwo.sprites.front_default}
                  alt={pokemonTwo.name + " - normal sprite"}
               />
               <div>
                  {pokemonTwo.types.map((type, index) => (
                     <TypeBadge key={'type-pokemon-two-' + index} type={type.type.name} />
                  ))}
               </div>
               <ul className="flex items-center flex-col">
                  {pokemonTwo.stats.map((stat, index) => (
                     <StatBar
                        key={'state-bar-pokemon-two-' + index}
                        name={stat.stat.name}
                        value={stat.base_stat}
                     />
                  ))}
               </ul>
            </article>
         </section>
      </div>
   );
}
