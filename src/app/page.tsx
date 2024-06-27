/**
 * @file Home.js
 * @description This is the main entry point for the Home page of the Pokémon app.
 * The page fetches an initial list of Pokémon from the PokéAPI and provides it to the
 * application through the PokemonProvider context. The page includes a search form
 * and a list of Pokémon that can be filtered based on the user's search input.
 *
 * Components:
 * - PokemonList: A component that displays a list of Pokémon.
 * - SearchForm: A component that includes a search box for filtering the Pokémon list.
 *
 * Contexts:
 * - PokemonProvider: A context provider that supplies the initial Pokémon data to the app.
 *
 * Functions:
 * - fetchInitialPokemons: An asynchronous function that fetches the initial list of Pokémon
 *   from the PokéAPI with a limit of 40 Pokémon and assigns an ID to each Pokémon.
 *
 * SEO:
 * - The initial data fetched is used to improve SEO by providing content to search engines
 *   during the initial render of the page.
 *
 * @returns The Home component wrapped in the PokemonProvider with initial Pokémon data.
 */

import PokemonList from "@/components/PokemonList";
import SearchForm from "@/components/SearchBox";
import { PokemonProvider } from "@/contexts/PokemonContext";

async function fetchInitialPokemons() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0"
  );
  const data = await response.json();
  const results = data.results.map((p: any, index: number) => ({
    ...p,
    id: index + 1,
  }));

  return results;
}

export default async function Home() {
  const initialData = await fetchInitialPokemons(); // to get initial data for SEO
  return (
    <PokemonProvider initialData={initialData}>
      <SearchForm />
      <PokemonList />
    </PokemonProvider>
  );
}
