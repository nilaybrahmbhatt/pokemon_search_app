"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePokemon } from "@/contexts/PokemonContext";
import Link from "next/link";

const PokemonList = ({ initialPokemons, initialOffset }: any) => {
  const { pokemonList } = usePokemon();

  console.log("🚀 ~ PokemonList ~ pokemonList:", pokemonList);

  return (
    <div className="max-h-600vh grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemonList.map((pokemon: any) => (
        <div
          key={pokemon.id}
          className="border rounded-lg overflow-hidden bg-gray-100 text-center"
        >
          <div className="bg-white h-[230px] p-4">
            <Image
              src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
              alt={pokemon.name}
              width={300}
              height={200}
              className="mx-auto h-[200px] object-contain"
            />
          </div>
          <div className="p-5 text-start bg-[#FAFAFA] ">
            <h2 className="text-lg mb-24 ">{pokemon.name}</h2>
            <Link
              href={`/pokemon/${encodeURIComponent(pokemon.name)}`}
              className="text-[#004368] text-sm "
            >
              Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
