import TypeBadge from "../../../components/TypeBadge";
import StatBar from "../../../components/StatBar";
import ShinyToggle from "../../../components/ShinyToggle";
import FavoriteButton from "../../../components/FavoriteButton";
import Link from "next/link";
import { CompareButton } from "../../../components/CompareButtons";
import EvolutionChain from "../../../components/EvolutionChain";

export default async function Page(props: { params: Promise<{ id: string }> }) {
   const params = await props.params;
   const id = Number(params.id);
   let pokemon;
   try {
      pokemon = await fetchPokemon(id);
   } catch (error) {
      console.error(error.message);
   }
   
   if(!pokemon) {
      return(<div>Pokémon not found.</div>)
   }

   const types = pokemon.types.map((type, index) => (
      <TypeBadge key={pokemon.name + "-type-" + index} type={type.type.name} />
   ));

   return (
      <section className="flex flex-col mx-auto">
         <div className="flex justify-center items-center gap-x-3 my-3">
            <h1>
               {pokemon.name} - {pokemon.id}
            </h1>
            <FavoriteButton id={id} />
            <CompareButton id={id} />
         </div>
         <div className="flex justify-center items-center">
            {id > 1 ? (
               <Link
                  href={`/pokemon/${id - 1}`}
                  className=" px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
               >
                  Previous
               </Link>
            ) : (
               ""
            )}
            <ShinyToggle pokemon={pokemon} />
            {id < 151 ? (
               <Link
                  href={`/pokemon/${id + 1}`}
                  className=" px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
               >
                  Next
               </Link>
            ) : (
               ""
            )}
         </div>
         <div className="flex justify-center py-4">{types}</div>
         <ul className="flex items-center flex-col pb-2">
            {pokemon.stats.map((stat, index) => (
               <StatBar
                  key={index}
                  name={stat.stat.name}
                  value={stat.base_stat}
               />
            ))}
         </ul>
         <EvolutionChain id={id} />
         <ul className="flex flex-col items-center">
            {pokemon.moves.map((move, index) => (
               <li key={index}>{move.move.name}</li>
            ))}
         </ul>
      </section>
   );
}

async function fetchPokemon(id) {
   try {
      const responds = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = responds.json();
      return data;
   } catch (error) {
      console.error(error);
   }
}
