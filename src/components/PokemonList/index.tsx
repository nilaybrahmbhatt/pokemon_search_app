// app/components/PokemonList.js
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PokemonList = ({ initialPokemons, initialOffset }: any) => {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const bottomRef = useRef(null);

  // Function to check if scrolled to bottom
  const isScrolledToBottom = () => {
    if (!bottomRef.current) return false;

    const { scrollTop, clientHeight, scrollHeight } = bottomRef.current;

    return scrollTop + clientHeight >= scrollHeight;
  };

  // Effect to log when scrolled to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolledToBottom()) {
        console.log("Scrolled to bottom!");
        // Perform your actions when scrolled to bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchMorePokemons = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/pokemons?offset=${offset}`);
      const data = await response.json();

      if (data.pokemons.length < 40) {
        setHasMore(false);
      }

      setPokemons((prevPokemons: any) => [...prevPokemons, ...data.pokemons]);
      setOffset((prevOffset: any) => prevOffset + 40);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        fetchMorePokemons();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div
      ref={bottomRef}
      className="max-h-600vh grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemons.map((pokemon: any) => (
        <div
          key={pokemon.id}
          className="border rounded-lg p-4 bg-gray-100 text-center">
          <h2 className="text-xl text-black font-bold mb-2">{pokemon.name}</h2>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            width={300}
            height={300}
            layout="responsive"
            className="mx-auto"
          />
        </div>
      ))}
      {loading && <p className="text-center col-span-full">Loading...</p>}
      {!hasMore && (
        <p className="text-center col-span-full">No more Pokémon to load</p>
      )}
    </div>
  );
};

export default PokemonList;
