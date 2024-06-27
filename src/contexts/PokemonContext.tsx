"use client";
import usePokemonTypes, { PokemonType } from "@/hooks/usePokemonTypes";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
  useCallback,
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
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  types: PokemonType[] | any;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

const PokemonProvider: FC<{ initialData: any; children: ReactNode }> = ({
  initialData,
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(initialData || []);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<any>({});

  const types = usePokemonTypes();
  const filterArray = (array: any[]) => {
    if (filter.searchTerm) {
      return array.filter((p) =>
        p.name.includes(filter.searchTerm.toLowerCase())
      );
    } else {
      return array;
    }
  };
  const fetchPokemon = useCallback(async () => {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
    if (filter.type) {
      const typeResponse = await fetch(
        `https://pokeapi.co/api/v2/type/${filter.type}`
      );
      const typeData = await typeResponse.json();
      const results = typeData.pokemon.map((p: any) => p.pokemon);
      setPokemonList(filterArray(results));
    } else {
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results.map((p: any, index: number) => ({
        ...p,
        id: index + 1,
      }));
      setPokemonList(filterArray(results));
    }
  }, [filter]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon, filter]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        setFilter,
        selectedType,
        setSelectedType,
        searchTerm,
        setSearchTerm,
        types,
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
