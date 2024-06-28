"use client";
import { usePokemon } from "@/contexts/PokemonContext";
import PokemonListCard from "../Cards/ListCard";

const PokemonList = ({ initialPokemons, initialOffset }: any) => {
  const { pokemonList } = usePokemon();

  return (
    <div className="max-h-600vh grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemonList.map((pokemon: any) => (
        <PokemonListCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
