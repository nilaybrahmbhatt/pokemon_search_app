import { BASE_URL } from "@/services/config";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const searchPokemon = async (query: string) => {
  try {
    const response = await fetch(BASE_URL + `/pokemon/${query}/`, {
      cache: "force-cache",
    });
    const body = await response.json();
    return body;
  } catch (error) {
    return error as Error;
  }
};

export async function generateMetadata({ params }: { params: any }) {
  const name = params.name;
  return {
    title: name,
  };
}

async function Page(props: any) {
  const {
    params: { name },
  } = props;
  console.log({ name });
  const pokemon = await searchPokemon(name);

  return (
    <div>
      <nav className="mb-10 text-center  ">
        <Link href="/" className="text-blue-600">
          Home
        </Link>{" "}
        → <span className="capitalize">{name}</span>
      </nav>
      <div className="h-['600px'] mx-[auto'] max-w-[400px] mx-auto rounded overflow-hidden">
        <div className="bg-[#5FE2C9] p-5 ">
          <Image
            src={pokemon.sprites?.other["official-artwork"]?.front_default}
            alt={`${pokemon.name} artwork`}
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
        <div className="bg-[#FDC665] p-5 ">
          <div className="mb-1">
            <strong>Name:</strong>{" "}
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
          </div>
          <div className="mb-1">
            <strong>Type:</strong>{" "}
            {pokemon.types
              .map((type: { type: { name: any } }) => type.type.name)
              .join(", ")}
          </div>
          <div className="mb-1">
            <strong>Stats:</strong>{" "}
            {pokemon.stats
              .map((stat: { stat: { name: any } }) => stat.stat.name)
              .join(", ")}
          </div>
          <div className="mb-1">
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities
              .slice(0, 5)
              .map(
                (ability: { ability: { name: any } }) => ability.ability.name
              )
              .join(", ")}
          </div>
          <div className="mb-1">
            <strong>Some Moves:</strong>{" "}
            {pokemon.moves
              .slice(0, 5)
              .map((move: { move: { name: any } }) => move.move.name)
              .join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
