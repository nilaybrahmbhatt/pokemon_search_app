import { searchPokemon } from "@/services/functions";
import Image from "next/image";
import React from "react";

async function Page(props: any) {
  // const
  const {
    params: { pokemonDetails },
  } = props;

  // res is pokemon's details
  const res = await searchPokemon<any>(pokemonDetails);
  console.log(
    "res - ",
    res?.sprites?.other?.["official-artwork"]?.front_default
  );
  return (
    <div>
      {res?.sprites?.other?.["official-artwork"]?.front_default && (
        <Image
          width={400}
          height={320}
          src={res?.sprites?.other?.["official-artwork"]?.front_default}
          alt=""
        />
      )}
    </div>
  );
}

export default Page;
