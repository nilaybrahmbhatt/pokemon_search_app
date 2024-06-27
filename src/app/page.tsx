import PokemonList from "@/components/PokemonList";
import SearchForm from "@/components/SearchBox";
import { PokemonProvider } from "@/contexts/PokemonContext";

export const revalidate = 0; // To ensure the data is fetched on every request
// async function fetchInitialPokemons() {
//   const response = await fetch(
//     "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0"
//   );
//   const data = await response.json();

//   const initialPokemons = await Promise.all(
//     data.results.map(async (pokemon: any) => {
//       const response = await fetch(pokemon.url);
//       return response.json();
//     })
//   );

//   return { initialPokemons, initialOffset: 40 };
// }

export default async function Home() {
  return (
    <PokemonProvider>
      <SearchForm />
      <PokemonList />
    </PokemonProvider>
  );
}
