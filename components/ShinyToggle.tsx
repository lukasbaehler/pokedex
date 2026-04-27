'use client';

import { useState } from "react";

export default function ShinyToggle({pokemon}) {
   const [showShiny, setShowShiny] = useState<boolean>(false);
   
    return (
      <>
         <img
            className="transition-opacity"
            src={
               showShiny
                  ? pokemon.sprites.front_shiny
                  : pokemon.sprites.front_default
            }
            alt={
               pokemon.name +
               " - " +
               (showShiny ? "shiny sprites" : "normal sprites")
            }
         />
         <button
            onClick={() => setShowShiny(!showShiny)}
            className=" px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
         >
            {showShiny ? "Show Normal" : "Show Shiny"}
         </button>
      </>
   );
}
