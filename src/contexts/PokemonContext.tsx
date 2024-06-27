"use client";
import usePokemonTypes, { PokemonType } from "@/hooks/usePokemonTypes";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonContextProps {
  pokemonList: Pokemon[];
  setPokemonList: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  types: PokemonType[] | any;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const types = usePokemonTypes();
  const fetchPokemon = async () => {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
    if (selectedType) {
      const typeResponse = await fetch(
        `https://pokeapi.co/api/v2/type/${selectedType}`
      );
      const typeData = await typeResponse.json();
      const results = typeData.pokemon.map((p: any) => p.pokemon);
      setPokemonList(results);
    } else {
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results.map((p: any, index: number) => ({
        ...p,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));
      setPokemonList(results);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        selectedType,
        setSelectedType,
        searchTerm,
        setSearchTerm,
        types
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

export { PokemonProvider, usePokemon };
