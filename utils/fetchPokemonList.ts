export async function fetchPokemonList() {
   try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();

      const details =  Promise.all(
         data.results.map((p) =>
            fetch(p.url).then((r) => r.json()),
         ),
      );
      return details;
   } catch (err) {
      console.error("Pokémon konnten nicht geladen werden: " + err.message);
   }
}
