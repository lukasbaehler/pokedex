import Link from "next/link";
import "./global.css";
import PokemonProvider from "../context/PokemonContext";
import { fetchPokemonList } from "../utils/fetchPokemonList";
import CompareProvider from "../context/CompareContext";
import { ResetCompareButton } from "../components/CompareButtons";

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   // const pokemons = await fetchPokemonList();
   return (
      <html lang="en">
         <body>
            <PokemonProvider>
               <CompareProvider>
                  <header>
                     <nav className=" bg-white grid grid-cols-1 sm:grid-cols-4 justify-center gap-2 p-2">
                        <Link
                           className=" text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                           href="/"
                        >
                           Pokédex
                        </Link>
                        <Link
                           className="text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                           href="/favorites"
                        >
                           Favorites
                        </Link>
                        <Link
                           className=" text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                           href="/compare"
                        >
                           Compare
                        </Link>
                        <ResetCompareButton />
                     </nav>
                  </header>
                  <main>{children}</main>
               </CompareProvider>
            </PokemonProvider>
         </body>
      </html>
   );
}
