import Image from "next/image";
import Link from "next/link";

const PokemonListCard = ({ pokemon }: any) => {
  return (
    <Link href={`/pokemon/${encodeURIComponent(pokemon.name)}`}>
      <div className="border rounded-lg overflow-hidden bg-gray-100 text-center">
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
    </Link>
  );
};

export default PokemonListCard;
