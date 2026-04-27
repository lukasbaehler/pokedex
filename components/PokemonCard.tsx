'use client';

import TypeBadge from "./TypeBadge";
import { useRouter } from "next/navigation";

export default function PokemonCard({ pokemon, isFavourit, onToggleFav }) {
   const types = pokemon.types.map((type,index) => <TypeBadge key={pokemon.name + '-type-' + index} type={type.type.name} />);
   const router = useRouter();

   function handelCardClick() {
      router.push(`/pokemon/${pokemon.id}`);
   }

   function handelHeartClick(e) {
      e.stopPropagation();
      onToggleFav(pokemon.id);
   }

   return (
      <li key={pokemon.id} onClick={handelCardClick} className='w-[180px] border border-black rounded-xl shadow-md p-4 hover:scale-105 transition-transform cursor-pointer bg-white flex flex-col justify-center items-center'>
         <div>
            <h3>
               {pokemon.id} - {pokemon.name.slice(0,1).toUpperCase() + pokemon.name.slice(1)}
            </h3>
         </div>
         <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name + " - normal sprite"}
         />
         <div className='mb-2'>{types}</div>
         <svg
         width='40'
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handelHeartClick}
         >
            <path
               d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
               fill={isFavourit ? '#ff0001' : '#000'}
            />
         </svg>
      </li>
   );
}