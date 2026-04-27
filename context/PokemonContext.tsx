'use client';

import { createContext, useEffect, useState } from "react";
import { fetchPokemonList } from "../utils/fetchPokemonList";

export const PokemonContext = createContext(undefined);

export default function PokemonProvider({ children }) {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
       
        async function fetchPokemon(){
            const pokemonList = await fetchPokemonList()
             setPokemons(pokemonList);
        }
       
        fetchPokemon();
    }, [])
    
    return (
    <PokemonContext.Provider value={pokemons}>
        {children}
    </PokemonContext.Provider>
)
}