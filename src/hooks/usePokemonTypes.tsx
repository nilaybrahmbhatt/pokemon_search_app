import { useEffect, useState } from 'react';

export interface PokemonType {
  name: string;
  url: string;
}

const usePokemonTypes = (): PokemonType[] => {
  const [types, setTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results);
    };

    fetchTypes();
  }, []);

  return types;
};

export default usePokemonTypes;